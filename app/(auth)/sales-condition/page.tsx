"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import Link from "next/link";
import {
  HiArrowRight,
  HiChartBar,
  HiExclamationTriangle,
  HiShieldCheck,
} from "react-icons/hi2";

const SalesCondition = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Sales Condition"
        subtitle="Important team sales update"
        back
      />

      {/* ────────── Sales Condition Hero ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-amber-400/20 bg-gradient-to-br from-amber-500/18 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300/90">
              Important Notice
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">300 BDT</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Existing users are required to contribute a minimum sales volume
              to their team.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-amber-400/25 bg-amber-400/12 text-amber-300">
            <HiExclamationTriangle className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Condition Details ────────── */}
      <section className="adnexa-glass-card space-y-5 rounded-[30px] p-5">
        <div className="flex gap-4">
          <HiChartBar className="mt-1 shrink-0 text-3xl text-amber-300" />
          <div>
            <h3 className="text-xl font-black">Minimum Team Sales</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Each existing user must contribute a minimum of{" "}
              <span className="font-black text-amber-300">300 BDT</span> in
              sales to their respective teams.
            </p>
          </div>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex gap-4">
          <HiShieldCheck className="mt-1 shrink-0 text-3xl text-cyan-300" />
          <div>
            <h3 className="text-xl font-black">New Users Exempt</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This condition applies only to existing users. New users are
              exempt from this requirement.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Continue Button ────────── */}
      <Link href="/dashboard" className="adnexa-primary-button">
        Back to Dashboard <HiArrowRight className="text-2xl" />
      </Link>
    </div>
  );
};

export default SalesCondition;
