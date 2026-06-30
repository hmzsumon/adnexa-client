"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { formDateWithDayMonthTime, formatBalance } from "@/lib/functions";
import { useGetMyDepositsQuery } from "@/redux/features/deposit/depositApi";
import {
  HiArrowDownTray,
  HiBanknotes,
  HiClipboardDocument,
  HiDocumentText,
} from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import RingLoader from "react-spinners/RingLoader";

const DepositHistory = () => {
  // ────────── Deposit History Data ──────────
  const { data, isLoading } = useGetMyDepositsQuery(undefined);
  const deposits = data?.deposits || [];
  const totalDeposit = deposits.reduce(
    (sum: number, item: any) => sum + Number(item?.amount || 0),
    0,
  );
  const completedDeposit = deposits.filter(
    (item: any) => item?.is_approved || item?.status === "approved",
  ).length;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Deposit History"
        subtitle="Track your deposit requests"
        back
      />

      {/* ────────── Deposit History Hero ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-teal-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300/90">
              Payment Records
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Deposits
            </h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              See all Binance and wallet funding records in one clean view.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-teal-400/25 bg-teal-400/12 text-teal-300">
            <HiArrowDownTray className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Deposit Summary Cards ────────── */}
      <section className="grid grid-cols-1 gap-3">
        <NeonStatCard
          label="Total"
          value={deposits.length}
          description="requests"
          icon={HiDocumentText}
          variant="teal"
        />
        <NeonStatCard
          label="Completed"
          value={completedDeposit}
          description="approved"
          icon={HiBanknotes}
          variant="green"
        />
        <NeonStatCard
          label="Amount"
          value={`BDT ${formatBalance(totalDeposit)}`}
          description="total BDT"
          icon={SiBinance as any}
          variant="violet"
        />
      </section>

      {/* ────────── Deposit History List ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : deposits.length === 0 ? (
        <EmptyState
          title="No deposit history"
          subtitle="Your deposit records will appear here after you submit a payment."
          icon={HiArrowDownTray}
        />
      ) : (
        <section className="space-y-4">
          <SectionTitle subtitle="History" title="Latest Deposits" />
          {deposits.map((deposit: any) => {
            const status =
              deposit?.is_approved || deposit?.status === "approved"
                ? "Completed"
                : deposit?.status || "Pending";
            const statusClass =
              status === "Completed" || status === "approved"
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-amber-400/10 text-amber-300";
            return (
              <article
                key={deposit?._id}
                className="adnexa-glass-card rounded-[26px] p-4"
              >
                {/* ────────── Deposit Card Header ────────── */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                      <SiBinance className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-black text-white">Deposit BDT</h3>
                      <p className="text-xs font-bold text-slate-400">
                        {formDateWithDayMonthTime(deposit?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black capitalize ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>

                {/* ────────── Deposit Card Details ────────── */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-[20px] border border-white/10 bg-white/[.035] p-3">
                    <p className="text-[11px] font-bold text-slate-500">
                      Amount
                    </p>
                    <p className="mt-1 text-lg font-black text-emerald-300">
                      BDT {formatBalance(deposit?.amount || 0)}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[.035] p-3">
                    <p className="text-[11px] font-bold text-slate-500">
                      Method
                    </p>
                    <p className="mt-1 text-sm font-black text-white">
                      {deposit?.method || "Binance"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 rounded-[20px] border border-white/10 bg-white/[.035] p-3">
                  <p className="mb-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <HiClipboardDocument /> TXID / Order ID
                  </p>
                  <p className="break-all text-xs font-bold text-slate-300">
                    {deposit?.txId || deposit?.sourceAddress || deposit?._id}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default DepositHistory;
