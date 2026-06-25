"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { HiArrowLeft, HiChevronRight } from "react-icons/hi2";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  back?: boolean;
  rightLabel?: string;
  rightHref?: string;
  rightIcon?: IconType;
};

const PageHeader = ({
  title,
  subtitle,
  back = false,
  rightLabel,
  rightHref,
  rightIcon: RightIcon,
}: PageHeaderProps) => {
  const router = useRouter();

  return (
    <header className="space-y-4 text-white">
      {/* ────────── Top Navigation Row ────────── */}
      <div className="flex items-center justify-between gap-3">
        {back ? (
          <button
            type="button"
            onClick={() => router.back()}
            className="adnexa-icon-button shrink-0"
            aria-label="Go back"
          >
            <HiArrowLeft className="text-xl" />
          </button>
        ) : (
          <div className="h-12 w-12 shrink-0" />
        )}

        <div className="min-w-0 flex-1 text-center">
          <h1 className="truncate text-sm font-black tracking-tight text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 truncate text-[0.60rem] font-semibold text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {rightHref && rightLabel ? (
          <Link
            href={rightHref}
            className="adnexa-icon-button group shrink-0 !w-auto gap-1 px-4 text-sm font-black text-violet-200"
          >
            {RightIcon && <RightIcon className="text-lg" />}
            <span className="hidden xs:inline">{rightLabel}</span>
            <HiChevronRight className="text-lg transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <div className="h-12 w-12 shrink-0" />
        )}
      </div>
    </header>
  );
};

export default PageHeader;
