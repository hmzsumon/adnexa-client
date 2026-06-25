"use client";

import { formatBalance } from "@/lib/functions";
import { FaUser, FaUsers } from "react-icons/fa6";
import { HiChartBar, HiTrophy } from "react-icons/hi2";

const RankDataCard = ({ rankData, rank }: any) => {
  return (
    <div className="adnexa-glass-card rounded-[30px] p-4">
      {/* ────────── Current Rank Header ────────── */}
      <div className="flex items-center gap-4">
        <div className="flex h-18 w-18 h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[26px] border border-amber-400/25 bg-amber-400/10 text-amber-300 shadow-[0_0_35px_rgba(245,158,11,.16)]">
          <HiTrophy className="text-4xl" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300/80">
            My Rank
          </p>
          <h2 className="mt-1 text-3xl font-black capitalize text-white">
            {rank || "Member"}
          </h2>
        </div>
      </div>

      {/* ────────── Rank Progress Data ────────── */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-[22px] bg-white/[.045] p-3 text-center">
          <FaUser className="mx-auto mb-2 text-xl text-cyan-300" />
          <p className="text-[11px] text-slate-500">Direct</p>
          <p className="mt-1 font-black text-white">
            {rankData?.directReferUsers || 0}
          </p>
        </div>
        <div className="rounded-[22px] bg-white/[.045] p-3 text-center">
          <FaUsers className="mx-auto mb-2 text-xl text-violet-300" />
          <p className="text-[11px] text-slate-500">Team</p>
          <p className="mt-1 font-black text-white">
            {rankData?.teamMembers || 0}
          </p>
        </div>
        <div className="rounded-[22px] bg-white/[.045] p-3 text-center">
          <HiChartBar className="mx-auto mb-2 text-xl text-emerald-300" />
          <p className="text-[11px] text-slate-500">Sales</p>
          <p className="mt-1 font-black text-white">
            ${formatBalance(rankData?.salesValue || 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankDataCard;
