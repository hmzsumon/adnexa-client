"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import MyPackageCard from "@/components/Packages/MyPackageCard";
import { useGetUserPackagesQuery } from "@/redux/features/package/packageApi";
import { HiCube, HiSparkles } from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";

const MyPackage = () => {
  const { data, isLoading } = useGetUserPackagesQuery(undefined);
  const { userPackages } = data || { userPackages: [] };

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="My Packages"
        subtitle="Track your active investments"
        back
      />

      {/* ────────── My Package Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-600/25 via-indigo-950/90 to-cyan-950/35 p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/15 text-violet-300 shadow-[0_0_35px_rgba(139,92,246,.18)]">
            <HiCube className="text-4xl" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300/90">
              Investment Hub
            </p>
            <h2 className="mt-1 text-xl font-black">Your Plan Status</h2>
            <p className="mt-1 text-[0.6rem] text-slate-400">
              See active plans, daily returns, task values, and expiry status.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Package Content ────────── */}
      {isLoading ? (
        <div className="flex h-[45vh] items-center justify-center">
          <RingLoader color="#22d3ee" size={90} />
        </div>
      ) : userPackages?.length > 0 ? (
        <section className="space-y-4">
          <SectionTitle subtitle="Portfolio" title="Your Purchased Packages" />
          {userPackages.map((p: any) => (
            <MyPackageCard pac={p} key={p._id} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No package yet"
          subtitle="Buy your first Adnexa package and start earning daily returns."
          actionLabel="Explore Packages"
          actionHref="/investment"
          icon={HiSparkles}
        />
      )}
    </div>
  );
};

export default MyPackage;
