"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import PageHeader from "@/components/MobileApp/PageHeader";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import {
  useCompleteTaskMutation,
  useGetMyTasksQuery,
} from "@/redux/features/tasks/tasksApi";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  HiArrowPath,
  HiCheckBadge,
  HiCheckCircle,
  HiEye,
  HiSparkles,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const WAIT_SECONDS = 15;
const LOCAL_FALLBACK_POOL = [
  "/fallback/task1.jpg",
  "/fallback/task2.jpg",
  "/fallback/task3.jpg",
];

function getCandidateUrls(task: any) {
  const list: string[] = [];
  if (Array.isArray(task?.urls)) list.push(...task.urls);
  if (Array.isArray(task?.images)) list.push(...task.images);
  if (task?.url) list.push(task.url);
  if (task?.image) list.push(task.image);
  if (task?.img) list.push(task.img);
  if (task?.photo) list.push(task.photo);
  if (task?.thumbnail) list.push(task.thumbnail);
  if (task?.icon) list.push(task.icon);

  const cleaned = list
    .filter(Boolean)
    .map(String)
    .filter((s) => s.trim().length > 0);
  return Array.from(new Set(cleaned));
}

export default function MyTasksPage() {
  const router = useRouter();

  // ────────── User & Task Data ──────────
  useLoadUserQuery();
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading, isFetching, refetch } = useGetMyTasksQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );
  const [completeTask, { isLoading: completing }] = useCompleteTaskMutation();

  const message = data?.message;
  const dailyTasks = data?.dailyTasks || null;
  const tasks = Array.isArray(dailyTasks?.tasks) ? dailyTasks.tasks : [];
  const pendingTasks = useMemo(
    () => tasks.filter((t: any) => !t?.completed),
    [tasks],
  );
  const completedCount = tasks.length - pendingTasks.length;
  const total = tasks.length;
  const pending = pendingTasks.length;

  // ────────── Task Player State ──────────
  const [index, setIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [srcIndex, setSrcIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WAIT_SECONDS);
  const [canSubmit, setCanSubmit] = useState(false);
  const intervalRef = useRef<any>(null);
  const currentTask = pendingTasks[index] || null;

  // ────────── Current Task Image Candidates ──────────
  const candidates = useMemo(() => {
    if (!currentTask) return [];
    return getCandidateUrls(currentTask);
  }, [currentTask]);

  // ────────── Load Current Task Image ──────────
  useEffect(() => {
    if (!currentTask) {
      setImgSrc("");
      setSrcIndex(0);
      setImgLoaded(false);
      return;
    }

    setImgLoaded(false);
    if (candidates.length > 0) {
      const start = Math.floor(Math.random() * candidates.length);
      setSrcIndex(start);
      const url = candidates[start];
      setImgSrc(`${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`);
      return;
    }

    const fallback =
      LOCAL_FALLBACK_POOL[
        Math.floor(Math.random() * LOCAL_FALLBACK_POOL.length)
      ];
    setSrcIndex(0);
    setImgSrc(fallback);
  }, [currentTask, candidates]);

  // ────────── Wait Timer After Image Load ──────────
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!currentTask) {
      setTimeLeft(0);
      setCanSubmit(false);
      return;
    }
    if (!imgLoaded) {
      setTimeLeft(WAIT_SECONDS);
      setCanSubmit(false);
      return;
    }

    setTimeLeft(WAIT_SECONDS);
    setCanSubmit(false);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setCanSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentTask, imgLoaded]);

  // ────────── Preload Next Task Image ──────────
  useEffect(() => {
    const next = pendingTasks[index + 1];
    if (!next) return;
    const nextCandidates = getCandidateUrls(next);
    const nextSrc =
      nextCandidates[0] ||
      LOCAL_FALLBACK_POOL[
        Math.floor(Math.random() * LOCAL_FALLBACK_POOL.length)
      ];
    if (nextSrc) {
      const img = new window.Image();
      img.src = `${nextSrc}${nextSrc.includes("?") ? "&" : "?"}pre=1`;
    }
  }, [pendingTasks, index]);

  // ────────── Image Fallback Handler ──────────
  const handleImgError = () => {
    setImgLoaded(false);
    const nextIndex = srcIndex + 1;
    if (candidates[nextIndex]) {
      setSrcIndex(nextIndex);
      const url = candidates[nextIndex];
      setImgSrc(`${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`);
      return;
    }
    const fallback =
      LOCAL_FALLBACK_POOL[
        Math.floor(Math.random() * LOCAL_FALLBACK_POOL.length)
      ];
    setImgSrc(fallback);
  };

  // ────────── Complete Task Handler ──────────
  const onComplete = async () => {
    try {
      if (!currentTask) return;
      const taskId = String(currentTask?._id || currentTask?.id || "").trim();
      if (!taskId) {
        toast.error("Task id missing");
        return;
      }
      if (!canSubmit) return;

      setCanSubmit(false);
      await completeTask({ taskId }).unwrap();
      toast.success("Task completed successfully");
      await refetch();
      setIndex((prev) => prev);
      router.refresh?.();
    } catch (e: any) {
      toast.error(e?.data?.message || e?.message || "Failed to complete task");
      if (imgLoaded && timeLeft === 0) setCanSubmit(true);
    }
  };

  // ────────── Keep Index Safe ──────────
  useEffect(() => {
    if (index >= pendingTasks.length) setIndex(0);
  }, [pendingTasks.length, index]);

  const waitProgress = imgLoaded
    ? ((WAIT_SECONDS - timeLeft) / WAIT_SECONDS) * 100
    : 0;
  const completedProgress = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="My Tasks"
        subtitle="Complete daily tasks and earn rewards"
        back
      />

      {/* ────────── Task Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/50 p-5 shadow-[0_0_55px_rgba(34,211,238,.12)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300/90">
              Daily Earning
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Task Center
            </h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              View each task for 5 seconds, then submit and collect your Adnexa
              reward.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/12 text-cyan-300">
            <HiCheckBadge className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Task Summary Card ────────── */}
      <section className="rounded-2xl border border-white/10 bg-white/[.045] p-4 shadow-[0_0_35px_rgba(34,211,238,.08)]">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <p className="font-bold uppercase tracking-wider text-slate-400">
              Balance
            </p>
            <p className="mt-1 text-sm font-black text-emerald-300">
              BDT {Number(user?.m_balance || 0).toFixed(2)}
            </p>
          </div>

          <div className="border-x border-white/10 text-center">
            <p className="font-bold uppercase tracking-wider text-slate-400">
              Done
            </p>
            <p className="mt-1 text-sm font-black text-cyan-300">
              {completedCount}/{total || 0}
            </p>
          </div>

          <div className="text-center">
            <p className="font-bold uppercase tracking-wider text-slate-400">
              Pending
            </p>
            <p className="mt-1 text-sm font-black text-violet-300">{pending}</p>
          </div>
        </div>
      </section>

      {/* ────────── API Message ────────── */}
      {message && (
        <div className="rounded-[22px] border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-bold text-amber-200">
          {message}
        </div>
      )}

      {/* ────────── Task Content ────────── */}
      {isLoading || isFetching ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : !dailyTasks ? (
        <EmptyState
          title="No task available"
          subtitle="There are no daily tasks assigned for today. Please check again later."
          icon={HiSparkles}
        />
      ) : !currentTask ? (
        <EmptyState
          title="All tasks completed"
          subtitle="Great work! You completed every task for today."
          actionLabel="Refresh Tasks"
          actionHref="/tasks/my-tasks"
          icon={HiCheckCircle}
        />
      ) : (
        <section className="adnexa-glass-card overflow-hidden rounded-2xl">
          {/* ────────── Task Image Preview ────────── */}
          <div className="relative min-h-[260px] overflow-hidden bg-white/[.03]">
            {imgSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc}
                alt="task"
                className="h-[280px] w-full object-cover"
                onLoad={() => setImgLoaded(true)}
                onError={handleImgError}
              />
            ) : (
              <div className="flex h-[280px] items-center justify-center text-sm font-bold text-slate-400">
                Loading task image...
              </div>
            )}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs font-black backdrop-blur-xl">
                Task {completedCount + 1} / {total || 0}
              </span>
              <span
                className={`rounded-full border px-4 py-2 text-xs font-black backdrop-blur-xl ${canSubmit ? "border-emerald-300/30 bg-emerald-400/15 text-emerald-200" : "border-white/10 bg-black/55 text-cyan-100"}`}
              >
                {canSubmit
                  ? "Ready"
                  : imgLoaded
                    ? `Wait ${timeLeft}s`
                    : "Loading"}
              </span>
            </div>
          </div>

          {/* ────────── Task Action Panel ────────── */}
          <div className="space-y-5 p-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-400">
                <span>Daily Progress</span>
                <span>{Math.round(completedProgress)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/[.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                  style={{ width: `${completedProgress}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onComplete}
              disabled={!canSubmit || completing}
              className="relative min-h-[64px] w-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[.06] text-lg font-black text-white disabled:cursor-not-allowed disabled:opacity-75"
            >
              {!canSubmit && (
                <span
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500/40 to-violet-500/40 transition-all"
                  style={{ width: `${waitProgress}%` }}
                />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {!canSubmit
                  ? imgLoaded
                    ? `Please wait ${timeLeft}s`
                    : "Loading image..."
                  : completing
                    ? "Submitting..."
                    : "Submit Task"}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => refetch()}
                className="rounded-[20px] border border-white/10 bg-white/[.045] px-4 py-3 text-sm font-black text-slate-200"
              >
                <HiArrowPath className="mr-1 inline text-cyan-300" /> Refresh
              </button>
              <button
                type="button"
                onClick={() =>
                  setIndex((p) => (p + 1 < pendingTasks.length ? p + 1 : p))
                }
                disabled={pendingTasks.length <= 1}
                className="rounded-[20px] border border-white/10 bg-white/[.045] px-4 py-3 text-sm font-black text-slate-200 disabled:opacity-50"
              >
                <HiEye className="mr-1 inline text-violet-300" /> Next
              </button>
            </div>

            <p className="text-center text-xs leading-5 text-slate-500">
              After viewing the image for 5 seconds, the submit button will
              become active automatically.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
