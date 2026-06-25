"use client";

import { formatBalance } from "@/lib/functions";
import { useGet5LevelTeamQuery } from "@/redux/features/auth/authApi";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { FaHandHoldingUsd, FaUsers } from "react-icons/fa";
import PartnerTable from "./PartnerTable";

const Generations = () => {
  const { data: levelData } = useGet5LevelTeamQuery(undefined);
  const levels = [
    { data: levelData?.level_01_data, label: "1st" },
    { data: levelData?.level_02_data, label: "2nd" },
    { data: levelData?.level_03_data, label: "3rd" },
  ];

  return (
    <section className="space-y-4">
      {/* ────────── Generation Level Cards ────────── */}
      {levels.map((level, index) => (
        <details
          key={level.label}
          open={index === 0}
          className="adnexa-glass-card rounded-2xl p-4"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                <BiLogoMicrosoftTeams className="text-2xl" />
              </div>
              <div>
                <h3 className="font-black text-white">
                  {level.label} Generation
                </h3>
                <p className="text-xs text-slate-400">Team performance</p>
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

          {/* ────────── Generation Member Table ────────── */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <PartnerTable data={level.data?.users} />
          </div>
        </details>
      ))}
    </section>
  );
};

export default Generations;
