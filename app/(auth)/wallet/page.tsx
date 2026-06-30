"use client";

import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { formatBalance } from "@/lib/functions";
import {
  useLoadUserQuery,
  useMyWalletQuery,
} from "@/redux/features/auth/authApi";
import Link from "next/link";
import {
  HiArrowDownTray,
  HiArrowUpTray,
  HiBanknotes,
  HiCurrencyDollar,
  HiLockClosed,
  HiPaperAirplane,
  HiShieldCheck,
  HiWallet,
} from "react-icons/hi2";
import { useSelector } from "react-redux";

const Wallet = () => {
  // ────────── User Wallet Data ──────────
  useLoadUserQuery();
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useMyWalletQuery(undefined);
  const { wallet } = data || {};

  const quickActions = [
    {
      title: "Deposit",
      subtitle: "Add BDT",
      href: "/deposit",
      icon: HiArrowDownTray,
      accent: "text-teal-300 bg-teal-400/10 border-teal-400/20",
    },
    {
      title: "Withdraw",
      subtitle: "Cash out",
      href: "/withdraw",
      icon: HiArrowUpTray,
      accent: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    },
    {
      title: "Send",
      subtitle: "Transfer",
      href: "/send",
      icon: HiPaperAirplane,
      accent: "text-violet-300 bg-violet-400/10 border-violet-400/20",
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="My Wallet"
        subtitle="Manage your Adnexa balance"
        back
      />

      {/* ────────── Wallet Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/18 via-indigo-950/90 to-violet-950/50 p-5 shadow-[0_0_55px_rgba(16,185,129,.12)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative z-10 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-300/90">
                Main Wallet
              </p>
              <h2 className="mt-2 text-4xl font-black tracking-tight">
                BDT {formatBalance(user?.m_balance || 0)}
              </h2>
              <p className="mt-1 text-sm font-bold text-slate-400">
                Available BDT balance
              </p>
            </div>
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-emerald-400/25 bg-emerald-400/12 text-emerald-300">
              <HiWallet className="text-4xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[24px] border border-white/10 bg-white/[.045] p-4">
            <div>
              <p className="text-xs font-bold text-slate-400">
                Processing Time
              </p>
              <p className="mt-1 font-black">Instant - 30 min</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Wallet Fee</p>
              <p className="mt-1 font-black">0%</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Wallet Summary Cards ────────── */}
      <section className="grid grid-cols-2 gap-3">
        <NeonStatCard
          label="Total Deposit"
          value={`BDT ${formatBalance(wallet?.total_deposit || 0)}`}
          description="lifetime added"
          icon={HiBanknotes}
          variant="teal"
        />
        <NeonStatCard
          label="Total Withdraw"
          value={`BDT ${formatBalance(wallet?.total_withdraw || 0)}`}
          description="lifetime cashout"
          icon={HiArrowUpTray}
          variant="pink"
        />
        <NeonStatCard
          label="Investment"
          value={`BDT ${formatBalance(wallet?.total_investment || 0)}`}
          description="total invested"
          icon={HiCurrencyDollar}
          variant="violet"
        />
        <NeonStatCard
          label="Earning"
          value={`BDT ${formatBalance(wallet?.total_earing || wallet?.total_earning || 0)}`}
          description="total earned"
          icon={HiShieldCheck}
          variant="green"
        />
      </section>

      {/* ────────── Wallet Quick Actions ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Quick Actions" title="Move Your Funds" />
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                key={item.title}
                className="adnexa-glass-card rounded-[24px] p-4 text-center transition hover:-translate-y-0.5"
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border ${item.accent}`}
                >
                  <Icon className="text-2xl" />
                </div>
                <h3 className="mt-3 text-sm font-black">{item.title}</h3>
                <p className="mt-1 text-[11px] font-bold text-slate-500">
                  {item.subtitle}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ────────── Wallet Security Note ────────── */}
      <section className="adnexa-glass-card flex items-center gap-3 rounded-[24px] p-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <HiLockClosed className="text-2xl" />
        </div>
        <div>
          <h3 className="font-black">Protected Wallet</h3>
          <p className="text-sm leading-5 text-slate-400">
            Your wallet activity is tracked through secure Adnexa transaction
            records.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Wallet;
