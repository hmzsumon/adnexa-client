"use client";

import { formatBalance, formatDate } from "@/lib/functions";
import { MyPackage } from "@/types/types";
import React from "react";
import {
  HiArrowTrendingUp,
  HiCalendarDays,
  HiCheckCircle,
  HiClock,
  HiSparkles,
  HiTrophy,
} from "react-icons/hi2";

interface MyPackageCardProps {
  pac: MyPackage;
}

const MyPackageCard: React.FC<MyPackageCardProps> = ({ pac }) => {
  const statusLabel = pac?.is_expired ? "Completed" : "Active";
  const statusClass = pac?.is_expired
    ? "bg-slate-400/10 text-slate-300"
    : "bg-emerald-400/12 text-emerald-300";

  return (
    <article className="rounded-2xl border border-violet-400/20 bg-[#090d2b]/75 p-4 shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
      {/* ────────── Package Header ────────── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-500/25 to-cyan-500/10 text-violet-300 shadow-[0_0_35px_rgba(139,92,246,.18)]">
            <HiTrophy className="text-4xl drop-shadow-[0_0_16px_currentColor]" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-xl font-black text-white">
              {pac?.title || pac?.p_title || "My Package"}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Your active investment plan
            </p>
            <span
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${statusClass}`}
            >
              <HiCheckCircle /> {statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ────────── Price & Return Summary ────────── */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[.04] p-4">
        <p className="text-sm font-semibold text-slate-400">Package Price</p>
        <h4 className="mt-1 text-4xl font-black text-emerald-300">
          BDT {formatBalance(pac?.price || pac?.p_price || 0)}
        </h4>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-emerald-400/10 p-3">
            <p className="text-xs text-slate-400">Daily Return</p>
            <p className="mt-1 font-black text-emerald-300">
              {formatBalance(pac?.daily_return || 0)} BDT
            </p>
          </div>
          <div className="rounded-2xl bg-violet-400/10 p-3">
            <p className="text-xs text-slate-400">Total Return</p>
            <p className="mt-1 font-black text-violet-300">
              BDT {formatBalance(pac?.total_return || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* ────────── Package Details Grid ────────── */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="adnexa-glass-card rounded-[22px] p-3">
          <HiSparkles className="mb-2 text-2xl text-amber-300" />
          <p className="text-xs text-slate-400">Tasks/Day</p>
          <p className="mt-1 font-black text-white">{pac?.daily_tasks || 0}</p>
        </div>
        <div className="adnexa-glass-card rounded-[22px] p-3">
          <HiArrowTrendingUp className="mb-2 text-2xl text-cyan-300" />
          <p className="text-xs text-slate-400">Tasks Value</p>
          <p className="mt-1 font-black text-white">
            {formatBalance(pac?.tasks_value || 0)} BDT
          </p>
        </div>
        <div className="adnexa-glass-card rounded-[22px] p-3">
          <HiClock className="mb-2 text-2xl text-violet-300" />
          <p className="text-xs text-slate-400">Duration</p>
          <p className="mt-1 font-black text-white">
            {pac?.duration || pac?.p_duration || 0} days
          </p>
        </div>
        <div className="adnexa-glass-card rounded-[22px] p-3">
          <HiCalendarDays className="mb-2 text-2xl text-blue-300" />
          <p className="text-xs text-slate-400">
            {pac?.is_expired ? "Expired On" : "Started On"}
          </p>
          <p className="mt-1 text-sm font-black text-white">
            {formatDate(pac?.is_expired ? pac?.expire_date : pac?.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MyPackageCard;
