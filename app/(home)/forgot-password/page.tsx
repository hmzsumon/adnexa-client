"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import {
  useResendVerificationEmailMutation,
  useSecurityVerifyMutation,
} from "@/redux/features/auth/authApi";
import { addEmail } from "@/redux/resetPassSlice";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiArrowPath,
  HiArrowRight,
  HiAtSymbol,
  HiCheckBadge,
  HiEnvelope,
  HiKey,
  HiPaperAirplane,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  const [
    resendVerificationEmail,
    {
      isLoading: isResendLoading,
      isSuccess: isResendSuccess,
      isError: isResendError,
      error: resendError,
    },
  ] = useResendVerificationEmailMutation();

  const [
    verifySecurityCode,
    {
      isLoading: isVerifyLoading,
      isSuccess: isVerifySuccess,
      isError: isVerifyError,
      error: verifyError,
    },
  ] = useSecurityVerifyMutation();

  // ────────── Email Change Handler ──────────
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSendError(false);
  };

  // ────────── Send / Resend Code Handler ──────────
  const handleResend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setSendError(true);
      toast.error("Please enter a valid email address");
      return;
    }

    resendVerificationEmail({ email });
    setResendDisabled(true);
    setTimer(30);
  };

  // ────────── Verify Code Handler ──────────
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError(false);

    if (!verificationCode.trim()) {
      setCodeError(true);
      toast.error("Please enter your verification code");
      return;
    }

    verifySecurityCode({ email, code: verificationCode, url: "/" });
  };

  // ────────── Resend Timer Handler ──────────
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timer > 0 && resendDisabled) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => clearInterval(intervalId);
  }, [timer, resendDisabled]);

  // ────────── Send Code Response Handler ──────────
  useEffect(() => {
    if (isResendSuccess) {
      toast.success("Verification code sent successfully");
      setSend(true);
    }

    if (resendError && isResendError) {
      toast.error((resendError as fetchBaseQueryError).data?.message);
      setSendError(true);
    }
  }, [isResendSuccess, resendError, isResendError]);

  // ────────── Verify Code Response Handler ──────────
  useEffect(() => {
    if (isVerifySuccess) {
      toast.success("Verification successful");
      dispatch(addEmail(email));
      router.push("/reset-password");
    }

    if (verifyError && isVerifyError) {
      toast.error((verifyError as fetchBaseQueryError).data?.message);
      setCodeError(true);
    }
  }, [isVerifySuccess, verifyError, isVerifyError, dispatch, email, router]);

  return (
    <div className="adnexa-app-bg min-h-screen px-4 py-6">
      {/* ────────── Mobile Forgot Password Shell ────────── */}
      <div className="relative mx-auto flex min-h-[calc(100vh-48px)] max-w-[460px] flex-col overflow-hidden rounded-[36px] border border-white/5 bg-[#05071c]/95 px-5 pb-8 pt-8 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(34,211,238,.20),transparent_62%)]" />
        <div className="pointer-events-none absolute -right-28 top-32 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

        {/* ────────── Top Back Button ────────── */}
        <div className="relative z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="adnexa-icon-button"
            aria-label="Go back"
          >
            <HiArrowLeft className="text-2xl" />
          </button>
          <Link
            href="/login"
            className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300"
          >
            Sign In
          </Link>
        </div>

        {/* ────────── Brand Area ────────── */}
        <div className="relative z-10 mt-8 flex justify-center">
          <AppBrand />
        </div>

        {/* ────────── Header Copy ────────── */}
        <div className="relative z-10 mt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-black text-violet-200">
            <HiKey className="text-base" /> Password Recovery
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">
            {send ? "Check your email" : "Forgot password?"}
          </h1>
          <p className="mt-3 text-base leading-6 text-slate-400">
            {send ? (
              <>
                We sent a security code to{" "}
                <span className="font-black text-cyan-300">{email}</span>. Enter
                it below to continue.
              </>
            ) : (
              "Enter your registered email address. We will send you a secure verification code."
            )}
          </p>
        </div>

        {send ? (
          <form
            className="relative z-10 mt-8 space-y-5"
            onSubmit={handleVerify}
          >
            {/* ────────── Verification Code Input ────────── */}
            <div>
              <label
                htmlFor="security-code"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                Security Code
              </label>
              <div
                className={`adnexa-input-wrap ${codeError ? "border-red-400/70" : ""}`}
              >
                <span className="adnexa-input-icon text-cyan-300">
                  <HiCheckBadge className="text-2xl" />
                </span>
                <input
                  id="security-code"
                  type="text"
                  className="adnexa-input"
                  placeholder="Enter 6 digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  autoComplete="one-time-code"
                  required
                />
              </div>
              {codeError && (
                <p className="mt-2 text-xs font-semibold text-red-300">
                  Please enter the correct verification code.
                </p>
              )}
            </div>

            {/* ────────── Resend Code Row ────────── */}
            <div className="adnexa-glass-card flex items-center justify-between gap-3 rounded-[24px] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <HiEnvelope className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">
                    Didn’t get code?
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    Request a new code safely
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendDisabled || isResendLoading}
                className="rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3 text-sm font-black text-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resendDisabled ? (
                  `${timer}s`
                ) : isResendLoading ? (
                  <PulseLoader color="#fff" size={6} margin={1} />
                ) : (
                  "Resend"
                )}
              </button>
            </div>

            {/* ────────── Verify Button ────────── */}
            <button
              type="submit"
              className="adnexa-primary-button"
              disabled={isVerifyLoading}
            >
              <span>
                {isVerifyLoading ? (
                  <PulseLoader color="#fff" size={8} margin={2} />
                ) : (
                  "Verify Code"
                )}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <HiArrowRight className="text-2xl" />
              </span>
            </button>
          </form>
        ) : (
          <form
            className="relative z-10 mt-8 space-y-5"
            onSubmit={handleResend}
          >
            {/* ────────── Email Input ────────── */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                Email Address
              </label>
              <div
                className={`adnexa-input-wrap ${sendError ? "border-red-400/70" : ""}`}
              >
                <span className="adnexa-input-icon text-sky-300">
                  <HiAtSymbol className="text-2xl" />
                </span>
                <input
                  id="email"
                  type="email"
                  className="adnexa-input"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={handleChangeEmail}
                  autoComplete="email"
                  required
                />
              </div>
              {sendError && (
                <p className="mt-2 text-xs font-semibold text-red-300">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* ────────── Help Note ────────── */}
            <div className="adnexa-glass-card flex items-center gap-3 rounded-[24px] p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                <HiPaperAirplane className="text-2xl" />
              </div>
              <p className="text-sm font-bold leading-6 text-slate-400">
                Use the email address connected with your Adnexa account.
              </p>
            </div>

            {/* ────────── Continue Button ────────── */}
            <button
              type="submit"
              className="adnexa-primary-button"
              disabled={isResendLoading}
            >
              <span>
                {isResendLoading ? (
                  <PulseLoader color="#fff" size={8} margin={2} />
                ) : (
                  "Send Code"
                )}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                {isResendLoading ? (
                  <HiArrowPath className="text-2xl" />
                ) : (
                  <HiArrowRight className="text-2xl" />
                )}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
