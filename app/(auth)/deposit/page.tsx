"use client";

import WhatsAppSupportButton from "@/components/Support/WhatsAppSupportButton";

import MethodCard from "@/components/MobileApp/MethodCard";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { formatBalance } from "@/lib/functions";
import BkashIcon from "@/public/images/deposit/bkash.svg";
import NagadIcon from "@/public/images/deposit/nagad.svg";
import {
  useLoadUserQuery,
  useMyWalletQuery,
} from "@/redux/features/auth/authApi";
import { FaRegCreditCard } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { GoHistory } from "react-icons/go";
import {
  HiBanknotes,
  HiClock,
  HiCurrencyDollar,
  HiShieldCheck,
  HiSparkles,
  HiWallet,
} from "react-icons/hi2";
import { IoLogoUsd } from "react-icons/io5";
import { SiTether } from "react-icons/si";
import {
  TbBrandNetflix,
  TbBrandTether,
  TbCircleLetterS,
  TbLetterS,
} from "react-icons/tb";
import { useSelector } from "react-redux";

const depositMethods = [
  {
    id: 0,
    key: "bkash",
    title: "bKash",
    isActive: true,
    icon: null,
    img: BkashIcon,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 3000000 BDT",
    link: "/deposit/bkash-pay",
    accent: "pink" as const,
  },
  {
    id: 2,
    key: "Nagad",
    title: "Nagad",
    isActive: true,
    icon: null,
    img: NagadIcon,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 300000 BDT",
    link: "/deposit/nagad-pay",
    accent: "pink" as const,
  },

  {
    id: 3,
    title: "Tether TRC20",
    isActive: true,
    processingTime: "Instant - 1 hour",
    fee: "0%",
    limit: "10 - 10,000,000 BDT",
    icon: <SiTether />,
    img: null,
    link: "/deposit/tether-trc20",
    accent: "teal" as const,
  },
  {
    id: 20,
    title: "Tron TRX",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 10,000,000 BDT",
    icon: null,
    img: "/assets/icons/tron-trx.webp",
    link: "/deposit/tron-trx",
    accent: "pink" as const,
  },
  {
    id: 3,
    title: "Bank Card",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 10,000 BDT",
    icon: <FaRegCreditCard />,
    img: null,
    link: "/deposit/bank-card",
    accent: "blue" as const,
  },
  {
    id: 4,
    title: "Neteller",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 50,000 BDT",
    icon: <TbBrandNetflix />,
    img: null,
    link: "/deposit/neteller",
    accent: "violet" as const,
  },
  {
    id: 5,
    title: "Perfect Money",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 100,000 BDT",
    icon: <FcMoneyTransfer />,
    img: null,
    link: "/deposit/perfect-money",
    accent: "amber" as const,
  },
  {
    id: 6,
    title: "Skrill",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 100,000 BDT",
    icon: <TbLetterS />,
    img: null,
    link: "/deposit/skrill",
    accent: "blue" as const,
  },
  {
    id: 7,
    title: "SticPay",
    isActive: false,
    processingTime: "Instant - 30 min",
    fee: "0%",
    limit: "10 - 100,000 BDT",
    icon: <TbCircleLetterS />,
    img: null,
    link: "/deposit/sticpay",
    accent: "pink" as const,
  },
  {
    id: 8,
    title: "Tether ERC20",
    isActive: false,
    processingTime: "Instant - 1 hour",
    fee: "0%",
    limit: "10 - 100,000,000 BDT",
    icon: <TbBrandTether />,
    img: null,
    link: "/deposit/tether-erc20",
    accent: "teal" as const,
  },
  {
    id: 9,
    title: "USD Coin",
    isActive: false,
    processingTime: "Instant - 1 hour",
    fee: "0%",
    limit: "10 - 100,000,000 BDT",
    icon: <IoLogoUsd />,
    img: null,
    link: "/deposit/usd-coin",
    accent: "blue" as const,
  },
];

const Deposit = () => {
  // ────────── User & Wallet Data ──────────
  useLoadUserQuery();
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useMyWalletQuery(undefined);
  const { wallet } = data || {};

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Deposit"
        subtitle="Add funds to your wallet"
        rightLabel="History"
        rightHref="/deposit/history"
        rightIcon={GoHistory}
      />

      {/* ────────── Deposit Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-teal-400/20 bg-gradient-to-br from-teal-500/18 via-indigo-950/85 to-violet-950/55 p-5 shadow-[0_0_55px_rgba(20,184,166,.14)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-teal-400/20 blur-2xl" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-300/90">
              Secure Deposit
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Fund Wallet
            </h2>

            <p className="mt-2 text-xs leading-6 text-slate-400">
              Choose your preferred payment method and continue earning with
              Adnexa.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Wallet Overview ────────── */}
      <section className="grid grid-cols-1 gap-3">
        <NeonStatCard
          label="Main Balance"
          value={`BDT ${formatBalance(user?.m_balance || 0)}`}
          description="Available BDT"
          icon={HiWallet}
          variant="green"
        />

        <NeonStatCard
          label="Total Deposit"
          value={`BDT ${formatBalance(wallet?.total_deposit || 0)}`}
          description="Lifetime deposit"
          icon={HiBanknotes}
          variant="teal"
        />
      </section>

      {/* ────────── Deposit Method List ────────── */}
      <section className="space-y-4">
        <SectionTitle
          subtitle="Payment Methods"
          title="Choose Deposit Channel"
        />

        <div>
          {depositMethods.map((method) => (
            <MethodCard
              key={method.id}
              title={method.title}
              statusLabel={method.isActive ? "Recommended" : "Unavailable"}
              isActive={method.isActive}
              href={method.link}
              icon={method.icon}
              image={method.img}
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
                <HiSparkles className="mx-auto mb-1 text-lg text-slate-300" />
                <p>Fee</p>
                <p className="mt-1 font-black text-white">{method.fee}</p>
              </div>

              <div>
                <HiCurrencyDollar className="mx-auto mb-1 text-lg text-slate-300" />
                <p>Limit</p>
                <p className="mt-1 font-black text-white">{method.limit}</p>
              </div>
            </MethodCard>
          ))}
        </div>
      </section>

      {/* ────────── Safety Note ────────── */}
      <section className="adnexa-glass-card flex items-center gap-3 rounded-[24px] p-4">
        <HiShieldCheck className="shrink-0 text-3xl text-cyan-300" />

        <div>
          <h3 className="font-black text-white">Protected payments</h3>
          <p className="text-sm text-slate-400">
            Use the exact transaction ID when submitting your deposit.
          </p>
        </div>
      </section>
      {/* ────────── WhatsApp Support ────────── */}
      <WhatsAppSupportButton />
    </div>
  );
};

export default Deposit;
