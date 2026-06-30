"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import { useVerifyStarpayPaymentMutation } from "@/redux/features/deposit/depositApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HiArrowRight, HiCheckCircle, HiXCircle } from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

const StarpayVerify = () => {
  const searchParams = useSearchParams();
  const [isDone, setIsDone] = useState(false);
  const [verifyStarpayPayment, { data, isLoading, isSuccess, isError, error }] =
    useVerifyStarpayPaymentMutation();

  // ────────── StarPayBD Redirect Params ──────────
  const transactionId = useMemo(() => {
    return (
      searchParams.get("transaction_id") ||
      searchParams.get("transactionId") ||
      searchParams.get("trx_id") ||
      ""
    );
  }, [searchParams]);

  const depositId = searchParams.get("deposit_id") || "";

  // ────────── Auto Verify After Redirect ──────────
  useEffect(() => {
    if (!transactionId || isDone) return;

    setIsDone(true);
    verifyStarpayPayment({
      transaction_id: transactionId,
      deposit_id: depositId,
    });
  }, [transactionId, depositId, isDone, verifyStarpayPayment]);

  // ────────── API Response Message ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deposit verified successfully");
    }

    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message ||
          "Deposit verification failed",
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader title="Payment Verify" subtitle="StarPayBD deposit status" />

      {/* ────────── Missing Transaction ID ────────── */}
      {!transactionId && (
        <section className="adnexa-glass-card rounded-2xl p-5 text-center">
          <HiXCircle className="mx-auto text-6xl text-rose-300" />
          <h2 className="mt-4 text-xl font-black">Transaction ID Missing</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            StarPayBD did not return a transaction ID. Please check your deposit
            history or contact support.
          </p>
          <Link href="/deposit" className="adnexa-primary-button mt-5">
            Back To Deposit <HiArrowRight className="text-2xl" />
          </Link>
        </section>
      )}

      {/* ────────── Verifying State ────────── */}
      {transactionId && isLoading && (
        <section className="adnexa-glass-card rounded-2xl p-5 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center">
            <RingLoader color="#fff" size={70} />
          </div>
          <h2 className="mt-4 text-xl font-black">Verifying Payment</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Please wait while we verify your StarPayBD transaction.
          </p>
        </section>
      )}

      {/* ────────── Success State ────────── */}
      {isSuccess && (
        <section className="adnexa-glass-card rounded-2xl p-5 text-center">
          <HiCheckCircle className="mx-auto text-6xl text-emerald-300" />
          <h2 className="mt-4 text-xl font-black">Deposit Successful</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            BDT {data?.deposit?.amount || ""} has been added to your main
            balance.
          </p>
          <Link href="/dashboard" className="adnexa-primary-button mt-5">
            Go To Dashboard <HiArrowRight className="text-2xl" />
          </Link>
        </section>
      )}

      {/* ────────── Failed State ────────── */}
      {isError && (
        <section className="adnexa-glass-card rounded-2xl p-5 text-center">
          <HiXCircle className="mx-auto text-6xl text-rose-300" />
          <h2 className="mt-4 text-xl font-black">Verification Failed</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {(error as fetchBaseQueryError).data?.message ||
              "Payment verification failed. Please try again."}
          </p>
          <Link href="/deposit" className="adnexa-primary-button mt-5">
            Back To Deposit <HiArrowRight className="text-2xl" />
          </Link>
        </section>
      )}
    </div>
  );
};

export default StarpayVerify;
