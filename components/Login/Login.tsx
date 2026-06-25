"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiAtSymbol,
  HiEye,
  HiEyeSlash,
  HiLockClosed,
} from "react-icons/hi2";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

const Login = () => {
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // ────────── Login Submit Handler ──────────
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length > 0 && !email.includes("@")) {
      setEmailError(true);
      toast.error("Please enter a valid email address");
      return;
    }

    loginUser({ email, password });
  };

  // ────────── Login Response Handler ──────────
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful");
      router.push("/dashboard");
    }

    if (isError) {
      toast.error((error as fetchBaseQueryError).data?.message);
      if ((error as fetchBaseQueryError).status === 421)
        router.push("/verify-email?email=" + email);
      if ((error as fetchBaseQueryError).status === 422)
        router.push("/suspend");
    }
  }, [isSuccess, isError, error, email, router]);

  return (
    <div className="adnexa-app-bg min-h-screen px-2 py-2">
      {/* ────────── Mobile Login Shell ────────── */}
      <div className="relative mx-auto flex min-h-[calc(100vh-48px)] max-w-[460px] flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#05071c]/95 px-3 pb-8 pt-10 shadow-2xl shadow-black/60">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(124,58,237,.25),transparent_60%)]" />

        {/* ────────── Brand Area ────────── */}
        <div className="relative z-10 mt-4 flex justify-center">
          <AppBrand />
        </div>

        {/* ────────── Welcome Copy ────────── */}
        <div className="relative z-10 mt-6 flex flex-col items-center text-center">
          <div>
            <p className="text-lg font-bold text-violet-300">Welcome back 👋</p>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-white">
              Sign in to your account
            </h1>
            <p className="mt-2 text-xs text-slate-400">
              Glad to see you again! Let’s keep growing.
            </p>
          </div>
        </div>

        {/* ────────── Login Form ────────── */}
        <form className="relative z-10 mt-8 space-y-5" onSubmit={handleLogin}>
          {/* ────────── Email Input ────────── */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-slate-300"
            >
              Email Address
            </label>
            <div
              className={`adnexa-input-wrap ${emailError ? "border-red-400/70" : ""}`}
            >
              <span className="adnexa-input-icon text-sky-300">
                <HiAtSymbol className="text-2xl" />
              </span>
              <input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() =>
                  setEmailError(email.length > 0 && !email.includes("@"))
                }
                className="adnexa-input"
              />
            </div>
            {emailError && (
              <p className="mt-2 text-xs font-semibold text-red-300">
                Please enter a valid email address
              </p>
            )}
          </div>

          {/* ────────── Password Input ────────── */}
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
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="adnexa-input pr-12"
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

          {/* ────────── Forgot Password Link ────────── */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-bold text-violet-300 hover:text-cyan-300"
            >
              Forgot password?
            </Link>
          </div>

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
                "Sign In"
              )}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <HiArrowRight className="text-2xl" />
            </span>
          </button>
        </form>

        {/* ────────── Create Account CTA ────────── */}
        <div className="relative z-10 mt-10">
          <div className="mb-6 flex items-center gap-4 text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-sm font-bold">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <Link
            href="/register"
            className="adnexa-glass-card flex items-center gap-4 rounded-[24px] p-4 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex-1">
              <p className="text-sm text-slate-400">Don’t have an account?</p>
              <h3 className="text-xl font-black text-cyan-300">
                Create Account
              </h3>
            </div>
            <HiArrowRight className="text-xl text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
