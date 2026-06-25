"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import Link from "next/link";
import {
  HiArrowRight,
  HiKey,
  HiLockClosed,
  HiShieldCheck,
} from "react-icons/hi2";

const ChangePin = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Change PIN"
        subtitle="Update your transaction PIN"
        back
      />
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300/90">
              Security PIN
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Change PIN
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your PIN must be at least 6 characters long.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-cyan-400/25 bg-cyan-400/12 text-cyan-300">
            <HiShieldCheck className="text-4xl" />
          </div>
        </div>
      </section>
      <section className="adnexa-glass-card space-y-5 rounded-[28px] p-4">
        {["Current PIN", "New PIN", "Repeat New PIN"].map((label, index) => (
          <div key={label}>
            <label className="mb-3 block text-sm font-black text-slate-200">
              {label}
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-cyan-300">
                {index === 0 ? (
                  <HiLockClosed className="text-2xl" />
                ) : (
                  <HiKey className="text-2xl" />
                )}
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
        <Link
          href="/settings/forgot-pin"
          className="block text-right text-sm font-black text-cyan-300"
        >
          Forgot your PIN?
        </Link>
      </section>
      <button type="button" disabled className="adnexa-primary-button">
        Submit <HiArrowRight className="text-2xl" />
      </button>
    </div>
  );
};

export default ChangePin;
