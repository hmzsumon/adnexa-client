"use client";

import MethodCard from "@/components/MobileApp/MethodCard";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { formatBalance } from "@/lib/functions";
import { useMyWalletQuery } from "@/redux/features/auth/authApi";
import { GoHistory } from "react-icons/go";
import {
  HiArrowUpTray,
  HiBanknotes,
  HiClock,
  HiCurrencyDollar,
  HiShieldCheck,
  HiWallet,
} from "react-icons/hi2";
import { useSelector } from "react-redux";

const withdrawMethods = [
  {
    id: 7,
    title: "USDT TRC20",
    isActive: true,
    processingTime: "Instant - 3 hours",
    fee: "5%",
    additionalFee: "1 USDT",
    limit: "20 - 20,000 USDT",
    icon: "/assets/images/tether-usdt.svg",
    link: "/withdraw/tether",
    accent: "teal" as const,
  },
  {
    id: 1,
    title: "BinancePay",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    additionalFee: "0 USDT",
    limit: "20 - 20,000 USD",
    icon: "/assets/images/binance.svg",
    link: "/withdraw",
    accent: "amber" as const,
  },
  {
    id: 2,
    title: "Neteller",
    isActive: false,
    processingTime: "Instant - 1 day",
    fee: "0%",
    additionalFee: "0 USDT",
    limit: "20 - 10,000 USDT",
    icon: "/assets/images/neteller.svg",
    link: "/withdraw",
    accent: "violet" as const,
  },
  {
    id: 3,
    title: "Perfect Money",
    isActive: false,
    processingTime: "Instant - 1 day",
    fee: "0%",
    additionalFee: "0 USDT",
    limit: "2 - 10,000 USDT",
    icon: "/assets/images/perfect-momey.svg",
    link: "/withdraw",
    accent: "blue" as const,
  },
  {
    id: 4,
    title: "Skrill",
    isActive: false,
    processingTime: "Instant - 1 day",
    fee: "0%",
    additionalFee: "0 USDT",
    limit: "10 - 12,000 USDT",
    icon: "/assets/images/skrill.svg",
    link: "/withdraw",
    accent: "pink" as const,
  },
  {
    id: 5,
    title: "SticPay",
    isActive: false,
    processingTime: "Instant - 1 day",
    fee: "0%",
    additionalFee: "0 USDT",
    limit: "10 - 12,000 USDT",
    icon: "/assets/images/stickPay.svg",
    link: "/withdraw",
    accent: "blue" as const,
  },
];

const Withdraw = () => {
  // ────────── User & Wallet Data ──────────
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useMyWalletQuery(undefined);
  const { wallet } = data || {};

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Withdraw"
        subtitle="Move your earnings securely"
        rightLabel="History"
        rightHref="/withdraw/history"
        rightIcon={GoHistory}
      />

      {/* ────────── Withdraw Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/18 via-indigo-950/85 to-violet-950/55 p-5 shadow-[0_0_55px_rgba(37,99,235,.14)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300/90">
              Fast Withdraw
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Cash Out
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Select a channel, submit your details, and track the request from
              history.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-blue-400/25 bg-blue-400/12 text-sky-300 shadow-[0_0_35px_rgba(56,189,248,.18)]">
            <HiArrowUpTray className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Wallet Overview ────────── */}
      <section className="grid grid-cols-2 gap-3">
        <NeonStatCard
          label="Main Balance"
          value={`$${formatBalance(user?.m_balance || 0)}`}
          description="Available USDT"
          icon={HiWallet}
          variant="green"
        />
        <NeonStatCard
          label="Total Withdrawn"
          value={`$${formatBalance(wallet?.total_withdraw || 0)}`}
          description="Lifetime payout"
          icon={HiBanknotes}
          variant="blue"
        />
      </section>

      {/* ────────── Withdraw Method List ────────── */}
      <section className="space-y-4">
        <SectionTitle
          subtitle="Payout Methods"
          title="Choose Withdraw Channel"
        />
        {withdrawMethods.map((method) => (
          <MethodCard
            key={method.id}
            title={method.title}
            statusLabel={method.isActive ? "Available" : "Unavailable"}
            isActive={method.isActive}
            href={method.link}
            image={method.icon}
            accent={method.accent}
          >
            <div>
              <HiClock className="mx-auto mb-1 text-lg text-slate-300" />
              <p>Time</p>
              <p className="mt-1 font-black text-white">
                {method.processingTime}
              </p>
            </div>
            <div className="border-x border-white/10">
              <HiCurrencyDollar className="mx-auto mb-1 text-lg text-slate-300" />
              <p>Fee</p>
              <p className="mt-1 font-black text-white">
                {method.fee} + {method.additionalFee}
              </p>
            </div>
            <div>
              <HiBanknotes className="mx-auto mb-1 text-lg text-slate-300" />
              <p>Limit</p>
              <p className="mt-1 font-black text-white">{method.limit}</p>
            </div>
          </MethodCard>
        ))}
      </section>

      {/* ────────── Security Note ────────── */}
      <section className="adnexa-glass-card flex items-center gap-3 rounded-[24px] p-4">
        <HiShieldCheck className="shrink-0 text-3xl text-sky-300" />
        <div>
          <h3 className="font-black text-white">Withdrawal security</h3>
          <p className="text-sm text-slate-400">
            Please check wallet address and network before submitting.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Withdraw;
