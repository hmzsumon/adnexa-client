"use client";

import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import PartnerLinkCard from "@/components/Partnership/PartnerLinkCard";
import Partners from "@/components/Partnership/Partners";
import { formatBalance } from "@/lib/functions";
import { useMyWalletQuery } from "@/redux/features/auth/authApi";
import { HiGift, HiLink, HiWallet } from "react-icons/hi2";
import { useSelector } from "react-redux";

const PartnerProgram = () => {
  // ────────── Wallet & Referral Data ──────────
  const { data } = useMyWalletQuery(undefined);
  const { wallet } = data || {};
  const { user } = useSelector((state: any) => state.auth);
  const host = typeof window !== "undefined" ? window.location.host : "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const referralLink = host
    ? `${protocol}://${host}/register?referral_code=${user?.customer_id}`
    : "";

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Partner Program"
        subtitle="Invite friends and earn rewards"
        back
      />

      {/* ────────── Partner Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/14 via-indigo-950/90 to-violet-950/55 p-5 shadow-[0_0_55px_rgba(245,158,11,.12)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-amber-400/25 bg-amber-400/10 text-amber-300">
            <HiGift className="text-4xl" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300/90">
              Referral Bonus
            </p>
            <h2 className="mt-1 text-lg font-black">Invite & Earn More</h2>
            <p className="mt-2 text-[0.6rem] leading-6 text-slate-400">
              Share your Adnexa link and grow your income with your direct
              partner team.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Partner Stats ────────── */}
      <section className="grid grid-cols-1 gap-3">
        <NeonStatCard
          label="Level Earning"
          value={`$${formatBalance(wallet?.total_level_earning || 0)}`}
          description="Referral income"
          icon={HiWallet}
          variant="amber"
        />
        <NeonStatCard
          label="Partner ID"
          value={`${user?.customer_id || "N/A"}`}
          description="Your invite code"
          icon={HiLink}
          variant="teal"
        />
      </section>

      {/* ────────── Referral Link Card ────────── */}
      <section>
        <SectionTitle subtitle="Invite Tools" title="Your Referral Link" />
        <PartnerLinkCard
          partnerId={user?.customer_id}
          referralLink={referralLink}
        />
      </section>

      {/* ────────── Partner Team List ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="My Network" title="Your Friends" />
        <Partners />
      </section>
    </div>
  );
};

export default PartnerProgram;
