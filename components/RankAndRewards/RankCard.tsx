"use client";

import { FaCoins, FaUser, FaUsers } from "react-icons/fa6";
import { HiCheckCircle, HiLockClosed } from "react-icons/hi2";

const RankCard = ({ item }: any) => {
  return (
    <article
      className={`rounded-[28px] border p-4 shadow-2xl backdrop-blur-xl ${item?.is_active ? "border-emerald-400/30 bg-emerald-500/10 shadow-emerald-950/20" : "border-violet-400/20 bg-[#090d2b]/75 shadow-violet-950/20"}`}
    >
      {/* ────────── Rank Header ────────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-amber-400/25 bg-amber-400/10 text-amber-300">
            {item?.icon}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-xl font-black text-white">
              {item?.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">{item?.deposit}</p>
          </div>
        </div>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${item?.is_active ? "bg-emerald-400/15 text-emerald-300" : "bg-slate-500/10 text-slate-400"}`}
        >
          {item?.is_active ? (
            <HiCheckCircle className="text-2xl" />
          ) : (
            <HiLockClosed className="text-xl" />
          )}
        </span>
      </div>

      {/* ────────── Rank Requirement Grid ────────── */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
        <div>
          <FaUser className="mx-auto mb-1 text-lg text-cyan-300" />
          <p className="text-[11px] text-slate-500">Direct</p>
          <p className="mt-1 font-black text-white">{item?.user}</p>
        </div>
        <div className="border-x border-white/10">
          <FaUsers className="mx-auto mb-1 text-lg text-violet-300" />
          <p className="text-[11px] text-slate-500">Team</p>
          <p className="mt-1 font-black text-white">{item?.users}</p>
        </div>
        <div>
          <FaCoins className="mx-auto mb-1 text-lg text-amber-300" />
          <p className="text-[11px] text-slate-500">Reward</p>
          <p className="mt-1 font-black text-amber-300">${item?.salary}</p>
        </div>
      </div>
    </article>
  );
};

export default RankCard;
