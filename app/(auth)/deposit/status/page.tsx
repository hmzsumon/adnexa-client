"use client";

import WhatsAppSupportButton from "@/components/Support/WhatsAppSupportButton";

import EmptyState from "@/components/MobileApp/EmptyState";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import baseUrl from "@/config/baseUrl";
import { formatBalance } from "@/lib/functions";
import {
  useGetDepositQuery,
  useRetryMobileBankingDepositMutation,
} from "@/redux/features/deposit/depositApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  HiArrowPath,
  HiCheckCircle,
  HiClock,
  HiShieldCheck,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

/* ────────── Deposit Status Page ────────── */
const DepositStatusPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const depositId = searchParams.get("id") || "";
  const { user } = useSelector((state: any) => state.auth);
  const { data, isLoading, refetch } = useGetDepositQuery(depositId, {
    skip: !depositId,
  });
  const [retryDeposit, { isLoading: isRetrying }] =
    useRetryMobileBankingDepositMutation();
  const [counter, setCounter] = useState(60);
  const deposit = data?.deposit;
  const [editableTxnId, setEditableTxnId] = useState("");

  // ────────── Retry Counter ──────────
  useEffect(() => {
    if (!deposit || deposit?.status === "approved") return;
    const lastTry = deposit?.lastAutoApproveTryAt
      ? new Date(deposit.lastAutoApproveTryAt).getTime()
      : Date.now();
    const endAt = lastTry + 60 * 1000;
    const timer = setInterval(() => {
      setCounter(Math.max(Math.ceil((endAt - Date.now()) / 1000), 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [deposit?._id, deposit?.lastAutoApproveTryAt, deposit?.status]);

  // ────────── Transaction ID Edit Sync ──────────
  useEffect(() => {
    if (deposit?.transactionId || deposit?.txId) {
      setEditableTxnId(String(deposit?.transactionId || deposit?.txId || ""));
    }
  }, [deposit?._id, deposit?.transactionId, deposit?.txId]);

  // ────────── Socket Auto Approve Listener ──────────
  useEffect(() => {
    if (!user?._id || !depositId) return;

    const socket = io(baseUrl, { transports: ["websocket", "polling"] });
    socket.emit("join-user-room", user._id);

    socket.on("deposit-auto-approved", (payload: any) => {
      if (payload?.deposit?._id === depositId) {
        toast.success("Deposit approved successfully");
        router.push("/deposit/history");
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user?._id, depositId, router]);

  // ────────── Auto Redirect After Waiting ──────────
  useEffect(() => {
    if (!deposit || deposit?.status !== "pending") return;
    const timer = setTimeout(() => router.push("/deposit/history"), 65 * 1000);
    return () => clearTimeout(timer);
  }, [deposit?._id, deposit?.status, router]);

  // ────────── Deposit Status Values ──────────
  const tryCount = Number(deposit?.autoApproveTryCount || 0);
  const canRetry =
    deposit?.status === "pending" && tryCount < 3 && counter <= 0;
  const supportMode = deposit?.autoApproveFailed || tryCount >= 3;

  const statusText = useMemo(() => {
    if (deposit?.status === "approved") return "Approved";
    if (deposit?.status === "rejected") return "Rejected";
    if (supportMode) return "Support Required";
    return "Waiting for Auto Approval";
  }, [deposit?.status, supportMode]);

  // ────────── Retry Deposit Handler ──────────
  const handleRetry = async () => {
    try {
      const res: any = await retryDeposit({
        id: depositId,
        transactionId: editableTxnId,
      }).unwrap();
      if (res?.autoApproved) {
        toast.success("Deposit approved successfully");
        router.push("/deposit/history");
        return;
      }
      toast.success("Checked again. Please wait for confirmation.");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error?.data?.error || "Retry failed");
      refetch();
    }
  };

  if (!depositId) {
    return (
      <EmptyState
        title="Deposit not found"
        subtitle="Invalid deposit status link."
        icon={HiShieldCheck}
      />
    );
  }

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Deposit Status"
        subtitle="Auto approval tracking"
        back
      />

      {/* ────────── Status Hero ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-300/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/60 p-6 text-center shadow-[0_0_55px_rgba(34,211,238,.14)]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-2xl" />
        {isLoading ? (
          <div className="flex justify-center py-10">
            <RingLoader color="#22d3ee" />
          </div>
        ) : (
          <div className="relative z-10">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
              {deposit?.status === "approved" ? (
                <HiCheckCircle className="text-5xl text-emerald-300" />
              ) : (
                <HiClock className="text-5xl text-cyan-200" />
              )}
            </div>
            <h1 className="mt-5 text-2xl font-black">{statusText}</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-300">
              We are checking your transaction ID with SMS transaction records.
              You can close this page and check again from history.
            </p>
          </div>
        )}
      </section>

      {/* ────────── Deposit Details ────────── */}
      {deposit && (
        <section className="space-y-4">
          <SectionTitle
            subtitle="Request Details"
            title="Deposit Information"
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-4">
              <p className="text-[11px] font-bold text-slate-500">Amount</p>
              <p className="mt-1 text-lg font-black text-emerald-300">
                BDT {formatBalance(deposit.amount || 0)}
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-4">
              <p className="text-[11px] font-bold text-slate-500">Try</p>
              <p className="mt-1 text-lg font-black text-cyan-200">
                {tryCount}/3
              </p>
            </div>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-4">
            <p className="text-[11px] font-bold text-slate-500">
              Payment Channel
            </p>
            <p className="mt-1 font-black text-white">
              {deposit.methodTitle || deposit.methodName || "Mobile Banking"}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-300">
              {deposit.methodAccountNumber}
            </p>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-4">
            <p className="text-[11px] font-bold text-slate-500">
              Transaction ID
            </p>
            {deposit?.status === "pending" && counter <= 0 && !supportMode ? (
              <input
                value={editableTxnId}
                onChange={(e) => setEditableTxnId(e.target.value.toUpperCase())}
                placeholder="Enter transaction ID"
                className="mt-2 w-full rounded-[16px] border border-cyan-300/15 bg-slate-950/35 px-4 py-3 text-sm font-black uppercase text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/40"
              />
            ) : (
              <p className="mt-1 break-all font-black text-white">
                {deposit.transactionId || deposit.txId}
              </p>
            )}
            {deposit?.status === "pending" && !supportMode && (
              <p className="mt-2 text-[11px] font-bold text-slate-500">
                You can edit the transaction ID after 1 minute before retrying.
              </p>
            )}
          </div>
        </section>
      )}

      {/* ────────── Retry & Support Action ────────── */}
      {deposit?.status === "pending" && (
        <section className="rounded-[26px] border border-amber-300/20 bg-amber-300/8 p-5 text-center">
          {supportMode ? (
            <>
              <h3 className="text-lg font-black text-amber-200">
                Please contact support
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Auto approval failed 3 times. Admin can still review and
                approve/reject this deposit.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-bold text-slate-300">
                {counter > 0
                  ? `You can retry after ${counter} seconds.`
                  : "You can retry auto approval now."}
              </p>
              <button
                onClick={handleRetry}
                disabled={!canRetry || isRetrying || !editableTxnId.trim()}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-[18px] border border-cyan-300/20 bg-cyan-400/15 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-cyan-100 disabled:opacity-50"
              >
                <HiArrowPath className={isRetrying ? "animate-spin" : ""} />{" "}
                Retry Auto Check
              </button>
            </>
          )}
        </section>
      )}
      {/* ────────── WhatsApp Support ────────── */}
      <WhatsAppSupportButton />
    </div>
  );
};

export default DepositStatusPage;
