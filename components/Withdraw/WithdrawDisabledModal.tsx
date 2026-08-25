"use client";

import { useGetWithdrawStatusQuery } from "@/redux/features/company/companyApi";
import { useEffect, useState } from "react";
import { HiClock, HiPauseCircle, HiXMark } from "react-icons/hi2";

/**
 * Smart notice shown to users when the admin has paused withdrawals
 * platform-wide (Company.withdraw.is_withdraw === false).
 */
const WithdrawDisabledModal = () => {
  const { data, isSuccess } = useGetWithdrawStatusQuery(undefined);
  const [dismissed, setDismissed] = useState(false);

  const isWithdrawOff = isSuccess && data?.is_withdraw === false;
  const isOpen = isWithdrawOff && !dismissed;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-[#020316]/80 p-2 backdrop-blur-md sm:items-center sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) setDismissed(true);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdraw-disabled-title"
        className="relative w-full max-w-[400px] overflow-hidden rounded-[28px] border border-amber-300/20 bg-[#070a24] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-60 w-60 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-red-500/15 blur-3xl" />

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <HiXMark />
        </button>

        <div className="relative z-10 p-6 pb-7 sm:p-7">
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
            <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl" />
            <HiPauseCircle className="relative text-4xl" />
          </div>

          <h2
            id="withdraw-disabled-title"
            className="mt-4 text-center text-xl font-black tracking-tight text-white"
          >
            Withdrawals Paused
          </h2>
          <p className="mt-2 text-center text-sm font-medium leading-6 text-slate-400">
            Withdrawals are temporarily paused by the admin. Your balance is
            safe — you just can&apos;t submit a new withdraw request right
            now.
          </p>

          <div className="mt-5 flex gap-3 rounded-2xl border border-amber-300/10 bg-amber-300/[0.06] p-3.5">
            <HiClock className="mt-0.5 shrink-0 text-2xl text-amber-300" />
            <p className="text-[11px] font-medium leading-5 text-slate-300">
              Please check back a little later. We&apos;ll notify you as soon
              as withdrawals reopen.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            autoFocus
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(245,158,11,.28)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            Okay, Got it
          </button>
        </div>
      </section>
    </div>
  );
};

export default WithdrawDisabledModal;
