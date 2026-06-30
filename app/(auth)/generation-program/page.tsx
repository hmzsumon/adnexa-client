"use client";

import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import Generations from "@/components/Partnership/Generations";
import GenerationSellsInfo from "@/components/Partnership/GenerationSellsInfo";
import { formatBalance } from "@/lib/functions";
import { useMyWalletQuery } from "@/redux/features/auth/authApi";
import { HiChartBar, HiGlobeAlt, HiWallet } from "react-icons/hi2";

const GenerationProgram = () => {
  // ────────── Generation Wallet Data ──────────
  const { data } = useMyWalletQuery(undefined);
  const { wallet } = data || {};

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Generation"
        subtitle="Track team growth and bonuses"
        back
      />

      {/* ────────── Generation Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/16 via-indigo-950/90 to-violet-950/55 p-5 shadow-[0_0_55px_rgba(34,211,238,.12)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-xl bg-cyan-400/15 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
            <HiGlobeAlt className="text-4xl" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300/90">
              Team Growth
            </p>
            <h2 className="mt-1 text-lg font-black">Generation Income</h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              Monitor every generation, package volume, and commission from your
              team.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Generation Stats ────────── */}
      <section className="grid grid-cols-1 gap-3">
        <NeonStatCard
          label="Current Bonus"
          value={`BDT ${formatBalance(wallet?.current_generation_earning || 0)}`}
          description="Available generation earning"
          icon={HiWallet}
          variant="teal"
        />
        <NeonStatCard
          label="Total Bonus"
          value={`BDT ${formatBalance(wallet?.generation_bonus || 0)}`}
          description="Lifetime generation bonus"
          icon={HiChartBar}
          variant="violet"
        />
      </section>

      {/* ────────── Generation Sales Summary ────────── */}
      <section>
        <SectionTitle subtitle="Sales Overview" title="Team Package Volume" />
        <GenerationSellsInfo
          total_sells={wallet?.total_sales}
          level_01_sells={wallet?.level_1_sales}
        />
      </section>

      {/* ────────── Generation Team List ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Team Members" title="Your Generations" />
        <Generations />
      </section>
    </div>
  );
};

export default GenerationProgram;
