"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { useDepositWithBinanceMutation } from "@/redux/features/deposit/depositApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiClipboardDocument,
  HiCurrencyDollar,
  HiQrCode,
  HiShieldCheck,
} from "react-icons/hi2";
import { SiBinance, SiTether } from "react-icons/si";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const depositAddress = "TJVnLiPQxpUXL32rWE9Lefs3SRGE4jbt8V";

const BinancePayment = () => {
  const [depositWithBinance, { isLoading, isError, isSuccess, error }] =
    useDepositWithBinanceMutation();
  const [txId, setTxId] = useState("");

  // ────────── Copy Deposit Address ──────────
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress);
      toast.success("Address copied successfully");
    } catch {
      toast.error("Copy failed. Please copy manually.");
    }
  };

  // ────────── Confirm Binance Payment ──────────
  const handleConfirm = () => {
    const cleanTxId = txId.trim();
    if (!cleanTxId) {
      toast.error("Please enter a valid transaction ID");
      return;
    }
    depositWithBinance({ txId: cleanTxId });
  };

  // ────────── API Response Message ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deposit confirmed successfully");
      setTxId("");
    }
    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message ||
          "Deposit confirmation failed",
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Binance Pay"
        subtitle="Submit your TRC20 deposit proof"
        back
      />

      {/* ────────── Binance Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/18 via-indigo-950/90 to-cyan-950/35 p-4 shadow-[0_0_55px_rgba(245,158,11,.12)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300/90">
              Secure Payment
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight">
              Deposit USDT
            </h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              Send only USDT on Tron TRC20 network and submit your transaction
              ID.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/12 text-amber-300 shadow-[0_0_35px_rgba(251,191,36,.18)]">
            <SiBinance className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── QR Payment Card ────────── */}
      <section className="adnexa-glass-card relative overflow-hidden rounded-2xl p-4">
        <div className="pointer-events-none absolute -left-12 top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="relative z-10 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                Payment QR
              </p>
              <h3 className="mt-1 text-2xl font-black">Scan & Pay</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <HiQrCode className="text-2xl" />
            </div>
          </div>

          <div className="mx-auto w-fit rounded-2xl border border-white/10 bg-white/[.04] p-4 shadow-[0_0_40px_rgba(34,211,238,.12)]">
            <Image
              src="/binance_qr.png"
              width={220}
              height={220}
              alt="Binance QR"
              className="rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* ────────── Network & Address Card ────────── */}
      <section className="space-y-4">
        <SectionTitle
          subtitle="Deposit Details"
          title="Copy Payment Information"
        />
        <div className="adnexa-glass-card rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <SiTether className="text-2xl text-emerald-300" />
              <p className="mt-3 text-xs font-bold text-slate-400">Currency</p>
              <p className="text-lg font-black">USDT</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <HiShieldCheck className="text-2xl text-cyan-300" />
              <p className="mt-3 text-xs font-bold text-slate-400">Network</p>
              <p className="text-lg font-black">TRC20</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                TRC20 Address
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-300"
              >
                <HiClipboardDocument /> Copy
              </button>
            </div>
            <p className="break-all text-xs font-bold leading-6 text-slate-200">
              {depositAddress}
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Transaction ID Form ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Final Step" title="Submit Transaction ID" />
        <div className="adnexa-glass-card rounded-2xl p-4">
          <label className="mb-3 block text-sm font-black text-slate-200">
            Transaction ID / TXID
          </label>
          <div className="adnexa-input-wrap">
            <span className="adnexa-input-icon text-cyan-300">
              <HiCurrencyDollar className="text-2xl" />
            </span>
            <input
              type="text"
              className="adnexa-input"
              placeholder="Paste your transaction ID"
              value={txId}
              onChange={(e) => setTxId(e.target.value)}
            />
          </div>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            Please submit the exact transaction ID after sending payment. Wrong
            TXID may delay approval.
          </p>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!txId.trim() || isLoading}
          className="adnexa-primary-button"
        >
          {isLoading ? (
            <RingLoader color="#fff" size={28} />
          ) : (
            "Confirm Deposit"
          )}
          {!isLoading && <HiArrowRight className="text-2xl" />}
        </button>
      </section>
    </div>
  );
};

export default BinancePayment;
