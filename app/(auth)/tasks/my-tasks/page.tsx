// adnexa-client-master/app/(auth)/tasks/my-tasks/page.tsx
"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import PageHeader from "@/components/MobileApp/PageHeader";
import VideoTaskPlayer from "@/components/Tasks/VideoTaskPlayer";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import {
  useCompleteTaskMutation,
  useGetMyTasksQuery,
  useStartTaskWatchMutation,
} from "@/redux/features/tasks/tasksApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HiArrowPath,
  HiCheckCircle,
  HiOutlineFilm,
  HiSparkles,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const CURRENCY = "BDT";

export default function MyTasksPage() {
  /* ────────── User & Task Data ────────── */
  useLoadUserQuery();
  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading, isFetching, refetch } = useGetMyTasksQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const [startTaskWatch] = useStartTaskWatchMutation();
  const [completeTask, { isLoading: claiming }] = useCompleteTaskMutation();

  const message = data?.message;
  const dailyTasks = data?.dailyTasks || null;
  const tasks = useMemo(
    () => (Array.isArray(dailyTasks?.tasks) ? dailyTasks.tasks : []),
    [dailyTasks],
  );

  const pendingTasks = useMemo(
    () => tasks.filter((t: any) => !t?.completed),
    [tasks],
  );

  const total = tasks.length;
  const completedCount = total - pendingTasks.length;
  const perTask = Number(dailyTasks?.tasks_value || 0);
  const dailyReturn = Number(dailyTasks?.daily_return || 0);
  const earnedToday = perTask * completedCount;
  const completedProgress = total > 0 ? (completedCount / total) * 100 : 0;

  /* ────────── Active Video Index ────────── */
  const [index, setIndex] = useState(0);
  const currentTask = pendingTasks[index] || null;

  useEffect(() => {
    if (index >= pendingTasks.length) setIndex(0);
  }, [pendingTasks.length, index]);

  /* ────────── Preload Next Video ────────── */
  useEffect(() => {
    const next = pendingTasks[index + 1];
    const url = next?.video_url || next?.fallback_url;
    if (!url || typeof document === "undefined") return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "video";
    link.href = url;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [pendingTasks, index]);

  /* ────────── Start Watch Session ────────── */
  const handleStart = useCallback(
    async (taskId: string) => {
      try {
        const res: any = await startTaskWatch({ taskId }).unwrap();
        return {
          watchToken: res?.watchToken,
          requiredSeconds: Number(res?.requiredSeconds || 0),
        };
      } catch (e: any) {
        toast.error(e?.data?.message || "Could not start this ad");
        return null;
      }
    },
    [startTaskWatch],
  );

  /* ────────── Claim Reward ────────── */
  const handleClaim = useCallback(
    async (payload: {
      taskId: string;
      watchToken: string;
      watchedSeconds: number;
    }) => {
      try {
        await completeTask(payload).unwrap();
        toast.success(`+${perTask.toFixed(4)} ${CURRENCY} credited`);
        await refetch();
        return true;
      } catch (e: any) {
        toast.error(e?.data?.message || e?.message || "Failed to claim reward");
        return false;
      }
    },
    [completeTask, perTask, refetch],
  );

  return (
    <div className="space-y-5 pb-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Watch & Earn"
        subtitle="Watch sponsored videos, get paid per view"
        back
      />

      {/* ────────── Earning Hero ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/60 p-5 shadow-[0_0_55px_rgba(34,211,238,.12)]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-[0.6rem] font-black uppercase tracking-[0.2em] text-cyan-300/90">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Today&apos;s earning
              </p>
              <p className="mt-2 font-mono text-3xl font-black tracking-tight text-emerald-300">
                {earnedToday.toFixed(4)}
              </p>
              <p className="mt-1 text-[0.65rem] font-semibold text-slate-400">
                of {dailyReturn.toFixed(4)} {CURRENCY} available today
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/12 text-cyan-300">
              <HiOutlineFilm className="text-3xl" />
            </div>
          </div>

          {/* daily progress */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-[0.6rem] font-black uppercase tracking-widest text-slate-400">
              <span>
                {completedCount} / {total || 0} videos watched
              </span>
              <span>{Math.round(completedProgress)}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/[.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-500 transition-all duration-500"
                style={{ width: `${completedProgress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Wallet Strip ────────── */}
      <section className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[.045] p-3 text-center">
        <div>
          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">
            Balance
          </p>
          <p className="mt-1 font-mono text-sm font-black text-emerald-300">
            {Number(user?.m_balance || 0).toFixed(2)}
          </p>
        </div>
        <div className="border-x border-white/10">
          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">
            Per video
          </p>
          <p className="mt-1 font-mono text-sm font-black text-cyan-300">
            {perTask.toFixed(4)}
          </p>
        </div>
        <div>
          <p className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">
            Remaining
          </p>
          <p className="mt-1 font-mono text-sm font-black text-violet-300">
            {pendingTasks.length}
          </p>
        </div>
      </section>

      {/* ────────── API Message ────────── */}
      {message && (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-bold text-amber-200">
          {message}
        </div>
      )}

      {/* ────────── Main Content ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : !dailyTasks ? (
        <EmptyState
          title="No videos available"
          subtitle="There are no sponsored videos assigned for today. Please check again later."
          icon={HiSparkles}
        />
      ) : !currentTask ? (
        <EmptyState
          title="All videos watched"
          subtitle={`Great work! You earned ${earnedToday.toFixed(
            4,
          )} ${CURRENCY} today.`}
          actionLabel="View report"
          actionHref="/tasks/tasks-report"
          icon={HiCheckCircle}
        />
      ) : (
        <>
          <VideoTaskPlayer
            key={String(currentTask?._id || currentTask?.id)}
            task={currentTask}
            reward={perTask}
            currency={CURRENCY}
            index={completedCount + 1}
            total={total}
            claiming={claiming}
            onStart={handleStart}
            onClaim={handleClaim}
          />

          {/* ────────── Up Next Playlist ────────── */}
          {pendingTasks.length > 1 && (
            <section className="space-y-2">
              <p className="px-1 text-[0.6rem] font-black uppercase tracking-[0.2em] text-slate-400">
                Up next
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {pendingTasks.map((t: any, i: number) => {
                  const active = i === index;
                  return (
                    <button
                      key={String(t?._id || t?.id || i)}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border text-left transition-all ${
                        active
                          ? "border-cyan-400/60 ring-2 ring-cyan-400/30"
                          : "border-white/10 opacity-65"
                      }`}
                    >
                      {t?.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={t.thumbnail}
                          alt={t?.title || "ad"}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center bg-white/[.05] text-slate-500">
                          <HiOutlineFilm className="text-2xl" />
                        </span>
                      )}

                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2 pb-1 pt-4">
                        <span className="block truncate text-[0.6rem] font-black text-white">
                          {t?.title || "Sponsored"}
                        </span>
                      </span>

                      {Number(t?.duration) > 0 && (
                        <span className="absolute right-1.5 top-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[0.55rem] font-black text-slate-200">
                          {Math.round(Number(t.duration))}s
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* ────────── Refresh ────────── */}
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="w-full rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3 text-sm font-black text-slate-200 disabled:opacity-50"
          >
            <HiArrowPath
              className={`mr-1.5 inline text-cyan-300 ${
                isFetching ? "animate-spin" : ""
              }`}
            />
            Refresh videos
          </button>
        </>
      )}
    </div>
  );
}
