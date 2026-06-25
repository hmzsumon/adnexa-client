"use client";

import { IconType } from "react-icons";

export type MetricCardProps = {
  title: string;
  value: string;
  trend?: string;
  variant?: "green" | "purple" | "blue" | "orange" | "pink";
  icon: IconType;
};

const variantClass = {
  green:
    "from-emerald-500/25 to-cyan-500/10 text-emerald-300 border-emerald-400/20",
  purple:
    "from-violet-500/25 to-fuchsia-500/10 text-violet-300 border-violet-400/20",
  blue: "from-blue-500/25 to-cyan-500/10 text-sky-300 border-sky-400/20",
  orange:
    "from-amber-500/25 to-orange-500/10 text-amber-300 border-amber-400/20",
  pink: "from-fuchsia-500/25 to-pink-500/10 text-fuchsia-300 border-fuchsia-400/20",
};

const MetricCard = ({
  title,
  value,
  trend,
  variant = "purple",
  icon: Icon,
}: MetricCardProps) => {
  return (
    <div className="adnexa-glass-card rounded-2xl flex items-center justify-between px-3 py-2">
      {/* ────────── Metric Icon ────────── */}

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-gradient-to-br ${variantClass[variant]}`}
      >
        <Icon className="text-2xl" />
      </div>

      {/* ────────── Metric Content ────────── */}
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h3 className="mt-1 text-sm text-right font-black text-white">
          {value}
        </h3>
      </div>
    </div>
  );
};

export default MetricCard;
