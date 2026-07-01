"use client";

import BkashIcon from "@/public/images/deposit/bkash.svg";
import NagadIcon from "@/public/images/deposit/nagad.svg";
import {
  useCreateMobileBankingDepositMutation,
  useGetActiveDepositPaymentMethodsQuery,
} from "@/redux/features/deposit/depositApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  HiClipboardDocument,
  HiPaperAirplane,
  HiShieldCheck,
} from "react-icons/hi2";
import { toast } from "react-toastify";
import EmptyState from "./EmptyState";
import PageHeader from "./PageHeader";
import SectionTitle from "./SectionTitle";

/* ────────── Component Types ────────── */
type MethodName = "Bkash" | "Nagad";

type DepositPaymentMethod = {
  _id: string;
  title: string;
  accountNumber: string;
  methodName: MethodName;
  methodType: string;
};

/* ────────── Payment Theme Data ────────── */
const paymentTheme = {
  Bkash: {
    title: "bKash Deposit",
    instruction: "bKash Personal Wallet ( Send Money )",
    icon: BkashIcon,
    heroClass: "from-pink-600 to-rose-600",
    helper: "Enter the TrxID from your bKash transaction history.",
  },
  Nagad: {
    title: "Nagad Deposit",
    instruction: "Nagad Personal Wallet ( Send Money )",
    icon: NagadIcon,
    heroClass: "from-red-600 to-rose-600",
    helper: "Enter the TrxID from your Nagad transaction history.",
  },
};

/* ────────── Mobile Banking Deposit Form ────────── */
const MobileBankingDepositForm = ({
  methodName,
}: {
  methodName: MethodName;
}) => {
  const router = useRouter();
  const theme = paymentTheme[methodName];
  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");

  // ────────── Load Active Payment Channels ──────────
  const { data, isLoading } =
    useGetActiveDepositPaymentMethodsQuery(methodName);
  const [createDeposit, { isLoading: isSubmitting }] =
    useCreateMobileBankingDepositMutation();
  const methods: DepositPaymentMethod[] = data?.methods || [];

  // ────────── Selected Channel Data ──────────
  const selectedMethod = useMemo(
    () => methods.find((item) => item._id === selectedMethodId) || methods[0],
    [methods, selectedMethodId],
  );

  // ────────── Copy Account Number ──────────
  const handleCopy = async () => {
    if (!selectedMethod?.accountNumber) return;
    await navigator.clipboard.writeText(selectedMethod.accountNumber);
    toast.success("Account number copied");
  };

  // ────────── Submit Deposit Request ──────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMethod?._id)
      return toast.error("Please select a payment channel");
    if (!Number(amount) || Number(amount) <= 0)
      return toast.error("Enter a valid amount");
    if (!transactionId.trim()) return toast.error("Transaction ID is required");

    try {
      const res: any = await createDeposit({
        amount: Number(amount),
        transactionId: transactionId.trim().toUpperCase(),
        paymentMethodId: selectedMethod._id,
      }).unwrap();

      router.push(`/deposit/status?id=${res?.deposit?._id}`);
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.data?.error || "Deposit submit failed",
      );
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Payment"
        subtitle={`${methodName} deposit channel`}
        back
      />

      {/* ────────── Payment Card ────────── */}
      <section className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[.08] shadow-[0_0_55px_rgba(56,189,248,.14)] backdrop-blur-xl">
        <div
          className={`m-5 flex items-center gap-4 rounded-[20px] bg-gradient-to-r ${theme.heroClass} p-5`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-2">
            <Image
              src={theme.icon}
              alt={methodName}
              className="h-full w-full"
            />
          </div>
          <h1 className="text-xl font-black">{theme.title}</h1>
        </div>

        <div className="border-b border-white/10 pb-5 text-center text-lg font-black">
          {theme.instruction}
        </div>

        {/* ────────── Channel Selector ────────── */}
        <div className="space-y-4 p-5">
          <SectionTitle
            subtitle="Available Channels"
            title="Select Payment Channel"
          />

          {isLoading ? (
            <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-5 text-center text-sm font-bold text-slate-300">
              Loading payment channels...
            </div>
          ) : methods.length === 0 ? (
            <EmptyState
              title="No active channel"
              subtitle={`${methodName} deposit channel is not available right now.`}
              icon={HiShieldCheck}
            />
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {methods.map((method, index) => {
                const active =
                  (selectedMethodId || methods[0]?._id) === method._id;
                return (
                  <button
                    key={method._id}
                    type="button"
                    onClick={() => setSelectedMethodId(method._id)}
                    className={`rounded-[22px] border p-4 text-left transition ${
                      active
                        ? "border-cyan-300/50 bg-cyan-300/12 shadow-[0_0_30px_rgba(34,211,238,.13)]"
                        : "border-white/10 bg-white/[.035]"
                    }`}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                      Channel-{String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-lg font-black text-white">
                      {method.title}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-300">
                      {method.accountNumber}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ────────── Deposit Form ────────── */}
        {selectedMethod && (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 border-t border-white/10 p-5"
          >
            <div>
              <label className="text-xs font-black uppercase tracking-[0.16em] text-white">
                Account Number
              </label>
              <div className="mt-2 flex items-center justify-between rounded-[16px] border border-white/10 bg-slate-950/40 px-4 py-4">
                <span className="text-lg font-black tracking-wider">
                  {selectedMethod.accountNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xl text-cyan-200"
                >
                  <HiClipboardDocument />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-[0.16em] text-white">
                Amount
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-[16px] border border-emerald-400/25 bg-slate-950/40 px-4 py-4">
                <span className="text-sm font-black text-emerald-300">BDT</span>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="1000"
                  className="w-full bg-transparent text-lg font-black text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-[0.16em] text-white">
                Transaction ID *
              </label>
              <input
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="E.G., 7AB12C3D45"
                className="mt-2 w-full rounded-[16px] border border-white/10 bg-slate-950/40 px-4 py-4 text-sm font-black uppercase text-white outline-none placeholder:text-slate-500"
              />
              <p className="mt-2 text-center text-xs font-bold text-amber-200">
                {theme.helper}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-[18px] border border-cyan-300/20 bg-cyan-400/15 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-cyan-100 disabled:opacity-50"
            >
              <HiPaperAirplane />{" "}
              {isSubmitting ? "Submitting..." : "Confirm Deposit"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default MobileBankingDepositForm;
