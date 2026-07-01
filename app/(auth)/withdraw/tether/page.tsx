"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import WhatsAppSupportButton from "@/components/Support/WhatsAppSupportButton";
import { formatBalance } from "@/lib/functions";
import {
  useCreateWithdrawRequestMutation,
  useGetMyWithdrawPaymentMethodsQuery,
} from "@/redux/features/withdraw/withdrawApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  HiArrowRight,
  HiArrowUpTray,
  HiKey,
  HiShieldCheck,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const fixedAmounts = [300, 1500, 8000, 30000, 120000, 250000];

const WithdrawRequestPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestType = searchParams.get("type") || "mobile";
  const { user } = useSelector((state: any) => state.auth);
  const { data: methodData } = useGetMyWithdrawPaymentMethodsQuery(undefined);
  const [withdraw, { isLoading, isSuccess, isError, error }] =
    useCreateWithdrawRequestMutation();

  // ────────── Withdraw Form State ──────────
  const [amount, setAmount] = useState<number>(300);
  const [password, setPassword] = useState("");
  const selectedMethod = useMemo(
    () =>
      (methodData?.methods || []).find(
        (item: any) => item.methodCategory === requestType,
      ),
    [methodData, requestType],
  );
  const charge = amount * 0.1;
  const receiveAmount = amount - charge;
  const insufficientBalance = Number(user?.m_balance || 0) < amount;

  // ────────── Submit Withdraw Request ──────────
  const handleSubmit = () => {
    withdraw({ amount, password, paymentMethodId: selectedMethod?._id });
  };

  // ────────── API Response Message ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Withdraw request submitted successfully");
      router.push("/withdraw/history");
    }
    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message ||
          "Withdraw request failed",
      );
    }
  }, [isSuccess, isError, error, router]);

  const submitDisabled =
    !selectedMethod || !password || insufficientBalance || isLoading;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Withdraw Request"
        subtitle="Confirm payout with login password"
        back
      />

      {/* ────────── Withdraw Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/18 via-indigo-950/90 to-violet-950/50 p-4 shadow-[0_0_55px_rgba(59,130,246,.12)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300/90">
              Secure Cashout
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Withdraw BDT
            </h2>
            <p className="mt-2 text-[0.7rem] leading-6 text-slate-400">
              Allowed fixed amounts only. 10% charge applies to every
              withdrawal.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-blue-400/25 bg-blue-400/12 text-blue-300">
            <HiArrowUpTray className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Withdrawal Summary Card ────────── */}
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <p className="text-slate-400 uppercase tracking-wider">Available</p>

            <p className="mt-1 text-base font-black text-emerald-400">
              BDT {formatBalance(user?.m_balance || 0)}
            </p>
          </div>

          <div className="border-x border-white/10 text-center">
            <p className="text-slate-400 uppercase tracking-wider">Charge</p>

            <p className="mt-1 text-base font-black text-amber-400">10%</p>
          </div>

          <div className="text-center">
            <p className="text-slate-400 uppercase tracking-wider">
              Processing
            </p>

            <p className="mt-1 text-base font-black text-cyan-400">72h</p>
          </div>
        </div>
      </section>

      {/* ────────── Selected Payment Method ────────── */}
      <section className="adnexa-glass-card rounded-2xl p-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
          Payment Method
        </p>
        {selectedMethod ? (
          <div className="mt-3">
            <h3 className="text-xl font-black text-white">
              {selectedMethod.methodName}
            </h3>
            <p className="mt-1 break-all text-sm font-bold text-slate-300">
              {selectedMethod.methodCategory === "binance"
                ? selectedMethod.walletAddress
                : selectedMethod.accountNumber}
            </p>
            <p className="mt-1 text-xs font-black text-cyan-300">
              Network: {selectedMethod.network}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm font-black text-red-300">
            Please add this withdrawal method first.
          </p>
        )}
      </section>

      {/* ────────── Withdraw Form ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Request Form" title="Withdrawal Details" />
        <div className="adnexa-glass-card space-y-5 rounded-2xl p-4">
          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              Select Fixed Amount
            </label>
            <div className="grid grid-cols-2 gap-3">
              {fixedAmounts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAmount(item)}
                  className={`rounded-2xl border px-3 py-4 text-sm font-black transition ${amount === item ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-white/5 text-slate-300"}`}
                >
                  BDT {item.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              Login Password
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-cyan-300">
                <HiKey className="text-2xl" />
              </span>
              <input
                className="adnexa-input"
                type="password"
                placeholder="Enter login password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Receive Amount Preview ────────── */}
      <section className="adnexa-glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              You will receive
            </p>
            <h3 className="mt-1 text-xl font-black text-emerald-300">
              BDT {receiveAmount.toLocaleString()}
            </h3>
            <p className="mt-1 text-xs font-bold text-slate-500">
              Charge: BDT {charge.toLocaleString()}
            </p>
          </div>
          <HiShieldCheck className="text-4xl text-cyan-300" />
        </div>
        {insufficientBalance && (
          <p className="mt-3 text-sm font-black text-red-300">
            Insufficient balance for this amount.
          </p>
        )}
      </section>

      {/* ────────── Submit & Support ────────── */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitDisabled}
        className="adnexa-primary-button"
      >
        {isLoading ? <RingLoader color="#fff" size={28} /> : "Submit Withdraw"}
        {!isLoading && <HiArrowRight className="text-2xl" />}
      </button>
      <WhatsAppSupportButton />
    </div>
  );
};

export default WithdrawRequestPage;
