"use client";

import Link from "next/link";
import {
  HiArrowTrendingUp,
  HiCalendarDays,
  HiChartBar,
  HiClock,
  HiRocketLaunch,
  HiTrophy,
} from "react-icons/hi2";

const cardVariants = [
  {
    accent: "teal",
    label: "Popular",
    icon: HiRocketLaunch,
    border: "border-teal-400/30 shadow-teal-950/20",
    iconBox: "from-teal-400/25 to-cyan-500/10 text-teal-300 border-teal-400/30",
    price: "text-emerald-300",
    button: "from-emerald-400 to-teal-500 shadow-emerald-500/25",
    pill: "bg-teal-400/15 text-teal-300",
  },
  {
    accent: "violet",
    label: "Best Value",
    icon: HiChartBar,
    border: "border-violet-400/30 shadow-violet-950/20",
    iconBox:
      "from-violet-400/25 to-fuchsia-500/10 text-violet-300 border-violet-400/30",
    price: "text-violet-300",
    button: "from-violet-500 to-fuchsia-500 shadow-violet-500/25",
    pill: "bg-violet-400/15 text-violet-300",
  },
  {
    accent: "amber",
    label: "Premium",
    icon: HiTrophy,
    border: "border-amber-400/30 shadow-amber-950/20",
    iconBox:
      "from-amber-400/25 to-orange-500/10 text-amber-300 border-amber-400/30",
    price: "text-amber-300",
    button: "from-amber-400 to-orange-500 shadow-amber-500/25",
    pill: "bg-amber-400/15 text-amber-300",
  },
];

const PricingCard = ({ pac, index = 0 }: any) => {
  const variant = cardVariants[index % cardVariants.length];
  const Icon = variant.icon;
  const totalReturn = pac?.total_return || pac?.return_percent || 0;

  return (
    <article
      className={`rounded-2xl border bg-[#090d2b]/70 p-4 shadow-2xl backdrop-blur-xl ${variant.border}`}
    >
      {/* ────────── Package Top Area ────────── */}
      <div className="flex items-center gap-4">
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${variant.iconBox}`}
        >
          <Icon className="text-4xl drop-shadow-[0_0_16px_currentColor]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black text-white">
              {pac?.title || "Investment Package"}
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-black ${variant.pill}`}
            >
              {variant.label}
            </span>
          </div>
          <p className={`text-2xl font-black tracking-tight ${variant.price}`}>
            BDT {Number(pac?.price || 0).toLocaleString()}
          </p>
          <p className="mt-1 text-[0.6rem] text-slate-400">
            Invest smartly and earn daily returns
          </p>
        </div>
      </div>

      {/* ────────── Invest Button ────────── */}
      <Link
        href={`/investment/${pac?._id}`}
        className={`mt-5 flex w-full items-center justify-center rounded-xl bg-gradient-to-r px-5 py-4 text-base font-black text-white shadow-xl transition-all duration-300 hover:-translate-y-1 ${variant.button}`}
      >
        Invest Now
      </Link>

      {/* ────────── Package Stats Row ────────── */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        <div className="text-center">
          <HiCalendarDays className={`mx-auto mb-1 text-xl ${variant.price}`} />
          <p className="text-[11px] text-slate-300">Daily Return</p>
          <p className={`text-base font-black ${variant.price}`}>
            {Number(pac?.daily_return || 0).toLocaleString()} BDT
          </p>
        </div>
        <div className="border-x border-white/10 text-center">
          <HiClock className={`mx-auto mb-1 text-xl ${variant.price}`} />
          <p className="text-[11px] text-slate-300">Duration</p>
          <p className="text-base font-black text-white">
            {pac?.duration || 0} days
          </p>
        </div>
        <div className="text-center">
          <HiArrowTrendingUp
            className={`mx-auto mb-1 text-xl ${variant.price}`}
          />
          <p className="text-[11px] text-slate-300">Total Return</p>
          <p className={`text-base font-black ${variant.price}`}>
            {Number(totalReturn || 0).toLocaleString()} BDT
          </p>
        </div>
      </div>
    </article>
  );
};

export default PricingCard;
