"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import {
  HiArrowRight,
  HiKey,
  HiLockClosed,
  HiPaperAirplane,
} from "react-icons/hi2";

const ForgotPin = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader title="Forgot PIN" subtitle="Reset your security PIN" back />
      <section className="relative overflow-hidden rounded-[32px] border border-amber-400/20 bg-gradient-to-br from-amber-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300/90">
              PIN Recovery
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Reset PIN
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Get a security code and create a new transaction PIN.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-amber-400/25 bg-amber-400/12 text-amber-300">
            <HiKey className="text-4xl" />
          </div>
        </div>
      </section>
      <section className="adnexa-glass-card space-y-5 rounded-[28px] p-4">
        <div>
          <label className="mb-3 block text-sm font-black text-slate-200">
            Security Code
          </label>
          <div className="adnexa-input-wrap">
            <span className="adnexa-input-icon text-amber-300">
              <HiPaperAirplane className="text-2xl" />
            </span>
            <input
              type="text"
              className="adnexa-input"
              placeholder="Enter security code"
              autoComplete="off"
            />
            <button
              type="button"
              className="mr-3 rounded-2xl bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-300"
            >
              Get Code
            </button>
          </div>
        </div>
        {["New PIN", "Repeat New PIN"].map((label) => (
          <div key={label}>
            <label className="mb-3 block text-sm font-black text-slate-200">
              {label}
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-cyan-300">
                <HiLockClosed className="text-2xl" />
              </span>
              <input
                type="password"
                className="adnexa-input"
                placeholder={label}
                autoComplete="off"
              />
            </div>
          </div>
        ))}
      </section>
      <button type="button" disabled className="adnexa-primary-button">
        Submit <HiArrowRight className="text-2xl" />
      </button>
    </div>
  );
};

export default ForgotPin;
