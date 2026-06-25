"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import {
  HiArrowRight,
  HiKey,
  HiLockClosed,
  HiShieldCheck,
} from "react-icons/hi2";

const ChangePassword = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Change Password"
        subtitle="Update account security"
        back
      />

      {/* ────────── Security Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-500/18 via-indigo-950/90 to-cyan-950/35 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300/90">
              Security
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Password
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use a strong password to keep your Adnexa account protected.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-violet-400/25 bg-violet-500/15 text-violet-300">
            <HiShieldCheck className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Password Form ────────── */}
      <section className="adnexa-glass-card space-y-5 rounded-[28px] p-4">
        {["Current Password", "New Password", "Repeat New Password"].map(
          (label, index) => (
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
          ),
        )}
      </section>

      {/* ────────── Submit Button ────────── */}
      <button type="button" disabled className="adnexa-primary-button">
        Submit <HiArrowRight className="text-2xl" />
      </button>
    </div>
  );
};

export default ChangePassword;
