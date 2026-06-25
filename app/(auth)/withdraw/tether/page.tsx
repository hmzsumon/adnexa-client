"use client";

import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import WithdrawSecurity from "@/components/Withdraw/WithdrawSecurity";
import { useCreateWithdrawRequestMutation } from "@/redux/features/withdraw/withdrawApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import React, { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiArrowUpTray,
  HiCurrencyDollar,
  HiMapPin,
  HiShieldCheck,
  HiWallet,
} from "react-icons/hi2";
import { SiTether } from "react-icons/si";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const TetherUsdt = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [withdraw, { isLoading, isSuccess, isError, error }] =
    useCreateWithdrawRequestMutation();

  // ────────── Withdraw Form State ──────────
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [availableAmount, setAvailable] = useState<number>(0);
  const [receiveAmount, setReceiveAmount] = useState<number>(0);
  const [errorText, setErrorText] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // ────────── Available Balance Sync ──────────
  useEffect(() => {
    setAvailable(Number(user?.m_balance || 0));
  }, [user]);

  // ────────── Amount Calculation ──────────
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value || 0);
    setAmount(value);

    if (numericValue < 15) {
      setErrorText("Minimum amount is 15 USDT");
      setReceiveAmount(0);
      return;
    }
    if (numericValue > availableAmount) {
      setErrorText("Insufficient balance");
      setReceiveAmount(0);
      return;
    }

    setErrorText("");
    setReceiveAmount(numericValue - numericValue * 0.05);
  };

  // ────────── Submit Withdraw Request ──────────
  const handleSubmit = () => {
    const data = {
      amount,
      net_amount: receiveAmount,
      charge_p: 0.05,
      charge_a: 0,
      method: {
        name: "Tether (USDT TRC20)",
        network: "Tron (TRC20)",
        address,
      },
    };
    withdraw(data);
  };

  // ────────── API Response Message ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Withdraw request submitted successfully");
      setAmount("");
      setAddress("");
      setReceiveAmount(0);
      setErrorText("");
    }
    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message ||
          "Withdraw request failed",
      );
    }
  }, [isSuccess, isError, error]);

  const submitDisabled =
    !!errorText || !amount || !address || user?.is_block || isLoading;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Withdraw USDT"
        subtitle="Cash out through TRC20 network"
        back
      />

      {/* ────────── Withdraw Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/18 via-indigo-950/90 to-violet-950/50 p-5 shadow-[0_0_55px_rgba(59,130,246,.12)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300/90">
              TRC20 Cashout
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Withdraw
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter your USDT TRC20 address and confirm the request with
              security verification.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-blue-400/25 bg-blue-400/12 text-blue-300">
            <HiArrowUpTray className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Withdraw Summary Cards ────────── */}
      <section className="grid grid-cols-3 gap-3">
        <NeonStatCard
          label="Available"
          value={`$${Number(availableAmount || 0).toFixed(2)}`}
          description="USDT"
          icon={HiWallet}
          variant="green"
        />
        <NeonStatCard
          label="Fee"
          value="5%"
          description="processing"
          icon={HiCurrencyDollar}
          variant="amber"
        />
        <NeonStatCard
          label="Minimum"
          value="$15"
          description="withdraw"
          icon={SiTether as any}
          variant="teal"
        />
      </section>

      {/* ────────── Withdraw Form ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Request Form" title="Withdrawal Details" />
        <div className="adnexa-glass-card space-y-5 rounded-[28px] p-4">
          {/* ────────── Wallet Address Input ────────── */}
          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              TRC20 Address
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-cyan-300">
                <HiMapPin className="text-2xl" />
              </span>
              <input
                className="adnexa-input"
                type="text"
                placeholder="Enter your TRC20 address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* ────────── Network Input ────────── */}
          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              Network
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-emerald-300">
                <SiTether className="text-2xl" />
              </span>
              <input
                className="adnexa-input"
                type="text"
                readOnly
                value="Tron (TRC20)"
              />
            </div>
          </div>

          {/* ────────── Amount Input ────────── */}
          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              Amount
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-violet-300">
                <HiCurrencyDollar className="text-2xl" />
              </span>
              <input
                className="adnexa-input"
                type="number"
                placeholder="Enter amount to withdraw"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-400">
              <span>
                Available:{" "}
                <b className="text-white">
                  {Number(availableAmount || 0).toFixed(2)}
                </b>{" "}
                USDT
              </span>
              <span>
                Min: <b className="text-white">15</b> USDT
              </span>
            </div>
            {errorText && (
              <p className="mt-2 text-sm font-black text-red-300">
                {errorText}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ────────── Receive Amount Preview ────────── */}
      <section className="adnexa-glass-card rounded-[28px] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
              You will receive
            </p>
            <h3 className="mt-1 text-3xl font-black text-emerald-300">
              {receiveAmount.toFixed(2)} USDT
            </h3>
            <p className="mt-1 text-sm font-bold text-slate-500">
              After 5% processing fee
            </p>
          </div>
          <HiShieldCheck className="text-4xl text-cyan-300" />
        </div>
      </section>

      {/* ────────── Submit Button ────────── */}
      <button
        type="button"
        onClick={() => setOpenModal(true)}
        disabled={submitDisabled}
        className="adnexa-primary-button"
      >
        {isLoading ? <RingLoader color="#fff" size={28} /> : "Submit Withdraw"}
        {!isLoading && <HiArrowRight className="text-2xl" />}
      </button>
      {user?.is_block && (
        <p className="rounded-[20px] border border-red-400/20 bg-red-400/10 p-4 text-sm font-black text-red-300">
          Your account is blocked.
        </p>
      )}

      {/* ────────── Security Confirm Modal ────────── */}
      <WithdrawSecurity
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TetherUsdt;
