"use client";

import { ReactNode } from "react";
import { IconType } from "react-icons";

type NeonStatCardProps = {
  label: string;
  value: ReactNode;
  description?: string;
  icon: IconType;
  variant?: "teal" | "violet" | "blue" | "amber" | "pink" | "green";
};

const variantClass = {
  teal: "from-teal-400/25 to-cyan-500/10 text-teal-300 border-teal-400/25",
  violet:
    "from-violet-500/25 to-fuchsia-500/10 text-violet-300 border-violet-400/25",
  blue: "from-blue-500/25 to-cyan-500/10 text-sky-300 border-sky-400/25",
  amber:
    "from-amber-500/25 to-orange-500/10 text-amber-300 border-amber-400/25",
  pink: "from-pink-500/25 to-fuchsia-500/10 text-pink-300 border-pink-400/25",
  green:
    "from-emerald-500/25 to-teal-500/10 text-emerald-300 border-emerald-400/25",
};

const NeonStatCard = ({
  label,
  value,
  description,
  icon: Icon,
  variant = "violet",
}: NeonStatCardProps) => {
  return (
    <div className="adnexa-glass-card rounded-2xl flex items-center justify-between p-4">
      {/* ────────── Stat Icon ────────── */}
      <div
        className={` flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${variantClass[variant]}`}
      >
        <Icon className="text-2xl drop-shadow-[0_0_12px_currentColor]" />
      </div>

      {/* ────────── Stat Content ────────── */}
      <div className="text-right">
        <p className="text-sm font-semibold text-slate-400">{label}</p>
        <h3 className="mt-1 break-words text-2xl font-black text-white">
          {value}
        </h3>
        {description && (
          <p className="mt-2 text-xs font-semibold text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default NeonStatCard;
