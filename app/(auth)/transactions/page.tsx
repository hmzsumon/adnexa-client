"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import TransactionCards from "@/components/Transactions/TransactionCards";
import { formatBalance } from "@/lib/functions";
import { useGetTransactionsQuery } from "@/redux/features/transactions/transactionApi";
import { useMemo, useState } from "react";
import {
  HiArrowsRightLeft,
  HiBanknotes,
  HiCube,
  HiDocumentText,
  HiFunnel,
} from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";

const options = [
  { label: "All", value: "All" },
  { label: "Deposit", value: "Deposit" },
  { label: "Withdraw", value: "Withdraw" },
  { label: "Transfer", value: "Transfer" },
  { label: "Buy Package", value: "Buy Package" },
];

const Transactions = () => {
  const { data, isLoading } = useGetTransactionsQuery(undefined);
  const { transactions = [] } = data || {};
  const [purpose, setPurpose] = useState("All");

  // ────────── Filtered Transaction List ──────────
  const filteredTransactions = useMemo(() => {
    if (purpose === "All") return transactions;
    return transactions.filter(
      (transaction: any) => transaction.purpose === purpose,
    );
  }, [transactions, purpose]);

  // ────────── Transaction Summary Data ──────────
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc: any, item: any) => {
        if (item.isCashIn) acc.cashIn += Number(item.amount || 0);
        if (item.isCashOut) acc.cashOut += Number(item.amount || 0);
        return acc;
      },
      { cashIn: 0, cashOut: 0 },
    );
  }, [transactions]);

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Transactions"
        subtitle="Your wallet activity history"
        back
      />

      {/* ────────── Transaction Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-indigo-950/90 to-violet-950/55 p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-blue-400/15 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-blue-400/25 bg-blue-400/10 text-sky-300">
            <HiArrowsRightLeft className="text-4xl" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-300/90">
              Wallet Ledger
            </p>
            <h2 className="mt-1 text-3xl font-black">Transaction History</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Review deposits, withdrawals, transfers, bonuses, and package
              purchases.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Transaction Summary ────────── */}
      <section className="grid grid-cols-2 gap-3">
        <NeonStatCard
          label="Cash In"
          value={`$${formatBalance(totals.cashIn)}`}
          description="Total received"
          icon={HiBanknotes}
          variant="green"
        />
        <NeonStatCard
          label="Cash Out"
          value={`$${formatBalance(totals.cashOut)}`}
          description="Total spent"
          icon={HiCube}
          variant="pink"
        />
      </section>

      {/* ────────── Purpose Filter Buttons ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Filter" title="Choose Activity Type" />
        <div className="adnexa-scrollbar flex gap-2 overflow-x-auto pb-1">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setPurpose(option.value)}
              className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-black transition-all ${purpose === option.value ? "bg-cyan-400/15 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.12)]" : "bg-white/[.045] text-slate-400"}`}
            >
              <HiFunnel className="mr-1 inline" /> {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* ────────── Transaction List ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : filteredTransactions?.length === 0 ? (
        <EmptyState
          title="No transactions found"
          subtitle="There is no activity for this selected filter yet."
          icon={HiDocumentText}
        />
      ) : (
        <section className="space-y-3">
          <SectionTitle subtitle="Activity" title="Latest Records" />
          {filteredTransactions.map((transaction: any) => (
            <TransactionCards key={transaction._id} transaction={transaction} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Transactions;
