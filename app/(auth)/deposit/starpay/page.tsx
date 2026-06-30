"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { useCreateStarpayPaymentMutation } from "@/redux/features/deposit/depositApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  HiArrowRight,
  HiBanknotes,
  HiCheckBadge,
  HiCurrencyDollar,
  HiShieldCheck,
} from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const StarpayDeposit = () => {
  const searchParams = useSearchParams();
  const method = (searchParams.get("method") || "bkash").toLowerCase();
  const [amount, setAmount] = useState("");
  const [createStarpayPayment, { data, isLoading, isSuccess, isError, error }] =
    useCreateStarpayPaymentMutation();

  // ────────── Method Display Name ──────────
  const methodName = useMemo(() => {
    if (method === "nagad") return "Nagad";
    return "bKash";
  }, [method]);

  // ────────── Create StarPayBD Payment URL ──────────
  const handleCreatePayment = () => {
    const depositAmount = Number(amount);

    if (!depositAmount || depositAmount < 10) {
      toast.error("Minimum deposit amount is BDT 10");
      return;
    }

    createStarpayPayment({ amount: depositAmount, method });
  };

  // ────────── Redirect User To StarPayBD Checkout ──────────
  useEffect(() => {
    if (isSuccess && data?.payment_url) {
      toast.success("Payment page created successfully");
      window.location.href = data.payment_url;
    }

    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message ||
          "StarPayBD payment create failed",
      );
    }
  }, [isSuccess, isError, data, error]);

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title={`${methodName} Deposit`}
        subtitle="Pay securely through StarPayBD"
        back
      />

      {/* ────────── StarPayBD Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-500/18 via-indigo-950/90 to-cyan-950/35 p-4 shadow-[0_0_55px_rgba(236,72,153,.12)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-pink-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-pink-300/90">
              StarPayBD Checkout
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight">
              Deposit With {methodName}
            </h2>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Enter your BDT amount and continue to StarPayBD payment page.
            </p>
          </div>
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-pink-400/25 bg-pink-400/12 text-pink-300 shadow-[0_0_35px_rgba(244,114,182,.18)]">
            <HiBanknotes className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Deposit Amount Form ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Deposit Amount" title="Enter BDT Amount" />
        <div className="adnexa-glass-card rounded-2xl p-4">
          <label className="mb-3 block text-sm font-black text-slate-200">
            Amount
          </label>
          <div className="adnexa-input-wrap">
            <span className="adnexa-input-icon text-cyan-300">
              <HiCurrencyDollar className="text-2xl" />
            </span>
            <input
              type="number"
              min="10"
              className="adnexa-input"
              placeholder="Enter amount in BDT"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            You will be redirected to StarPayBD. After successful payment,
            your deposit will be verified automatically.
          </p>
        </div>
      </section>

      {/* ────────── Security Info ────────── */}
      <section className="adnexa-glass-card rounded-2xl p-4">
        <div className="flex gap-3">
          <HiShieldCheck className="shrink-0 text-3xl text-cyan-300" />
          <div>
            <h3 className="font-black text-white">Auto verification</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Please do not close the payment page before payment is completed.
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <HiCheckBadge className="shrink-0 text-3xl text-emerald-300" />
          <div>
            <h3 className="font-black text-white">BDT wallet credit</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Once verified, the amount will be added to your main balance.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Continue Button ────────── */}
      <button
        type="button"
        onClick={handleCreatePayment}
        disabled={!amount || isLoading}
        className="adnexa-primary-button"
      >
        {isLoading ? <RingLoader color="#fff" size={28} /> : "Continue"}
        {!isLoading && <HiArrowRight className="text-2xl" />}
      </button>
    </div>
  );
};

export default StarpayDeposit;
