"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import { formDateWithDayMonthTime, formatBalance } from "@/lib/functions";
import { useGetMyWithdrawRequestsQuery } from "@/redux/features/withdraw/withdrawApi";
import {
  HiArrowUpTray,
  HiBanknotes,
  HiClipboardDocument,
  HiDocumentText,
} from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";

const WithdrawHistory = () => {
  // ────────── Withdraw History Data ──────────
  const { data, isLoading } = useGetMyWithdrawRequestsQuery(undefined);
  const withdraws = data?.withdraws || [];
  const totalWithdraw = withdraws.reduce(
    (sum: number, item: any) => sum + Number(item?.amount || 0),
    0,
  );
  const completedWithdraw = withdraws.filter(
    (item: any) => item?.is_approved || item?.status === "approved",
  ).length;

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Withdraw History"
        subtitle="Track all cashout requests"
        back
      />

      {/* ────────── Withdraw History Hero ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-blue-400/20 bg-gradient-to-br from-blue-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300/90">
              Cashout Records
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Withdraws
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Review your pending, approved, and rejected withdrawal requests.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-blue-400/25 bg-blue-400/12 text-blue-300">
            <HiArrowUpTray className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Withdraw Summary Cards ────────── */}
      <section className="grid grid-cols-3 gap-3">
        <NeonStatCard
          label="Total"
          value={withdraws.length}
          description="requests"
          icon={HiDocumentText}
          variant="blue"
        />
        <NeonStatCard
          label="Approved"
          value={completedWithdraw}
          description="completed"
          icon={HiBanknotes}
          variant="green"
        />
        <NeonStatCard
          label="Amount"
          value={`$${formatBalance(totalWithdraw)}`}
          description="total USDT"
          icon={HiArrowUpTray}
          variant="pink"
        />
      </section>

      {/* ────────── Withdraw History List ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : withdraws.length === 0 ? (
        <EmptyState
          title="No withdraw history"
          subtitle="Your withdrawal records will appear here after you submit a cashout request."
          icon={HiArrowUpTray}
        />
      ) : (
        <section className="space-y-4">
          <SectionTitle subtitle="History" title="Latest Withdraws" />
          {withdraws.map((withdraw: any) => {
            const status =
              withdraw?.is_approved || withdraw?.status === "approved"
                ? "Completed"
                : withdraw?.status || "Pending";
            const statusClass =
              status === "Completed" || status === "approved"
                ? "bg-emerald-400/10 text-emerald-300"
                : status === "rejected"
                  ? "bg-red-400/10 text-red-300"
                  : "bg-amber-400/10 text-amber-300";
            return (
              <article
                key={withdraw?._id}
                className="adnexa-glass-card rounded-[26px] p-4"
              >
                {/* ────────── Withdraw Card Header ────────── */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                      <HiArrowUpTray className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="font-black text-white">Withdraw USDT</h3>
                      <p className="text-xs font-bold text-slate-400">
                        {formDateWithDayMonthTime(withdraw?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black capitalize ${statusClass}`}
                  >
                    {status}
                  </span>
                </div>

                {/* ────────── Withdraw Card Details ────────── */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-[20px] border border-white/10 bg-white/[.035] p-3">
                    <p className="text-[11px] font-bold text-slate-500">
                      Amount
                    </p>
                    <p className="mt-1 text-lg font-black text-blue-300">
                      ${formatBalance(withdraw?.amount || 0)}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/[.035] p-3">
                    <p className="text-[11px] font-bold text-slate-500">
                      Network
                    </p>
                    <p className="mt-1 text-sm font-black text-white">
                      {withdraw?.method?.network || "TRC20"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 rounded-[20px] border border-white/10 bg-white/[.035] p-3">
                  <p className="mb-1 flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <HiClipboardDocument /> Request ID
                  </p>
                  <p className="break-all text-xs font-bold text-slate-300">
                    {withdraw?._id}
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

export default WithdrawHistory;
