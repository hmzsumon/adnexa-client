"use client";

import Link from "next/link";
import { IconType } from "react-icons";

type ActionTileProps = {
  label: string;
  href: string;
  icon: IconType;
  variant?: "teal" | "blue" | "violet" | "pink" | "amber";
};

const variantClass = {
  teal: "border-teal-400/50 bg-teal-500/15 text-teal-300 shadow-teal-500/25",
  blue: "border-blue-400/50 bg-blue-500/15 text-sky-300 shadow-blue-500/25",
  violet:
    "border-violet-400/50 bg-violet-500/15 text-violet-300 shadow-violet-500/25",
  pink: "border-pink-400/50 bg-pink-500/15 text-pink-300 shadow-pink-500/25",
  amber:
    "border-amber-400/50 bg-amber-500/15 text-amber-300 shadow-amber-500/25",
};

const ActionTile = ({
  label,
  href,
  icon: Icon,
  variant = "teal",
}: ActionTileProps) => {
  return (
    <Link href={href} className="group flex flex-col items-center gap-3">
      {/* ────────── Action Icon Box ────────── */}
      <div
        className={`flex h-[74px] w-[74px] items-center justify-center rounded-xl border shadow-xl transition-all duration-300 group-hover:-translate-y-1 ${variantClass[variant]}`}
      >
        <Icon className="text-4xl drop-shadow-[0_0_14px_currentColor]" />
      </div>

      {/* ────────── Action Label ────────── */}
      <span className="text-sm font-semibold text-white">{label}</span>
    </Link>
  );
};

export default ActionTile;
