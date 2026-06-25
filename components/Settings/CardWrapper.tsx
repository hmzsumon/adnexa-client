"use client";

import Link from "next/link";
import {
  HiArrowRight,
  HiBell,
  HiCheckBadge,
  HiCreditCard,
  HiIdentification,
  HiLockClosed,
  HiShieldCheck,
  HiTrash,
  HiUserCircle,
} from "react-icons/hi2";
import { useSelector } from "react-redux";

const cardItems = [
  {
    id: 1,
    title: "Profile Information",
    subtitle: "Name, email and personal details",
    icon: HiUserCircle,
    link: "/settings/profile",
    variant: "text-cyan-300 bg-cyan-400/10",
  },
  {
    id: 2,
    title: "Identity Verification",
    subtitle: "Complete KYC and unlock limits",
    icon: HiIdentification,
    link: "/verification",
    variant: "text-violet-300 bg-violet-400/10",
  },
  {
    id: 3,
    title: "Security Settings",
    subtitle: "Password and account protection",
    icon: HiLockClosed,
    link: "/settings/security",
    variant: "text-emerald-300 bg-emerald-400/10",
  },
  {
    id: 4,
    title: "Payment Settings",
    subtitle: "Manage wallet and payout details",
    icon: HiCreditCard,
    link: "/wallet",
    variant: "text-amber-300 bg-amber-400/10",
  },
  {
    id: 5,
    title: "Notifications",
    subtitle: "Control alerts and messages",
    icon: HiBell,
    link: "/settings/notifications",
    variant: "text-pink-300 bg-pink-400/10",
  },
];

const CardWrapper = () => {
  const { user } = useSelector((state: any) => state.auth);
  const isVerified = Boolean(user?.kyc_verified);

  return (
    <div className="space-y-5">
      {/* ────────── Profile Overview Card ────────── */}
      <section className="adnexa-glass-card rounded-[32px] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] border border-violet-400/25 bg-gradient-to-br from-violet-500/30 to-cyan-500/10 text-2xl font-black text-white">
            {user?.name?.slice(0, 2)?.toUpperCase() || "AD"}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-black text-white">
              {user?.name || "Adnexa User"}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-400">
              {user?.email || "No email found"}
            </p>
            <span
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${isVerified ? "bg-emerald-400/12 text-emerald-300" : "bg-amber-400/12 text-amber-300"}`}
            >
              <HiCheckBadge />{" "}
              {isVerified ? "Verified Account" : "Verification Required"}
            </span>
          </div>
        </div>
      </section>

      {/* ────────── Verification Status Card ────────── */}
      <section className="rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/12 via-indigo-950/80 to-violet-950/50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-cyan-400/10 text-cyan-300">
              <HiShieldCheck className="text-3xl" />
            </div>
            <div>
              <h3 className="font-black text-white">Verification Status</h3>
              <p className="text-sm text-slate-400">
                {isVerified
                  ? "Your account is verified."
                  : `${user?.kyc_step || 0}/4 steps complete`}
              </p>
            </div>
          </div>
          {isVerified ? (
            <span className="rounded-2xl bg-emerald-400/12 px-4 py-2 text-sm font-black text-emerald-300">
              Complete
            </span>
          ) : user?.kyc_step === 4 ? (
            <span className="rounded-2xl bg-amber-400/12 px-4 py-2 text-sm font-black text-amber-300">
              Under Review
            </span>
          ) : (
            <Link
              href="/verification"
              className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-black text-white"
            >
              Verify
            </Link>
          )}
        </div>
      </section>

      {/* ────────── Settings Menu List ────────── */}
      <section className="adnexa-glass-card rounded-[30px] p-4">
        <div className="mb-4">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300/80">
            Account Center
          </p>
          <h3 className="mt-1 text-2xl font-black text-white">Settings</h3>
        </div>

        <div className="space-y-3">
          {cardItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[.035] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.variant}`}
                >
                  <Icon className="text-2xl" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-sm font-black text-white">
                    {item.title}
                  </h4>
                  <p className="truncate text-xs text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
                <HiArrowRight className="text-xl text-slate-500" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ────────── Danger Zone ────────── */}
      <section className="adnexa-glass-card rounded-[30px] p-4">
        <Link
          href="/settings/remove-account"
          className="flex items-center gap-3 rounded-[22px] border border-red-400/20 bg-red-500/10 p-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-300">
            <HiTrash className="text-2xl" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-red-100">Remove Account</h4>
            <p className="text-xs text-red-200/70">
              Request permanent account removal
            </p>
          </div>
          <HiArrowRight className="text-xl text-red-200/70" />
        </Link>
      </section>
    </div>
  );
};

export default CardWrapper;
