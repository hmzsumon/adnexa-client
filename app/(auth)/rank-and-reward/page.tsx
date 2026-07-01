"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import RankDataCard from "@/components/RankAndRewards/RankDataCard";
import { useGetMyRankRecordQuery } from "@/redux/features/rank/rankApi";
import Link from "next/link";
import {
  HiAcademicCap,
  HiBriefcase,
  HiChartBar,
  HiCheckBadge,
  HiShieldCheck,
  HiTrophy,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import GridLoader from "react-spinners/GridLoader";

const iconMap: any = {
  "Entry Assistant": <HiAcademicCap className="text-4xl" />,
  "Official Assistant": <HiCheckBadge className="text-4xl" />,
  "Official Supervisor": <HiShieldCheck className="text-4xl" />,
  "Marketing Manager": <HiBriefcase className="text-4xl" />,
  "Regional Director": <HiTrophy className="text-4xl" />,
};

const RankAndReward = () => {
  const { user = {} } = useSelector((state: any) => state.auth);
  const { data = {}, isLoading } = useGetMyRankRecordQuery(undefined);
  const { rankData = {}, ranks = [] } = data;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Rank & Salary"
        subtitle="Build your team and unlock monthly salary"
        back
      />

      {/* ────────── Rank Hero Section ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/15 via-indigo-950/90 to-violet-950/55 p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
            <HiTrophy className="text-4xl" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300/90">
              Achievement Salary
            </p>
            <h2 className="mt-1 text-xl font-black">Unlock Rank Salary</h2>
            <p className="mt-2 text-[0.7rem] leading-6 text-slate-400">
              Maintain your qualification and recruit at least one new direct
              member every week to stay eligible.
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <GridLoader size={25} color="#22d3ee" />
        </div>
      ) : (
        <>
          {/* ────────── My Rank Summary ────────── */}
          <section className="space-y-4">
            <SectionTitle subtitle="Progress" title="My Rank Record" />
            <RankDataCard
              rankData={rankData}
              rank={user?.rank || data?.rankRecord?.current_rank}
            />
          </section>

          {/* ────────── Rank Salary List ────────── */}
          <section className="space-y-4">
            <SectionTitle subtitle="Salary Levels" title="Available Ranks" />
            <div className="space-y-4">
              {ranks.map((rank: any) => (
                <Link
                  key={rank.key}
                  href={`/rank-and-reward/${rank.key}`}
                  className="block"
                >
                  <article
                    className={`rounded-[28px] border p-4 shadow-2xl backdrop-blur-xl ${rank.isQualified ? "border-emerald-400/30 bg-emerald-500/10" : "border-violet-400/20 bg-[#090d2b]/75"}`}
                  >
                    {/* ────────── Rank Card Header ────────── */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-amber-400/25 bg-amber-400/10 text-amber-300">
                        {iconMap[rank.title] || (
                          <HiTrophy className="text-4xl" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl font-black text-white">
                          {rank.title}
                        </h3>
                        <p className="mt-1 text-sm font-black text-emerald-300">
                          BDT {rank.salary?.toLocaleString()} / Month
                        </p>
                      </div>
                      <HiChartBar className="text-2xl text-cyan-300" />
                    </div>

                    {/* ────────── Rank Progress Bar ────────── */}
                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
                        <span>Progress</span>
                        <span>{rank.progress || 0}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                          style={{ width: `${rank.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* ────────── Rank Status ────────── */}
                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/[.045] px-4 py-3 text-sm">
                      <span className="text-slate-400">Status</span>
                      <span
                        className={`font-black ${rank.isMaintained ? "text-emerald-300" : rank.isQualified ? "text-amber-300" : "text-slate-300"}`}
                      >
                        {rank.isMaintained
                          ? "Maintained"
                          : rank.isQualified
                            ? "Achieved"
                            : "Locked"}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default RankAndReward;
