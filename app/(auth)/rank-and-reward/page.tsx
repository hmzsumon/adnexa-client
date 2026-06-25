"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import RankCard from "@/components/RankAndRewards/RankCard";
import RankDataCard from "@/components/RankAndRewards/RankDataCard";
import BronzeIcon from "@/lib/BronzeIcon";
import GoldIcon from "@/lib/GoldIcon";
import RoyaltyIcon from "@/lib/RoyaltyIcon";
import RubyIcon from "@/lib/RubyIcon";
import SilverIcon from "@/lib/SilverIcon";
import { useGetMyRankRecordQuery } from "@/redux/features/rank/rankApi";
import { useMemo } from "react";
import { HiTrophy } from "react-icons/hi2";
import { useSelector } from "react-redux";
import GridLoader from "react-spinners/GridLoader";

const RankAndReward = () => {
  const { user = {} } = useSelector((state: any) => state.auth);
  const { data = {}, isLoading } = useGetMyRankRecordQuery(undefined);
  const { rankData = {} } = data;

  // ────────── Titan Rank Active Condition ──────────
  const titanCondition = { directRefer: 10, teamMembers: 50, salesValue: 5000 };
  const isTitanCondition = useMemo(
    () =>
      rankData.directReferUsers >= titanCondition.directRefer &&
      rankData.teamMembers >= titanCondition.teamMembers &&
      rankData.salesValue >= titanCondition.salesValue,
    [rankData],
  );

  // ────────── Rank List Data ──────────
  const rankItems = useMemo(
    () => [
      {
        id: 1,
        title: "Gold",
        deposit: "Over $5,000 team deposit.",
        salary: 200,
        icon: <SilverIcon width={45} height={45} />,
        target: 5000,
        is_active: isTitanCondition,
        user: 10,
        users: 50,
      },
      {
        id: 2,
        title: "Platinum",
        deposit: "Over $10,000 team deposit.",
        salary: 500,
        icon: <BronzeIcon width={50} height={50} />,
        target: 10000,
        is_active: false,
        user: 12,
        users: 100,
      },
      {
        id: 3,
        title: "Diamond",
        deposit: "Over $20,000 team deposit.",
        salary: 2000,
        icon: <GoldIcon width={50} height={50} />,
        target: 20000,
        is_active: false,
        user: 15,
        users: 150,
      },
      {
        id: 4,
        title: "Ambassador",
        deposit: "Over $50,000 team deposit.",
        salary: 5000,
        icon: <RubyIcon width={50} height={50} />,
        target: 50000,
        is_active: false,
        user: 18,
        users: 200,
      },
      {
        id: 5,
        title: "Crown Ambassador",
        deposit: "Over $100,000 team deposit.",
        salary: 10000,
        icon: <RoyaltyIcon width={50} height={50} />,
        target: 100000,
        is_active: false,
        user: 20,
        users: 250,
      },
    ],
    [isTitanCondition],
  );

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Rank & Reward"
        subtitle="Grow your level and claim rewards"
        back
      />

      {/* ────────── Rank Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/15 via-indigo-950/90 to-violet-950/55 p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
            <HiTrophy className="text-4xl" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300/90">
              Achievement
            </p>
            <h2 className="mt-1 text-xl font-black">Unlock Rewards</h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              Refer, build your team, increase sales, and reach higher Adnexa
              ranks.
            </p>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <GridLoader size={25} color="#22d3ee" />
        </div>
      ) : (
        <>
          {/* ────────── My Rank Record ────────── */}
          <section className="space-y-4">
            <SectionTitle subtitle="Progress" title="My Rank Record" />
            <RankDataCard rankData={rankData} rank={user.rank} />
          </section>

          {/* ────────── Rank Reward List ────────── */}
          <section className="space-y-4">
            <SectionTitle subtitle="Reward Levels" title="Available Ranks" />
            {rankItems.map((item) => (
              <RankCard key={item.id} item={item} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default RankAndReward;
