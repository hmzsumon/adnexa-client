"use client";

import MethodCard from "@/components/MobileApp/MethodCard";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import WhatsAppSupportButton from "@/components/Support/WhatsAppSupportButton";
import WithdrawDisabledModal from "@/components/Withdraw/WithdrawDisabledModal";
import WithdrawPaymentMethodForm from "@/components/Withdraw/WithdrawPaymentMethodForm";
import { formatBalance } from "@/lib/functions";
import { useMyWalletQuery } from "@/redux/features/auth/authApi";
import { useGetMyWithdrawPaymentMethodsQuery } from "@/redux/features/withdraw/withdrawApi";
import { GoHistory } from "react-icons/go";
import {
  HiArrowUpTray,
  HiBanknotes,
  HiClock,
  HiCurrencyDollar,
  HiWallet,
} from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import { useSelector } from "react-redux";

const Withdraw = () => {
  // ────────── User & Wallet Data ──────────
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useMyWalletQuery(undefined);
  const { data: methodData } = useGetMyWithdrawPaymentMethodsQuery(undefined);
  const { wallet } = data || {};
  const methods = methodData?.methods || [];
  const mobileMethod = methods.find(
    (item: any) => item.methodCategory === "mobile",
  );
  const binanceMethod = methods.find(
    (item: any) => item.methodCategory === "binance",
  );

  const withdrawMethods = [
    {
      id: "mobile",
      title: mobileMethod
        ? `${mobileMethod.methodName} Withdraw`
        : "Bkash / Nagad Setup",
      isActive: !!mobileMethod,
      processingTime: "Within 72 hours",
      fee: "10%",
      limit: "Fixed Amounts",
      icon: null,
      link: mobileMethod ? "/withdraw/tether?type=mobile" : "#mobile-method",
      accent: "blue" as const,
    },
    {
      id: "binance",
      title: "Binance USDT TRC20",
      isActive: !!binanceMethod,
      processingTime: "Within 24 hours",
      fee: "10%",
      limit: "Fixed Amounts",
      icon: <SiBinance />,
      link: binanceMethod ? "/withdraw/tether?type=binance" : "#binance-method",
      accent: "amber" as const,
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Withdraw Paused Notice ────────── */}
      <WithdrawDisabledModal />

      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Withdraw"
        subtitle="Move your earnings securely"
        rightLabel="History"
        rightHref="/withdraw/history"
        rightIcon={GoHistory}
      />

      {/* ────────── Withdraw Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/18 via-indigo-950/85 to-violet-950/55 p-5 shadow-[0_0_55px_rgba(37,99,235,.14)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300/90">
              Smart Withdraw
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight">
              Cash Out
            </h2>
            <p className="mt-2 text-[0.7rem] leading-6 text-slate-400">
              Add one mobile method and one Binance TRC20 wallet first. Submit
              requests with your login password.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-blue-400/25 bg-blue-400/12 text-sky-300 shadow-[0_0_35px_rgba(56,189,248,.18)]">
            <HiArrowUpTray className="text-4xl" />
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
          label="Total Withdrawn"
          value={`BDT ${formatBalance(wallet?.total_withdraw || 0)}`}
          description="Lifetime payout"
          icon={HiBanknotes}
          variant="blue"
        />
      </section>

      {/* ────────── Withdraw Method Setup ────────── */}
      {(!mobileMethod || !binanceMethod) && (
        <section className="space-y-4">
          <SectionTitle
            subtitle="One Time Setup"
            title="Withdrawal Payment Methods"
          />
          {!mobileMethod && (
            <div id="mobile-method">
              <WithdrawPaymentMethodForm type="mobile" />
            </div>
          )}
          {!binanceMethod && (
            <div id="binance-method">
              <WithdrawPaymentMethodForm type="binance" />
            </div>
          )}
        </section>
      )}

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
            statusLabel={method.isActive ? "Available" : "Setup Required"}
            isActive={method.isActive}
            href={method.link}
            icon={method.icon}
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
              <p>Charge</p>
              <p className="mt-1 font-black text-white">{method.fee}</p>
            </div>
            <div>
              <HiBanknotes className="mx-auto mb-1 text-lg text-slate-300" />
              <p>Amount</p>
              <p className="mt-1 font-black text-white">{method.limit}</p>
            </div>
          </MethodCard>
        ))}
      </section>

      {/* ────────── Support & Security Note ────────── */}
      <WhatsAppSupportButton />
    </div>
  );
};

export default Withdraw;
