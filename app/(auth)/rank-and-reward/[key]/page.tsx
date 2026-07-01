"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { useGetMyRankRecordQuery } from "@/redux/features/rank/rankApi";
import { useParams } from "next/navigation";
import { HiCheckCircle, HiLockClosed, HiTrophy } from "react-icons/hi2";
import GridLoader from "react-spinners/GridLoader";

const RankDetailsPage = () => {
  const { key } = useParams();
  const { data = {}, isLoading } = useGetMyRankRecordQuery(undefined);
  const rank = data?.ranks?.find((item: any) => item.key === key);

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Rank Details"
        subtitle="Qualification and maintenance details"
        back
      />

      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <GridLoader size={25} color="#22d3ee" />
        </div>
      ) : !rank ? (
        <div className="adnexa-glass-card rounded-[28px] p-6 text-center text-slate-300">
          Rank not found.
        </div>
      ) : (
        <>
          {/* ────────── Rank Details Hero ────────── */}
          <section className="rounded-[30px] border border-amber-400/20 bg-gradient-to-br from-amber-500/15 via-indigo-950/90 to-violet-950/55 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[30px] border border-amber-400/25 bg-amber-400/10 text-amber-300">
                <HiTrophy className="text-5xl" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300">
                  Monthly Salary
                </p>
                <h1 className="mt-1 text-2xl font-black">{rank.title}</h1>
                <p className="mt-1 text-xl font-black text-emerald-300">
                  BDT {rank.salary?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* ────────── Progress Bar ────────── */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-400">
                <span>Qualification Progress</span>
                <span>{rank.progress || 0}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                  style={{ width: `${rank.progress || 0}%` }}
                />
              </div>
            </div>
          </section>

          {/* ────────── Qualification Checklist ────────── */}
          <section className="space-y-4">
            <SectionTitle
              subtitle="Requirements"
              title="Qualification Checklist"
            />
            <div className="space-y-3">
              {rank.checks?.map((check: any, index: number) => {
                const done = check.current >= check.required;
                return (
                  <div
                    key={index}
                    className="adnexa-glass-card flex items-center justify-between rounded-[24px] p-4"
                  >
                    <div>
                      <p className="font-black text-white">{check.label}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        {check.current} / {check.required}
                      </p>
                    </div>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${done ? "bg-emerald-400/15 text-emerald-300" : "bg-slate-500/10 text-slate-400"}`}
                    >
                      {done ? (
                        <HiCheckCircle className="text-2xl" />
                      ) : (
                        <HiLockClosed className="text-xl" />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ────────── Maintenance Note ────────── */}
          <section className="rounded-[26px] border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            After achieving a rank, you must continue to meet all qualification
            requirements and recruit at least 1 new direct member every week.
          </section>
        </>
      )}
    </div>
  );
};

export default RankDetailsPage;
