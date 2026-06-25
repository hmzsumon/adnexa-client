"use client";

import PricingCard from "@/components/Packages/PricingCard";
import { useGetAllPackagesQuery } from "@/redux/features/package/packageApi";
import { Package } from "@/types/types";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  HiArrowLeft,
  HiBolt,
  HiCheckBadge,
  HiShieldCheck,
  HiStar,
} from "react-icons/hi2";

const Investment = () => {
  const router = useRouter();
  const { data, isLoading } = useGetAllPackagesQuery(undefined);
  const { packages } = data || { packages: [] };

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <header className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="adnexa-icon-button"
          aria-label="Go back"
        >
          <HiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-black">Investment Packages</h1>
        <div className="h-12 w-12" />
      </header>

      {/* ────────── Hero Plan Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-violet-400/25 bg-gradient-to-br from-violet-700/35 via-indigo-950/90 to-cyan-950/30 p-5 shadow-[0_0_60px_rgba(88,28,135,.25)]">
        <div className="pointer-events-none absolute -right-8 top-4 h-36 w-36 rounded-full bg-cyan-400/15 blur-2xl" />
        <div className="relative z-10">
          <p className="text-base font-bold text-violet-300">
            Available Packages
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-white">
            Choose Your Plan
          </h2>
          <p className="mt-2 text-lg text-slate-400">
            Invest and earn daily returns
          </p>

          {/* ────────── Hero Features ────────── */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/[.045] p-3">
              <HiShieldCheck className="mb-2 text-2xl text-violet-300" />
              <p className="text-sm font-bold">Secure</p>
              <p className="text-[11px] text-slate-500">Protected funds</p>
            </div>
            <div className="rounded-2xl bg-white/[.045] p-3">
              <HiBolt className="mb-2 text-2xl text-cyan-300" />
              <p className="text-sm font-bold">Daily</p>
              <p className="text-[11px] text-slate-500">Earn every day</p>
            </div>
            <div className="rounded-2xl bg-white/[.045] p-3">
              <HiStar className="mb-2 text-2xl text-amber-300" />
              <p className="text-sm font-bold">Trusted</p>
              <p className="text-[11px] text-slate-500">Smart platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Package List ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <Spinner aria-label="Loading packages" size="xl" />
        </div>
      ) : (
        <section className="space-y-4">
          {packages.map((p: Package, index: number) => (
            <PricingCard pac={p} index={index} key={p._id} />
          ))}
        </section>
      )}

      {/* ────────── Safety Message ────────── */}
      <div className="adnexa-glass-card flex items-center gap-3 rounded-[24px] p-4">
        <HiCheckBadge className="shrink-0 text-3xl text-violet-300" />
        <div>
          <h3 className="font-bold text-white">
            All investments are secure and protected.
          </h3>
          <p className="text-sm text-slate-400">
            Withdraw your earnings anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
