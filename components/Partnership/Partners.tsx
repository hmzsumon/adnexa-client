"use client";

import { formatBalance } from "@/lib/functions";
import { useGet3LevelTeamQuery } from "@/redux/features/auth/authApi";
import { FaHandHoldingUsd, FaUsers } from "react-icons/fa";
import { SiLevelsdotfyi } from "react-icons/si";
import PartnerTable from "./PartnerTable";

const Partners = () => {
  const { data: levelData } = useGet3LevelTeamQuery(undefined);
  const levels = [
    {
      data: levelData?.level_01_data,
      label: "Level 01",
      accent: "text-cyan-300",
    },
    {
      data: levelData?.level_02_data,
      label: "Level 02",
      accent: "text-violet-300",
    },
    {
      data: levelData?.level_03_data,
      label: "Level 03",
      accent: "text-amber-300",
    },
  ];

  return (
    <section className="space-y-4">
      {/* ────────── Partner Level Cards ────────── */}
      {levels.map((level, index) => (
        <details
          key={level.label}
          open={index === 0}
          className="adnexa-glass-card rounded-[26px] p-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[.05] ${level.accent}`}
              >
                <SiLevelsdotfyi className="text-2xl" />
              </div>
              <div>
                <h3 className="font-black text-white">{level.label}</h3>
                <p className="text-xs text-slate-400">Referral team members</p>
              </div>
            </div>
            <div className="text-right text-xs font-bold text-slate-300">
              <p>
                <FaUsers className="mr-1 inline" /> {level.data?.count || 0}
              </p>
              <p className="mt-1">
                <FaHandHoldingUsd className="mr-1 inline" />{" "}
                {formatBalance(level.data?.earning || 0)}
              </p>
            </div>
          </summary>

          {/* ────────── Partner Member Table ────────── */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <PartnerTable data={level.data?.users} />
          </div>
        </details>
      ))}
    </section>
  );
};

export default Partners;
