// adnexa-client-master/components/Tasks/VideoTaskPlayer.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiMiniPlay,
  HiMiniSpeakerWave,
  HiMiniSpeakerXMark,
  HiOutlineBolt,
  HiOutlineEye,
  HiShieldCheck,
} from "react-icons/hi2";

/* ══════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════ */
export type VideoTask = {
  _id?: string;
  id?: string;
  type?: "video" | "image";
  title?: string;
  advertiser?: string;
  video_url?: string;
  fallback_url?: string;
  thumbnail?: string;
  url?: string;
  duration?: number;
  min_watch_seconds?: number;
};

type StartResult = {
  watchToken: string;
  requiredSeconds: number;
} | null;

type Props = {
  task: VideoTask;
  reward: number;
  currency?: string;
  index: number;
  total: number;
  claiming?: boolean;
  onStart: (taskId: string) => Promise<StartResult>;
  onClaim: (payload: {
    taskId: string;
    watchToken: string;
    watchedSeconds: number;
  }) => Promise<boolean>;
};

/* ══════════════════════════════════════════════
   Progress Ring
   ══════════════════════════════════════════════ */
const RING_SIZE = 58;
const RING_STROKE = 4;
const RING_R = (RING_SIZE - RING_STROKE) / 2;
const RING_C = 2 * Math.PI * RING_R;

function ProgressRing({
  progress,
  label,
  done,
}: {
  progress: number;
  label: string;
  done: boolean;
}) {
  return (
    <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
      <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={RING_STROKE}
        />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_R}
          fill="none"
          stroke={done ? "#34d399" : "#22d3ee"}
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset={
            RING_C - RING_C * Math.min(1, Math.max(0, progress))
          }
          style={{ transition: "stroke-dashoffset .18s linear" }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-[0.68rem] font-black ${
          done ? "text-emerald-300" : "text-cyan-200"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Video Task Player
   ══════════════════════════════════════════════ */
export default function VideoTaskPlayer({
  task,
  reward,
  currency = "BDT",
  index,
  total,
  claiming = false,
  onStart,
  onClaim,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const taskId = String(task?._id || task?.id || "");
  const declaredDuration = Number(task?.duration || 0);
  const declaredRequired =
    Number(task?.min_watch_seconds || 0) || Math.floor(declaredDuration) || 5;

  /* ────────── Watch Session State ────────── */
  const [required, setRequired] = useState(declaredRequired);
  const [watchToken, setWatchToken] = useState("");
  const [watched, setWatched] = useState(0);
  const [ready, setReady] = useState(false); // reward unlocked
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [startError, setStartError] = useState("");
  const [rewardPop, setRewardPop] = useState(false);

  /* ────────── Refs (avoid re-render churn) ────────── */
  const creditedRef = useRef(0); // আসল credited watch seconds
  const lastTimeRef = useRef(0); // last currentTime sample
  const maxTimeRef = useRef(0); // anti-seek ceiling
  const startedRef = useRef(false); // start API একবারই
  const tokenRef = useRef("");
  const srcTriedRef = useRef(0);

  const sources = [task?.video_url, task?.fallback_url].filter(
    Boolean,
  ) as string[];
  const [src, setSrc] = useState(sources[0] || "");

  /* ────────── Reset On Task Change ────────── */
  useEffect(() => {
    creditedRef.current = 0;
    lastTimeRef.current = 0;
    maxTimeRef.current = 0;
    startedRef.current = false;
    tokenRef.current = "";
    srcTriedRef.current = 0;

    setWatched(0);
    setReady(false);
    setWatchToken("");
    setRequired(declaredRequired);
    setPlaying(false);
    setBuffering(true);
    setVideoError(false);
    setStartError("");
    setRewardPop(false);
    setSrc(sources[0] || "");

    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  /* ────────── Open Watch Session On First Play ────────── */
  const openSession = useCallback(async () => {
    if (startedRef.current || !taskId) return;
    startedRef.current = true;
    try {
      const res = await onStart(taskId);
      if (res) {
        tokenRef.current = res.watchToken;
        setWatchToken(res.watchToken);
        if (res.requiredSeconds > 0) setRequired(res.requiredSeconds);
      } else {
        startedRef.current = false;
      }
    } catch {
      startedRef.current = false;
      setStartError("Could not start the ad. Tap play to retry.");
    }
  }, [onStart, taskId]);

  /* ────────── Credit Watch Time (playback based) ────────── */
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;

    const t = v.currentTime;
    const delta = t - lastTimeRef.current;
    lastTimeRef.current = t;
    maxTimeRef.current = Math.max(maxTimeRef.current, t);

    // ঠিক তখনই ক্রেডিট হয় যখন সত্যিই চলছে + ট্যাব সামনে আছে
    const isActive =
      !v.paused &&
      !v.ended &&
      typeof document !== "undefined" &&
      !document.hidden;

    if (delta > 0 && delta < 1.5 && isActive) {
      creditedRef.current += delta;
      const w = creditedRef.current;
      setWatched(w);
      if (!ready && w + 0.25 >= required) {
        setReady(true);
        setRewardPop(true);
        setTimeout(() => setRewardPop(false), 1400);
      }
    }
  };

  /* ────────── Block Forward Seeking ────────── */
  const handleSeeking = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime > maxTimeRef.current + 0.4) {
      v.currentTime = maxTimeRef.current;
    }
  };

  /* ────────── Pause When Tab Hidden ────────── */
  useEffect(() => {
    const onVisibility = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden && !v.paused) v.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ────────── Loop Short Clips Until Required Met ────────── */
  const handleEnded = () => {
    const v = videoRef.current;
    if (!v) return;
    if (creditedRef.current + 0.35 < required) {
      lastTimeRef.current = 0;
      maxTimeRef.current = 0;
      v.currentTime = 0;
      v.play().catch(() => {});
      return;
    }
    setPlaying(false);
  };

  /* ────────── Source Fallback ────────── */
  const handleError = () => {
    const next = srcTriedRef.current + 1;
    if (sources[next]) {
      srcTriedRef.current = next;
      setSrc(sources[next]);
      setVideoError(false);
      setBuffering(true);
      return;
    }
    setVideoError(true);
    setBuffering(false);
  };

  /* ────────── Manual Play (autoplay blocked fallback) ────────── */
  const tapToPlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    setStartError("");
    await openSession();
    try {
      await v.play();
    } catch {
      setStartError("Tap the video to start playing.");
    }
  };

  /* ────────── Claim ────────── */
  const handleClaim = async () => {
    if (!ready || claiming) return;
    const ok = await onClaim({
      taskId,
      watchToken: tokenRef.current || watchToken,
      watchedSeconds: Number(creditedRef.current.toFixed(2)),
    });
    if (ok) {
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 70,
          spread: 62,
          startVelocity: 32,
          origin: { y: 0.62 },
          colors: ["#22d3ee", "#a78bfa", "#34d399", "#fbbf24"],
        });
      } catch {
        /* confetti optional */
      }
    }
  };

  /* ────────── Derived ────────── */
  const progress = required > 0 ? Math.min(1, watched / required) : 0;
  const remaining = Math.max(0, Math.ceil(required - watched));
  const earned = reward * progress;
  const perSecond = required > 0 ? reward / required : 0;

  return (
    <section className="adnexa-glass-card overflow-hidden rounded-2xl">
      {/* ══════════ Video Stage ══════════ */}
      <div className="relative aspect-[9/12] max-h-[420px] w-full overflow-hidden bg-black">
        {src && !videoError ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            ref={videoRef}
            src={src}
            poster={task?.thumbnail || undefined}
            className="h-full w-full object-cover"
            playsInline
            autoPlay
            muted={muted}
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate noremoteplayback"
            onContextMenu={(e) => e.preventDefault()}
            onLoadedMetadata={() => setBuffering(false)}
            onCanPlay={() => setBuffering(false)}
            onWaiting={() => setBuffering(true)}
            onPlaying={() => {
              setBuffering(false);
              setPlaying(true);
              openSession();
            }}
            onPause={() => setPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            onEnded={handleEnded}
            onError={handleError}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm font-black text-slate-300">
              Video could not be loaded
            </p>
            <p className="text-xs text-slate-500">
              Check your connection and refresh the task list.
            </p>
          </div>
        )}

        {/* ────────── Top Bar ────────── */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/75 to-transparent p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="pointer-events-auto flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full border border-rose-400/30 bg-rose-500/20 px-2.5 py-1 text-[0.6rem] font-black uppercase tracking-widest text-rose-200 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                Ad
              </span>
              <span className="rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[0.6rem] font-black text-slate-200 backdrop-blur-md">
                {index} / {total}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md"
              >
                {muted ? (
                  <HiMiniSpeakerXMark className="text-lg" />
                ) : (
                  <HiMiniSpeakerWave className="text-lg text-cyan-300" />
                )}
              </button>
              <ProgressRing
                progress={progress}
                done={ready}
                label={ready ? "✓" : `${remaining}s`}
              />
            </div>
          </div>
        </div>

        {/* ────────── Live Earning Ticker ────────── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-3 pt-10">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[0.62rem] font-bold uppercase tracking-[0.18em] text-cyan-300/80">
                {task?.advertiser || "Adnexa Ads"}
              </p>
              <p className="truncate text-sm font-black text-white">
                {task?.title || "Sponsored Video"}
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-emerald-300/25 bg-emerald-400/12 px-3 py-1.5 text-right backdrop-blur-md">
              <p className="text-[0.55rem] font-bold uppercase tracking-widest text-emerald-300/80">
                Earning now
              </p>
              <p className="font-mono text-base font-black leading-tight text-emerald-300">
                +{earned.toFixed(4)}
              </p>
            </div>
          </div>

          {/* watch bar */}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
            <div
              className={`h-full rounded-full ${
                ready
                  ? "bg-emerald-400"
                  : "bg-gradient-to-r from-cyan-400 to-violet-400"
              }`}
              style={{
                width: `${progress * 100}%`,
                transition: "width .18s linear",
              }}
            />
          </div>
        </div>

        {/* ────────── Buffering ────────── */}
        {buffering && !videoError && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
          </div>
        )}

        {/* ────────── Paused Overlay ────────── */}
        {!playing && !buffering && !videoError && !ready && (
          <button
            type="button"
            onClick={tapToPlay}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 backdrop-blur-[2px]"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20 text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,.35)]">
              <HiMiniPlay className="ml-1 text-3xl" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-slate-200">
              Tap to play &amp; earn
            </span>
            <span className="text-[0.65rem] font-semibold text-slate-400">
              Earning pauses when the video stops
            </span>
          </button>
        )}

        {/* ────────── Reward Unlocked Pop ────────── */}
        {rewardPop && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="animate-adnexa-pop rounded-2xl border border-emerald-300/30 bg-emerald-400/20 px-5 py-3 text-xl font-black text-emerald-200 backdrop-blur-md">
              +{reward.toFixed(4)} {currency}
            </span>
          </div>
        )}
      </div>

      {/* ══════════ Action Panel ══════════ */}
      <div className="space-y-4 p-4">
        {/* ────────── Live Stats Row ────────── */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-white/8 bg-white/[.04] py-2">
            <p className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">
              Watched
            </p>
            <p className="font-mono text-sm font-black text-cyan-300">
              {watched.toFixed(1)}s
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[.04] py-2">
            <p className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">
              Rate
            </p>
            <p className="font-mono text-sm font-black text-violet-300">
              {perSecond.toFixed(4)}/s
            </p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[.04] py-2">
            <p className="text-[0.55rem] font-bold uppercase tracking-widest text-slate-400">
              Reward
            </p>
            <p className="font-mono text-sm font-black text-emerald-300">
              {reward.toFixed(4)}
            </p>
          </div>
        </div>

        {startError && (
          <p className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-center text-xs font-bold text-amber-200">
            {startError}
          </p>
        )}

        {/* ────────── Claim Button ────────── */}
        <button
          type="button"
          onClick={handleClaim}
          disabled={!ready || claiming}
          className={`relative min-h-[58px] w-full overflow-hidden rounded-2xl border text-base font-black transition-all ${
            ready
              ? "animate-adnexa-glow border-emerald-300/40 bg-gradient-to-r from-emerald-500/30 via-cyan-500/25 to-violet-500/30 text-white"
              : "cursor-not-allowed border-white/10 bg-white/[.05] text-slate-400"
          }`}
        >
          {!ready && (
            <span
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500/25 to-violet-500/25"
              style={{
                width: `${progress * 100}%`,
                transition: "width .18s linear",
              }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {claiming ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Crediting...
              </>
            ) : ready ? (
              <>
                <HiOutlineBolt className="text-xl text-emerald-300" />
                Claim {reward.toFixed(4)} {currency}
              </>
            ) : (
              <>
                <HiOutlineEye className="text-xl" />
                Watching... {remaining}s left
              </>
            )}
          </span>
        </button>

        {/* ────────── Trust Note ────────── */}
        <p className="flex items-center justify-center gap-1.5 text-center text-[0.65rem] font-semibold leading-5 text-slate-500">
          <HiShieldCheck className="shrink-0 text-sm text-emerald-400/70" />
          Watch time is verified on our server before the reward is credited.
        </p>
      </div>
    </section>
  );
}
