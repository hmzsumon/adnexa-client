"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import { useRegisterUserMutation } from "@/redux/features/admin/adminUsersApi";
import { useCheckPhoneExistOrNotMutation } from "@/redux/features/auth/authApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiEye,
  HiEyeSlash,
  HiLockClosed,
  HiShieldCheck,
  HiSparkles,
  HiUser,
  HiUsers,
} from "react-icons/hi2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCodeFromUrl = searchParams.get("referral_code");

  const [checkPhoneExistOrNot, { data: phoneCheckData }] =
    useCheckPhoneExistOrNotMutation();
  const [registerUser, { isSuccess, isLoading, isError, error }] =
    useRegisterUserMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");

  // ────────── Referral Code Prefill ──────────
  useEffect(() => {
    if (referralCodeFromUrl) setReferralCode(referralCodeFromUrl);
  }, [referralCodeFromUrl]);

  // ────────── Existing Mobile Checker ──────────
  useEffect(() => {
    if (phoneCheckData?.isExist) setPhoneError("Mobile number already exists");
  }, [phoneCheckData]);

  // ────────── Register Response Handler ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account created successfully");
      router.push("/login");
    }

    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message || "Registration failed",
      );
    }
  }, [isSuccess, isError, error, router]);

  // ────────── Mobile Blur Handler ──────────
  const handlePhoneCheck = () => {
    if (!phone) return;
    setPhoneError("");
    checkPhoneExistOrNot({ phone });
  };

  // ────────── Register Submit Handler ──────────
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) return setFormError("Please enter your name");
    if (!phone) return setFormError("Please enter your mobile number");
    if (phoneError) return setFormError(phoneError);
    if (password.length < 6)
      return setFormError("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return setFormError("Password and confirm password do not match");
    if (!isAgree)
      return setFormError("Please agree to the terms and conditions");

    registerUser({
      name,
      phone,
      referralCode: referralCode || "202004",
      password,
    });
  };

  return (
    <div className="adnexa-app-bg min-h-screen px-2 py-4">
      {/* ────────── Mobile Register Shell ────────── */}
      <div className="relative mx-auto min-h-[calc(100vh-48px)] max-w-[460px] overflow-hidden rounded-[36px] border border-white/5 bg-[#05071c]/95 px-3 pb-8 pt-8 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(34,211,238,.18),transparent_62%)]" />

        {/* ────────── Brand Area ────────── */}
        <div className="relative z-10 flex justify-center">
          <AppBrand />
        </div>

        {/* ────────── Welcome Copy ────────── */}
        <div className="relative z-10 mt-10 flex flex-col items-center text-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black text-cyan-300">
              <HiSparkles /> Join Adnexa today
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-white">
              Create your account
            </h1>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Start investing, earning, and growing with a smarter mobile
              experience.
            </p>
          </div>
        </div>

        {/* ────────── Register Form ────────── */}
        <form className="relative z-10 mt-7 space-y-5" onSubmit={handleSubmit}>
          {/* ────────── Name Input ────────── */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Full Name
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-cyan-300">
                <HiUser className="text-2xl" />
              </span>
              <input
                id="name"
                className="adnexa-input"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* ────────── Mobile Input Section ────────── */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Mobile Number
            </label>
            <div className="adnexa-input-wrap adnexa-phone-field !block">
              <PhoneInput
                country="bd"
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                  setPhoneError("");
                }}
                onBlur={handlePhoneCheck}
                placeholder="Enter mobile number"
                inputClass="adnexa-phone-input"
                buttonClass="adnexa-phone-button"
                dropdownClass="adnexa-phone-dropdown"
              />
            </div>
            {phoneError && (
              <p className="mt-2 text-xs font-semibold text-red-300">
                {phoneError}
              </p>
            )}
          </div>

          {/* ────────── Referral Code Input ────────── */}
          <div>
            <label
              htmlFor="referralCode"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Referral Code
            </label>
            <div className="adnexa-input-wrap">
              <span className="adnexa-input-icon text-amber-300">
                <HiUsers className="text-2xl" />
              </span>
              <input
                id="referralCode"
                className="adnexa-input"
                placeholder="Referral code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                disabled={!!referralCodeFromUrl}
              />
            </div>
          </div>

          {/* ────────── Password Inputs ────────── */}
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                Password
              </label>
              <div className="adnexa-input-wrap">
                <span className="adnexa-input-icon text-violet-300">
                  <HiLockClosed className="text-2xl" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="adnexa-input pr-12"
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400"
                >
                  {showPassword ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-bold text-slate-300"
              >
                Confirm Password
              </label>
              <div className="adnexa-input-wrap">
                <span className="adnexa-input-icon text-violet-300">
                  <HiShieldCheck className="text-2xl" />
                </span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="adnexa-input pr-12"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400"
                >
                  {showConfirmPassword ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
            </div>
          </div>

          {/* ────────── Terms Agreement ────────── */}
          <label className="flex items-start gap-3 rounded-[22px] border border-white/10 bg-white/[.035] p-4 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={() => setIsAgree(!isAgree)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-cyan-400"
            />
            <span>
              I agree with the{" "}
              <Link
                href="/terms-and-conditions"
                className="font-bold text-cyan-300"
              >
                Terms & Conditions
              </Link>{" "}
              and privacy policy.
            </span>
          </label>

          {/* ────────── Form Error Message ────────── */}
          {formError && (
            <p className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
              {formError}
            </p>
          )}

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
                "Create Account"
              )}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <HiArrowRight className="text-2xl" />
            </span>
          </button>
        </form>

        {/* ────────── Sign In Link ────────── */}
        <div className="relative z-10 mt-7 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-black text-cyan-300">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
