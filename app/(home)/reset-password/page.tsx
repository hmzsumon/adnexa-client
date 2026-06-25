"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { removeEmail } from "@/redux/resetPassSlice";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
  HiEye,
  HiEyeSlash,
  HiKey,
  HiLockClosed,
  HiShieldCheck,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email } = useSelector((state: any) => state.resetPass);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const passwordChecks = useMemo(() => {
    return [
      { label: "At least 6 characters", isValid: password.length >= 6 },
      {
        label: "Uppercase and lowercase letters",
        isValid: /[A-Z]/.test(password) && /[a-z]/.test(password),
      },
      { label: "At least one number", isValid: /\d/.test(password) },
    ];
  }, [password]);

  const canSubmit =
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword;

  // ────────── Reset Access Guard ──────────
  useEffect(() => {
    if (!email) router.push("/forgot-password");
  }, [email, router]);

  // ────────── Reset Password Submit Handler ──────────
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Password and confirm password do not match");
      return;
    }

    resetPassword({ email, password });
  };

  // ────────── Reset Password Response Handler ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successfully");
      dispatch(removeEmail());
      router.push("/login");
    }

    if (isError) {
      toast.error((error as fetchBaseQueryError).data?.message);
    }
  }, [isSuccess, isError, error, dispatch, router]);

  return (
    <div className="adnexa-app-bg min-h-screen px-4 py-6">
      {/* ────────── Mobile Reset Password Shell ────────── */}
      <div className="relative mx-auto flex min-h-[calc(100vh-48px)] max-w-[460px] flex-col overflow-hidden rounded-[36px] border border-white/5 bg-[#05071c]/95 px-5 pb-8 pt-8 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(124,58,237,.22),transparent_62%)]" />
        <div className="pointer-events-none absolute -left-28 top-56 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />

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
            Login
          </Link>
        </div>

        {/* ────────── Brand Area ────────── */}
        <div className="relative z-10 mt-8 flex justify-center">
          <AppBrand />
        </div>

        {/* ────────── Header Copy ────────── */}
        <div className="relative z-10 mt-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black text-cyan-300">
            <HiShieldCheck className="text-base" /> Secure Reset
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">
            Create new password
          </h1>
          <p className="mt-3 text-base leading-6 text-slate-400">
            Set a new strong password for{" "}
            <span className="font-black text-cyan-300">
              {email || "your Adnexa account"}
            </span>
            .
          </p>
        </div>

        {/* ────────── Reset Password Form ────────── */}
        <form className="relative z-10 mt-8 space-y-5" onSubmit={handleSubmit}>
          {/* ────────── New Password Input ────────── */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              New Password
            </label>
            <div
              className={`adnexa-input-wrap ${passwordError ? "border-red-400/70" : ""}`}
            >
              <span className="adnexa-input-icon text-violet-300">
                <HiLockClosed className="text-2xl" />
              </span>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="adnexa-input pr-12"
                placeholder="Create new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <HiEyeSlash /> : <HiEye />}
              </button>
            </div>
          </div>

          {/* ────────── Confirm Password Input ────────── */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Confirm Password
            </label>
            <div
              className={`adnexa-input-wrap ${passwordError ? "border-red-400/70" : ""}`}
            >
              <span className="adnexa-input-icon text-cyan-300">
                <HiKey className="text-2xl" />
              </span>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="adnexa-input pr-12"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400"
                aria-label="Toggle confirm password visibility"
              >
                {showConfirmPassword ? <HiEyeSlash /> : <HiEye />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-2 text-xs font-semibold text-red-300">
                {passwordError}
              </p>
            )}
          </div>

          {/* ────────── Password Strength Checklist ────────── */}
          <section className="adnexa-glass-card space-y-3 rounded-[24px] p-4">
            <p className="text-sm font-black text-white">Password checklist</p>
            {passwordChecks.map((check) => (
              <div
                key={check.label}
                className="flex items-center gap-3 text-sm font-bold"
              >
                <HiCheckCircle
                  className={`text-xl ${check.isValid ? "text-emerald-300" : "text-slate-600"}`}
                />
                <span
                  className={
                    check.isValid ? "text-slate-200" : "text-slate-500"
                  }
                >
                  {check.label}
                </span>
              </div>
            ))}
          </section>

          {/* ────────── Submit Button ────────── */}
          <button
            type="submit"
            className="adnexa-primary-button"
            disabled={isLoading || !canSubmit}
          >
            <span>
              {isLoading ? (
                <PulseLoader color="#fff" size={8} margin={2} />
              ) : (
                "Reset Password"
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

export default ResetPassword;
