"use client";

import ActionTile from "@/components/MobileApp/ActionTile";
import MetricCard from "@/components/MobileApp/MetricCard";
import { formatBalance } from "@/lib/functions";
import { useGetDashboardQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import {
  HiArrowDownTray,
  HiArrowPathRoundedSquare,
  HiArrowTrendingUp,
  HiArrowUpTray,
  HiCheckBadge,
  HiChevronRight,
  HiClock,
  HiCube,
  HiGift,
  HiGlobeAlt,
  HiHeart,
  HiSparkles,
  HiTrophy,
  HiWallet,
} from "react-icons/hi2";
import { PiWarningLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useGetDashboardQuery(undefined);
  const { dashboardData } = data || {};
  console.log("Dashboard Data:", dashboardData);

  const userName = user?.name || "Adnexa User";

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Package Expired Warning ────────── */}
      {user?.is_p_expired && (
        <div className="rounded-[24px] border border-red-400/30 bg-red-500/10 p-4 shadow-lg shadow-red-950/20">
          <div className="flex items-start gap-3">
            <PiWarningLight className="mt-1 shrink-0 text-3xl text-red-300" />
            <div className="flex-1">
              <h2 className="text-lg font-black text-red-100">
                Your Package Has Expired!
              </h2>
              <p className="mt-1 text-sm text-red-200/80">
                To continue earning, please purchase a new package.
              </p>
            </div>
          </div>
          <Link
            href="/investment"
            className="mt-4 inline-flex rounded-2xl bg-red-500 px-5 py-2 text-sm font-bold text-white"
          >
            Buy New Package
          </Link>
        </div>
      )}

      {/* ────────── Welcome Hero Balance Card ────────── */}
      <section className="relative overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-700/35 via-indigo-950/85 to-cyan-950/40 p-5 shadow-[0_0_55px_rgba(88,28,135,.25)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/15 blur-2xl" />
        <div className="pointer-events-none absolute right-6 top-6 hidden h-28 w-28 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-600/30 shadow-[0_0_45px_rgba(34,211,238,.15)] sm:block" />

        {/* ────────── Welcome Text ────────── */}
        <div className="relative z-10">
          <p className="text-base font-medium text-slate-300">
            Welcome back, 👋
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-white">
            {userName}
          </h2>
          {/* <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/15 px-4 py-2 text-sm font-bold text-violet-100">
            <HiCheckBadge className="text-lg text-violet-300" /> Level Investor
          </span> */}
        </div>

        {/* ────────── Balance Summary Panel ────────── */}
        <div className="relative z-10 mt-7 grid grid-cols-2 overflow-hidden rounded-xl border border-white/10 bg-white/[.045] backdrop-blur-xl">
          <div className="border-r border-white/10 px-2 py-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
              <HiWallet className="text-2xl" />
            </div>
            <p className="text-xs text-slate-300">Main Balance</p>
            <h3 className="mt-1 text-sm font-black text-emerald-300">
              BDT {formatBalance(user?.m_balance || 0)}
            </h3>
          </div>
          <div className="p-4">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
              <HiArrowTrendingUp className="text-2xl" />
            </div>
            <p className="text-xs text-slate-300">Total Profit</p>
            <h3 className="mt-1 text-sm font-black text-violet-300">
              BDT {formatBalance(dashboardData?.total_return || 0)}
            </h3>
          </div>
        </div>
      </section>

      {/* ────────── Quick Actions (all menu options) ────────── */}
      <section className="adnexa-glass-card rounded-2xl p-4">
        <h2 className="mb-4 text-xl font-black">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-x-2 gap-y-4">
          {[
            { label: "Deposit", href: "/deposit", icon: HiArrowDownTray, variant: "teal" },
            { label: "Withdraw", href: "/withdraw", icon: HiArrowUpTray, variant: "blue" },
            { label: "Invest", href: "/investment", icon: HiCube, variant: "pink" },
            { label: "My Package", href: "/investment/my-package", icon: HiGift, variant: "amber" },
            { label: "Lucky Card", href: "/lucky-cards", icon: HiSparkles, variant: "violet" },
            { label: "History", href: "/transactions", icon: HiArrowPathRoundedSquare, variant: "blue" },
            { label: "My Tasks", href: "/tasks/my-tasks", icon: HiCheckBadge, variant: "teal" },
            { label: "Task Report", href: "/tasks/tasks-report", icon: HiClock, variant: "blue" },
            { label: "Referral", href: "/partner-program", icon: HiHeart, variant: "amber" },
            { label: "Generation", href: "/generation-program", icon: HiGlobeAlt, variant: "violet" },
            { label: "Rank & Reward", href: "/rank-and-reward", icon: HiTrophy, variant: "amber" },
          ].map((a) => (
            <ActionTile
              key={a.href}
              label={a.label}
              href={a.href}
              icon={a.icon}
              variant={a.variant as any}
            />
          ))}
        </div>
      </section>

      {/* ────────── Overview Statistics ────────── */}
      <section className="adnexa-glass-card rounded-xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black">Overview</h2>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1 text-sm font-bold text-violet-300"
          >
            View All <HiChevronRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <MetricCard
            title="Total Investment"
            value={`BDT ${formatBalance(dashboardData?.total_investment || 0)}`}
            trend="12.4%"
            icon={HiWallet}
            variant="green"
          />
          <MetricCard
            title="Total Earned"
            value={`BDT ${formatBalance(dashboardData?.total_earning || 0)}`}
            trend="8.7%"
            icon={HiGift}
            variant="orange"
          />
          <MetricCard
            title="Total Withdrawn"
            value={`BDT ${formatBalance(dashboardData?.total_withdraw || 0)}`}
            trend="4.2%"
            icon={HiArrowUpTray}
            variant="blue"
          />
          <MetricCard
            title="Referral Earn"
            value={`BDT ${formatBalance(dashboardData?.total_referral_earning || 0)}`}
            trend="6.3%"
            icon={HiHeart}
            variant="purple"
          />
          <MetricCard
            title="Generation Earn"
            value={`BDT ${formatBalance(dashboardData?.total_generation_earning || dashboardData?.generation_earning || 0)}`}
            trend="ROI"
            icon={HiArrowTrendingUp}
            variant="green"
          />
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
