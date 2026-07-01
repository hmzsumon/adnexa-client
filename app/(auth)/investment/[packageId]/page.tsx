"use client";

import EmptyState from "@/components/MobileApp/EmptyState";
import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import {
  useCreatePackageMutation,
  useGetPackageByIdQuery,
  useGetUserPackagesQuery,
} from "@/redux/features/package/packageApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { Package } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ElementType } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  HiArrowRight,
  HiArrowTrendingUp,
  HiBanknotes,
  HiCalendarDays,
  HiChartBar,
  HiChevronRight,
  HiClipboardDocumentList,
  HiExclamationTriangle,
  HiSparkles,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";

type PackageDetailsProps = {
  params: {
    packageId: string;
  };
};

type DetailCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon: ElementType;
  accent: string;
};

const formatAmount = (value: number | string | undefined) =>
  Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatPercent = (value: number | string | undefined) => {
  const percent = String(value || 0).trim();
  return percent.includes("%") ? percent : `${percent}%`;
};

const getPackageAccent = (price?: number | string) => {
  const packagePrice = Number(price || 0);

  if (packagePrice >= 1000) {
    return {
      label: "Premium Plan",
      text: "text-amber-300",
      bg: "from-amber-500/25 via-orange-950/40 to-violet-950/80",
      border: "border-amber-400/25",
      button: "from-amber-500 via-orange-500 to-yellow-400",
      glow: "bg-amber-400/25",
    };
  }

  if (packagePrice >= 200) {
    return {
      label: "Best Value",
      text: "text-violet-300",
      bg: "from-violet-500/25 via-indigo-950/70 to-cyan-950/30",
      border: "border-violet-400/25",
      button: "from-violet-600 via-indigo-600 to-cyan-500",
      glow: "bg-violet-500/25",
    };
  }

  return {
    label: "Popular",
    text: "text-emerald-300",
    bg: "from-emerald-500/20 via-cyan-950/45 to-indigo-950/75",
    border: "border-cyan-400/25",
    button: "from-emerald-500 via-cyan-500 to-sky-500",
    glow: "bg-cyan-400/25",
  };
};

const DetailCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
}: DetailCardProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      {/* ────────── Detail Icon ────────── */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl border ${accent}`}
      >
        <Icon className="text-2xl" />
      </div>

      {/* ────────── Detail Content ────────── */}
      <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-slate-500">
        {title}
      </p>
      <h3 className="mt-1 text-xl font-black text-white">{value}</h3>
      {subtitle && (
        <p className="mt-1 text-xs font-bold text-slate-500">{subtitle}</p>
      )}
    </div>
  );
};

const PackageDetails = ({ params }: PackageDetailsProps) => {
  const router = useRouter();
  const packageId = params.packageId;
  const { user } = useSelector((state: any) => state.auth);

  const { data, isLoading, isError, isSuccess, error } =
    useGetPackageByIdQuery(packageId);
  const { data: userPackageData } = useGetUserPackagesQuery(undefined);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const packageData = data?.package as Package | undefined;
  const packageAccent = useMemo(
    () => getPackageAccent(selectedPackage?.price),
    [selectedPackage?.price],
  );

  const packageDuration = Number((selectedPackage as any)?.duration || 0);
  const userMainBalance = Number(user?.m_balance || 0);
  const packagePrice = Number(selectedPackage?.price || 0);
  const hasEnoughBalance = userMainBalance >= packagePrice;
  const activePackage = (userPackageData?.userPackages || [])
    .filter((item: any) => item?.is_active && !item?.is_expired)
    .sort(
      (a: any, b: any) =>
        Number(b?.package_no || 0) - Number(a?.package_no || 0),
    )?.[0];
  const activePackageNo = Number(activePackage?.package_no || 0);
  const selectedPackageNo = Number((selectedPackage as any)?.package_no || 0);
  const isUpgrade = activePackageNo > 0 && selectedPackageNo > activePackageNo;
  const isCurrentOrLower =
    activePackageNo > 0 && selectedPackageNo <= activePackageNo;
  const actionLabel = isUpgrade ? "Confirm Upgrade" : "Activate Now";

  const [
    createPackage,
    {
      isLoading: isCreating,
      isError: isCreatingError,
      isSuccess: isCreateSuccess,
      error: createError,
    },
  ] = useCreatePackageMutation();

  const canActivate = hasEnoughBalance && !isCurrentOrLower && !isCreating;

  // ────────── Package Fetch Status Handler ──────────
  useEffect(() => {
    if (isSuccess && packageData) {
      setSelectedPackage(packageData);
    }

    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message || "Package not found",
      );
      setSelectedPackage(null);
    }
  }, [isSuccess, packageData, isError, error]);

  // ────────── Activate Package Handler ──────────
  const handleCreatePackage = async () => {
    if (!selectedPackage?._id || !canActivate) return;

    await createPackage({
      packageId: selectedPackage._id,
    });
  };

  // ────────── Package Create Status Handler ──────────
  useEffect(() => {
    if (isCreateSuccess) {
      toast.success(
        isUpgrade
          ? "Package upgraded successfully"
          : "Package activated successfully",
      );
      router.push("/investment/my-package");
    }

    if (isCreatingError) {
      toast.error(
        (createError as fetchBaseQueryError).data?.message ||
          "Package activation failed",
      );

      if ((createError as fetchBaseQueryError).status === 420) {
        router.push("/deposit/binance-pay");
      }
    }
  }, [isCreateSuccess, isCreatingError, createError, router]);

  if (isLoading) {
    return (
      <div className="space-y-6 text-white">
        {/* ────────── Page Header ────────── */}
        <PageHeader
          title="Package Details"
          subtitle="Loading your selected plan"
          back
        />

        {/* ────────── Loading Skeleton ────────── */}
        <section className="relative min-h-[62vh] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="space-y-4">
            <div className="h-5 w-36 animate-pulse rounded-full bg-white/10" />
            <div className="h-12 w-56 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-32 animate-pulse rounded-[28px] bg-white/10" />
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-36 animate-pulse rounded-[26px] bg-white/10"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!selectedPackage || isError) {
    return (
      <div className="space-y-6 text-white">
        {/* ────────── Page Header ────────── */}
        <PageHeader
          title="Package Details"
          subtitle="Selected plan overview"
          back
        />

        {/* ────────── Empty State ────────── */}
        <EmptyState
          icon={HiExclamationTriangle}
          title="Package not found"
          subtitle="The selected package is not available right now. Please choose another investment plan."
          actionLabel="Choose Plan"
          actionHref="/investment"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-28 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Package Details"
        subtitle="Review and activate plan"
        back
      />

      {/* ────────── Package Hero Section ────────── */}
      <section
        className={`relative overflow-hidden rounded-2xl border ${packageAccent.border} bg-gradient-to-br ${packageAccent.bg} p-4 shadow-[0_24px_80px_rgba(15,23,42,0.45)]`}
      >
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full ${packageAccent.glow} blur-3xl`}
        />
        <div className="pointer-events-none absolute -bottom-20 -left-14 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-black uppercase tracking-[0.2em] ${packageAccent.text}`}
              >
                {packageAccent.label}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
                {selectedPackage.title}
              </h2>
              <p className="mt-2 text-[0.6rem] font-semibold leading-6 text-slate-400">
                Activate this plan and start earning through daily tasks and
                investment returns.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <HiSparkles className="text-4xl" />
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-black/20 p-3 backdrop-blur-xl">
            <div className="grid grid-cols-2 divide-x divide-white/10">
              <div className="pr-4">
                <p className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-slate-500">
                  Plan Price
                </p>
                <h3 className="mt-2 text-xl font-black text-emerald-300">
                  BDT {formatAmount(selectedPackage.price)}
                </h3>
                <p className="text-xs font-bold text-slate-500">BDT</p>
              </div>
              <div className="pl-4">
                <p className="text-[0.6rem] font-black uppercase tracking-[0.18em] text-slate-500">
                  Your Balance
                </p>
                <h3 className="mt-2 text-xl font-black text-violet-300">
                  BDT {formatAmount(user?.m_balance)}
                </h3>
                <p className="text-[0.6rem] font-bold text-slate-500">BDT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────── Activation Rule Notice ────────── */}
      {(isCurrentOrLower || !hasEnoughBalance || isUpgrade) && (
        <section className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm font-bold text-amber-100">
          {isCurrentOrLower
            ? "You cannot activate the same or a lower package. Only upgrade is allowed."
            : !hasEnoughBalance
              ? "You need the full package price in your Main Balance before activation."
              : `You are upgrading from ${activePackage?.title}. Your previous package price will be refunded after successful upgrade.`}
        </section>
      )}

      {/* ────────── Plan Stats Section ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Overview" title="Plan Benefits" />

        <div className="grid grid-cols-2 gap-2">
          <DetailCard
            title="Daily Return"
            value={`BDT ${formatAmount(selectedPackage.daily_return)}`}
            subtitle="Earn every day"
            icon={HiBanknotes}
            accent="border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          />
          <DetailCard
            title="Return Rate"
            value={formatPercent(selectedPackage.return_percent)}
            subtitle="Plan percentage"
            icon={HiArrowTrendingUp}
            accent="border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
          />
          <DetailCard
            title="Duration"
            value={packageDuration ? `${packageDuration} Days` : "Active Plan"}
            subtitle="Investment period"
            icon={HiCalendarDays}
            accent="border-violet-400/20 bg-violet-400/10 text-violet-300"
          />
          <DetailCard
            title="Total Return"
            value={`BDT ${formatAmount(selectedPackage.total_return)}`}
            subtitle="Expected return"
            icon={HiChartBar}
            accent="border-amber-400/20 bg-amber-400/10 text-amber-300"
          />
        </div>
      </section>

      {/* ────────── Daily Task Section ────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative z-10 flex items-start gap-3">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <HiClipboardDocumentList className="text-3xl" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
              Daily Task
            </p>
            <h3 className="mt-2 text-xl font-black text-white">
              {selectedPackage.daily_tasks} Tasks / Day
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">
              Each task value is{" "}
              <span className="font-black text-emerald-300">
                ${formatAmount(selectedPackage.tasks_value)} BDT
              </span>
              . Complete your daily tasks to keep earning consistently.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Bottom Action Section ────────── */}
      <section className="fixed inset-x-0 bottom-[4.6rem] z-40 mx-auto max-w-[460px] border-t border-white/10 bg-[#060823]/90 px-5 pb-5 pt-4 text-white shadow-[0_-18px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <Link
            href="/investment"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-300 transition hover:bg-white/10"
            aria-label="Change plan"
          >
            <HiChevronRight className="rotate-180 text-2xl" />
          </Link>

          <button
            type="button"
            onClick={handleCreatePackage}
            disabled={!canActivate}
            className={`flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${packageAccent.button} px-5 text-sm font-black text-white shadow-[0_18px_40px_rgba(34,211,238,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45`}
          >
            {isCreating ? (
              <PulseLoader color="#ffffff" size={8} margin={2} />
            ) : (
              <>
                {isCurrentOrLower
                  ? "Downgrade Not Allowed"
                  : !hasEnoughBalance
                    ? "Insufficient Balance"
                    : actionLabel}
                <HiArrowRight className="text-xl" />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default PackageDetails;
