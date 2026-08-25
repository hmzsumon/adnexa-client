"use client";

import { HiWrenchScrewdriver } from "react-icons/hi2";

/**
 * Full-screen, non-dismissible lock shown to every visitor while
 * Company.maintenance.is_maintenance is true. Rendered in place of the
 * normal route tree by <MaintenanceGate />, so there is nothing else on
 * the page to click or navigate to.
 */
const MaintenanceScreen = ({ message }: { message?: string }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex min-h-screen items-center justify-center overflow-y-auto bg-[#020316] p-5 text-white">
      {/* ────────── Ambient Glow ────────── */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-[420px] rounded-[28px] border border-white/10 bg-white/[0.03] p-7 text-center shadow-[0_30px_100px_rgba(0,0,0,.7)] sm:p-9">
        {/* ────────── Spinning Gear Badge ────────── */}
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />
          <span
            className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-cyan-300/40"
            style={{ animationDuration: "6s" }}
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-3xl text-cyan-200">
            <HiWrenchScrewdriver />
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-black tracking-tight text-white">
          Under Maintenance
        </h1>
        <p className="mt-2 text-sm font-medium leading-6 text-slate-400">
          {message?.trim() ||
            "We're upgrading Adnexa right now to make things faster and safer for you."}
        </p>

        {/* ────────── Pulsing Progress Dots ────────── */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-cyan-300"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <div className="mt-7 flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.06] p-3.5 text-left">
          <span className="mt-0.5 shrink-0 text-lg text-emerald-300">✓</span>
          <p className="text-[11px] font-medium leading-5 text-slate-300">
            Your account and balance are completely safe. Nothing is lost —
            please check back shortly.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MaintenanceScreen;
