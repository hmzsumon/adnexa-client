"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import { useVerifyPasswordResetCodeMutation } from "@/redux/features/auth/authApi";
import { addResetSession } from "@/redux/resetPassSlice";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiChatBubbleLeftRight,
  HiCheckBadge,
  HiDevicePhoneMobile,
  HiKey,
  HiShieldCheck,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const SUPPORT_WHATSAPP_LINK = "https://wa.me/qr/CKZ2MDCBHQ2FP1";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [formError, setFormError] = useState(false);

  const [
    verifyPasswordResetCode,
    { isLoading, isSuccess, isError, error, data },
  ] = useVerifyPasswordResetCodeMutation();

  // ────────── Verify Code Handler ──────────
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(false);

    if (!phone.trim() || !verificationCode.trim()) {
      setFormError(true);
      toast.error("Please enter mobile number and verification code");
      return;
    }

    verifyPasswordResetCode({
      phone: phone.trim(),
      code: verificationCode.trim(),
    });
  };

  // ────────── Verify Code Response Handler ──────────
  useEffect(() => {
    if (isSuccess && data?.resetToken) {
      toast.success("Verification successful");
      dispatch(
        addResetSession({
          phone: data.phone || phone,
          resetToken: data.resetToken,
        }),
      );
      router.push("/reset-password");
    }

    if (isError && error) {
      setFormError(true);
      toast.error(
        (error as fetchBaseQueryError).data?.message ||
          "Invalid verification code",
      );
    }
  }, [isSuccess, isError, error, data, dispatch, phone, router]);

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
            WhatsApp verification
          </h1>
          <p className="mt-3 text-base leading-6 text-slate-400">
            Send your Customer ID to support on WhatsApp. Admin will generate a
            verification code for your account.
          </p>
        </div>

        {/* ────────── WhatsApp Support Card ────────── */}
        <a
          href={SUPPORT_WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 mt-7 flex items-center justify-between rounded-[28px] border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-200 shadow-[0_0_35px_rgba(16,185,129,.10)]"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-2xl">
              <HiChatBubbleLeftRight />
            </span>
            <div>
              <p className="text-sm font-black text-white">
                Get verification code
              </p>
              <p className="text-xs font-bold text-emerald-200/80">
                Contact support via WhatsApp
              </p>
            </div>
          </div>
          <HiArrowRight className="text-2xl" />
        </a>

        <form className="relative z-10 mt-8 space-y-5" onSubmit={handleVerify}>
          {/* ────────── Mobile Number Input ────────── */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Registered Mobile Number
            </label>
            <div
              className={`adnexa-input-wrap ${formError ? "border-red-400/70" : ""}`}
            >
              <span className="adnexa-input-icon text-cyan-300">
                <HiDevicePhoneMobile className="text-2xl" />
              </span>
              <input
                id="phone"
                type="tel"
                className="adnexa-input"
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* ────────── Verification Code Input ────────── */}
          <div>
            <label
              htmlFor="security-code"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Verification Code
            </label>
            <div
              className={`adnexa-input-wrap ${formError ? "border-red-400/70" : ""}`}
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
          </div>

          {/* ────────── Security Note ────────── */}
          <section className="adnexa-glass-card flex items-start gap-3 rounded-[24px] p-4">
            <HiShieldCheck className="mt-1 shrink-0 text-2xl text-cyan-300" />
            <p className="text-sm leading-6 text-slate-400">
              The code is generated only by admin after matching your Customer
              ID. It will expire in 10 minutes.
            </p>
          </section>

          {/* ────────── Submit Button ────────── */}
          <button
            type="submit"
            className="adnexa-primary-button"
            disabled={isLoading}
          >
            <span>
              {isLoading ? (
                <PulseLoader color="#fff" size={8} margin={2} />
              ) : (
                "Verify & Continue"
              )}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <HiArrowRight className="text-2xl" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
