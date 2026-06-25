"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { formatDate } from "@/lib/functions";
import { useGetTasksReportQuery } from "@/redux/features/tasks/tasksApi";
import { useMemo } from "react";
import {
  HiCalendarDays,
  HiChartBar,
  HiCheckBadge,
  HiClipboardDocumentList,
  HiCurrencyDollar,
} from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";

const TasksReport = () => {
  // ────────── Task Report Data ──────────
  const { data: tasksData, isLoading } = useGetTasksReportQuery(undefined);
  const tasksReports = tasksData?.tasksReports || [];

  // ────────── Report Summary Calculation ──────────
  const summary = useMemo(() => {
    return tasksReports.reduce(
      (acc: any, item: any) => {
        acc.totalValue += Number(item?.tasks_value || 0);
        acc.totalEarning += Number(item?.total_earning || 0);
        acc.completed += Number(
          item?.tasks_completed || item?.completed_tasks || 0,
        );
        return acc;
      },
      { totalValue: 0, totalEarning: 0, completed: 0 },
    );
  }, [tasksReports]);

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Task Report"
        subtitle="Your daily task earning history"
        back
      />

      {/* ────────── Report Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-indigo-950/90 to-cyan-950/35 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300/90">
              Performance
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Task Report
            </h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              Track your completed tasks, reward value, and total daily
              earnings.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/15 text-violet-300">
            <HiClipboardDocumentList className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Report Summary Cards ────────── */}
      <section className="grid grid-cols-1 gap-2">
        <NeonStatCard
          label="Reports"
          value={tasksReports.length}
          description="records"
          icon={HiCalendarDays}
          variant="teal"
        />
        <NeonStatCard
          label="Task Value"
          value={`$${summary.totalValue.toFixed(2)}`}
          description="total value"
          icon={HiChartBar}
          variant="violet"
        />
        <NeonStatCard
          label="Earning"
          value={`$${summary.totalEarning.toFixed(2)}`}
          description="total earned"
          icon={HiCurrencyDollar}
          variant="green"
        />
      </section>

      {/* ────────── Report List ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : tasksReports.length === 0 ? (
        <EmptyState
          title="No task report yet"
          subtitle="Complete daily tasks and your earning report will appear here."
          icon={HiCheckBadge}
        />
      ) : (
        <section className="space-y-4">
          <SectionTitle subtitle="History" title="Latest Task Reports" />
          {tasksReports.map((record: any) => (
            <article
              key={record?._id || record?.createdAt}
              className="adnexa-glass-card rounded-[26px] p-4"
            >
              {/* ────────── Single Report Header ────────── */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <HiCalendarDays className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-black text-white">
                      {formatDate(record?.createdAt)}
                    </h3>
                    <p className="text-xs font-bold text-slate-400">
                      Completed tasks report
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                  Completed
                </span>
              </div>

              {/* ────────── Single Report Metrics ────────── */}
              <div className="mt-4 grid grid-cols-3 gap-2 rounded-[22px] border border-white/10 bg-white/[.035] p-3 text-center">
                <div>
                  <p className="text-[11px] font-bold text-slate-500">
                    Task Value
                  </p>
                  <p className="mt-1 text-sm font-black text-cyan-300">
                    ${Number(record?.tasks_value || 0).toFixed(4)}
                  </p>
                </div>
                <div className="border-x border-white/10">
                  <p className="text-[11px] font-bold text-slate-500">
                    Completed
                  </p>
                  <p className="mt-1 text-sm font-black text-white">
                    {record?.tasks_completed || record?.completed_tasks || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500">
                    Earning
                  </p>
                  <p className="mt-1 text-sm font-black text-emerald-300">
                    ${Number(record?.total_earning || 0).toFixed(4)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default TasksReport;
