"use client";

import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import WithdrawSecurity from "@/components/Withdraw/WithdrawSecurity";
import {
  useFindUserByCustomerIdMutation,
  useSendMutation,
} from "@/redux/features/send/sendApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiCurrencyDollar,
  HiPaperAirplane,
  HiShieldCheck,
  HiUserCircle,
  HiWallet,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const SendMoney = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);

  // ────────── Send Form State ──────────
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const [recipient, setRecipient] = useState<any>(null);
  const [recipientError, setRecipientError] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [findUserByCustomerId, { isLoading: finding }] =
    useFindUserByCustomerIdMutation();
  const [send, { isLoading: sending, isError, isSuccess, error }] =
    useSendMutation();

  // ────────── Fee Calculation ──────────
  useEffect(() => {
    const numericAmount = Number(amount || 0);
    if (numericAmount >= 10) {
      const feeAmount = (numericAmount * 0.5) / 100;
      setFee(feeAmount);
      setReceiveAmount(numericAmount - feeAmount);
      return;
    }
    setFee(0);
    setReceiveAmount(0);
  }, [amount]);

  // ────────── Partner ID Input Handler ──────────
  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientError("");
    setRecipient(null);
    setIsVerify(false);
    setUserId(e.target.value);
  };

  // ────────── Amount Input Handler ──────────
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = Number(value || 0);
    setAmountError("");
    setAmount(value);
    setIsVerify(false);

    if (numericValue < 10) setAmountError("Minimum amount is 10 BDT");
    if (numericValue > Number(user?.m_balance || 0))
      setAmountError("Amount is greater than your balance");
  };

  // ────────── Find Recipient Handler ──────────
  const handleFindUserByCustomerId = async () => {
    try {
      setRecipientError("");
      const res = await findUserByCustomerId(userId.trim()).unwrap();
      if (res?.user?.partner_id === user?.partner_id) {
        setRecipientError("You cannot send to yourself");
        setRecipient(null);
        return;
      }
      setRecipient(res?.user);
    } catch (err) {
      setRecipientError(
        (err as fetchBaseQueryError).data?.message || "Recipient not found",
      );
    }
  };

  // ────────── Security Verify Handler ──────────
  const handleVerify = () => setIsVerify(true);

  // ────────── Send Submit Handler ──────────
  const handleSubmit = () => {
    const data = {
      recipient_id: recipient?.partner_id,
      amount: Number(amount),
      fee,
      receive_amount: receiveAmount,
    };
    send(data);
  };

  // ────────── Send Response Message ──────────
  useEffect(() => {
    if (isError)
      toast.error(
        (error as fetchBaseQueryError).data?.message || "Send failed",
      );
    if (isSuccess) {
      toast.success("Send successfully");
      router.push("/transactions");
    }
  }, [isError, error, isSuccess, router]);

  const canFind = !!userId.trim() && !!amount && !amountError;
  const canSend =
    !!recipient && !!amount && !amountError && isVerify && !sending;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Send BDT"
        subtitle="Transfer balance to another user"
        back
      />

      {/* ────────── Send Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-500/18 via-indigo-950/90 to-cyan-950/35 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300/90">
              User Transfer
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Send Funds
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter partner ID, verify recipient, then securely transfer BDT
              from your main wallet.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-violet-400/25 bg-violet-500/15 text-violet-300">
            <HiPaperAirplane className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Send Summary Cards ────────── */}
      <section className="grid grid-cols-3 gap-3">
        <NeonStatCard
          label="Balance"
          value={`BDT ${Number(user?.m_balance || 0).toFixed(2)}`}
          description="available"
          icon={HiWallet}
          variant="green"
        />
        <NeonStatCard
          label="Fee"
          value="0.5%"
          description="transfer"
          icon={HiCurrencyDollar}
          variant="amber"
        />
        <NeonStatCard
          label="Receive"
          value={`BDT ${receiveAmount.toFixed(2)}`}
          description="after fee"
          icon={HiPaperAirplane}
          variant="violet"
        />
      </section>

      {/* ────────── Recipient & Amount Form ────────── */}
      <section className="space-y-4">
        <SectionTitle
          subtitle="Transfer Details"
          title="Recipient Information"
        />
        <div className="adnexa-glass-card space-y-5 rounded-[28px] p-4">
          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              Partner ID
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-cyan-300">
                <HiUserCircle className="text-2xl" />
              </span>
              <input
                type="text"
                className="adnexa-input"
                placeholder="Enter user partner ID"
                value={userId}
                onChange={handleChangeUserId}
              />
            </div>
            {recipientError && (
              <p className="mt-2 text-sm font-black text-red-300">
                {recipientError}
              </p>
            )}
          </div>

          <div>
            <label className="mb-3 block text-sm font-black text-slate-200">
              Send Amount
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-violet-300">
                <HiCurrencyDollar className="text-2xl" />
              </span>
              <input
                type="number"
                className="adnexa-input"
                placeholder="Enter amount"
                value={amount}
                onChange={handleChangeAmount}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-emerald-300">
              Fee: {fee.toFixed(2)} BDT · Recipient receives:{" "}
              {receiveAmount.toFixed(2)} BDT
            </p>
            {amountError && (
              <p className="mt-2 text-sm font-black text-red-300">
                {amountError}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ────────── Recipient Preview ────────── */}
      {recipient && (
        <section className="adnexa-glass-card rounded-[28px] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <HiUserCircle className="text-3xl" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Recipient
              </p>
              <h3 className="text-xl font-black text-white">
                {recipient?.name}
              </h3>
              <p className="text-sm font-bold text-slate-400">
                Customer ID: {recipient?.customer_id}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-[22px] border border-white/10 bg-white/[.035] p-3 text-center">
            <div>
              <p className="text-[11px] text-slate-500">Amount</p>
              <p className="font-black">BDT {amount || 0}</p>
            </div>
            <div className="border-x border-white/10">
              <p className="text-[11px] text-slate-500">Charge</p>
              <p className="font-black">{fee.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500">Receive</p>
              <p className="font-black text-emerald-300">
                {receiveAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ────────── Submit Action ────────── */}
      {recipient ? (
        isVerify ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSend}
            className="adnexa-primary-button"
          >
            {sending ? (
              <RingLoader color="#fff" size={28} />
            ) : (
              "Proceed to Send"
            )}
            {!sending && <HiArrowRight className="text-2xl" />}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="adnexa-primary-button"
          >
            Security Verify <HiShieldCheck className="text-2xl" />
          </button>
        )
      ) : (
        <button
          type="button"
          onClick={handleFindUserByCustomerId}
          disabled={!canFind || finding}
          className="adnexa-primary-button"
        >
          {finding ? <RingLoader color="#fff" size={28} /> : "Find Recipient"}
          {!finding && <HiArrowRight className="text-2xl" />}
        </button>
      )}

      {/* ────────── Security Modal ────────── */}
      <WithdrawSecurity
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleVerify}
      />
    </div>
  );
};

export default SendMoney;
