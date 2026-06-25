"use client";

import { formDateWithDayMonthTime, formatBalance } from "@/lib/functions";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import {
  HiArrowDownTray,
  HiArrowUpTray,
  HiDocumentText,
} from "react-icons/hi2";
import { SiBinance } from "react-icons/si";

const TransactionCards = ({ transaction }: any) => {
  const { unique_id, amount, purpose, createdAt, isCashIn, isCashOut } =
    transaction;
  const statusLabel = isCashIn
    ? "Cash In"
    : isCashOut
      ? "Cash Out"
      : "Transfer";
  const amountClass = isCashIn
    ? "text-emerald-300"
    : isCashOut
      ? "text-red-300"
      : "text-sky-300";
  const iconClass = isCashIn
    ? "bg-emerald-400/12 text-emerald-300"
    : isCashOut
      ? "bg-red-400/12 text-red-300"
      : "bg-sky-400/12 text-sky-300";
  const Icon = isCashIn
    ? HiArrowDownTray
    : isCashOut
      ? HiArrowUpTray
      : SiBinance;

  return (
    <article className="adnexa-glass-card rounded-[26px] p-4">
      {/* ────────── Transaction Header ────────── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] ${iconClass}`}
          >
            <Icon className="text-3xl" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-black text-white">
              {purpose}
            </h3>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {formDateWithDayMonthTime(createdAt)}
            </p>
            <p className="mt-1 truncate text-xs font-semibold text-slate-500">
              ID: {unique_id}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p
            className={`flex items-center justify-end gap-1 text-lg font-black ${amountClass}`}
          >
            {isCashIn ? (
              <FaPlus className="text-sm" />
            ) : isCashOut ? (
              <FaMinus className="text-sm" />
            ) : null}
            {formatBalance(amount)}
          </p>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-black ${isCashIn ? "bg-emerald-400/10 text-emerald-300" : isCashOut ? "bg-red-400/10 text-red-300" : "bg-sky-400/10 text-sky-300"}`}
          >
            <GoDotFill /> {statusLabel}
          </span>
        </div>
      </div>

      {/* ────────── Transaction Description ────────── */}
      {transaction?.description && (
        <div className="mt-4 flex items-start gap-2 rounded-[20px] border border-white/10 bg-white/[.035] p-3">
          <HiDocumentText className="mt-0.5 shrink-0 text-lg text-slate-500" />
          <p className="text-xs font-semibold leading-5 text-slate-400">
            {transaction.description}
          </p>
        </div>
      )}
    </article>
  );
};

export default TransactionCards;
