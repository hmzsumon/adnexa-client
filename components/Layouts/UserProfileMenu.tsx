"use client";

import { useLogoutUserMutation } from "@/redux/features/auth/authApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiArrowRightOnRectangle,
  HiChartBarSquare,
  HiChevronRight,
  HiClipboardDocument,
  HiCog6Tooth,
  HiIdentification,
  HiUserCircle,
  HiWallet,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PROFILE_MENU_ANIMATION_MS = 260;

const formatBalance = (value: number | string | undefined) =>
  Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const getInitials = (name?: string) => {
  if (!name) return "AD";

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const UserProfileMenu = () => {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [logout, { isSuccess, isError, error }] = useLogoutUserMutation();
  const { user } = useSelector((state: any) => state.auth);

  // ────────── Clear Close Timer Handler ──────────
  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  // ────────── Open Profile Menu Handler ──────────
  const handleOpen = useCallback(() => {
    clearCloseTimer();
    setIsMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, [clearCloseTimer]);

  // ────────── Close Profile Menu Handler ──────────
  const handleClose = useCallback(() => {
    setIsVisible(false);
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setIsMounted(false);
      closeTimerRef.current = null;
    }, PROFILE_MENU_ANIMATION_MS);
  }, [clearCloseTimer]);

  // ────────── Toggle Profile Menu Handler ──────────
  const handleToggle = () => {
    if (isMounted && isVisible) {
      handleClose();
      return;
    }

    handleOpen();
  };

  // ────────── Close Profile Menu On Outside Click ──────────
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose, isMounted]);

  // ────────── Escape Key Close Handler ──────────
  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, isMounted]);

  // ────────── Timer Cleanup Handler ──────────
  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  // ────────── Logout Toast Handler ──────────
  useEffect(() => {
    if (isSuccess) toast.success("Logout successful");

    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message || "Logout failed",
      );
    }
  }, [isSuccess, isError, error]);

  // ────────── Copy User ID Handler ──────────
  const handleCopyUserId = async () => {
    const userId = user?.customer_id || user?.partner_id || user?._id || "";
    if (!userId) return;

    await navigator.clipboard.writeText(String(userId));
    toast.success("User ID copied");
  };

  // ────────── Logout Handler ──────────
  const handleLogout = async () => {
    handleClose();
    await logout(undefined);
    Cookies.remove("icm-token");
    router.push("/");
  };

  return (
    <div ref={menuRef} className="relative">
      {/* ────────── Profile Trigger Button ────────── */}
      <button
        type="button"
        onClick={handleToggle}
        className="group relative flex h-12 w-12 items-center justify-center rounded-[18px] border border-cyan-400/20 bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-violet-500/20 text-white shadow-[0_14px_35px_rgba(8,47,73,0.35)] transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/40"
        aria-label="Open user menu"
        aria-expanded={isMounted}
      >
        <span className="absolute inset-0 rounded-[18px] bg-cyan-400/10 opacity-0 blur-md transition duration-300 group-hover:opacity-100" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 text-xs font-black">
          {getInitials(user?.name)}
        </span>
      </button>

      {/* ────────── Smart User Dropdown Card ────────── */}
      {isMounted && (
        <div
          className={`absolute right-0 top-[58px] z-[70] w-[310px] origin-top-right overflow-hidden rounded-[30px] border border-white/10 bg-[#070b22]/95 p-3 text-white shadow-[0_26px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-[opacity,transform,filter] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100 blur-0"
              : "-translate-y-3 scale-95 opacity-0 blur-sm pointer-events-none"
          }`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />

          {/* ────────── User Identity Section ────────── */}
          <div className="relative rounded-[24px] border border-white/10 bg-white/[.055] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-lg font-black shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                {getInitials(user?.name)}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-base font-black text-white">
                  {user?.name || "Adnexa User"}
                </h3>
                <p className="truncate text-xs font-bold text-slate-400">
                  {user?.email || "No email found"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyUserId}
              className="mt-4 flex w-full items-center justify-between rounded-2xl border border-cyan-400/15 bg-cyan-400/8 px-3 py-2 text-left transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-400/12"
            >
              <span className="flex items-center gap-2 text-xs font-black text-slate-300">
                <HiIdentification className="text-lg text-cyan-300" />
                User ID: {user?.customer_id || user?.partner_id || "N/A"}
              </span>
              <HiClipboardDocument className="text-lg text-cyan-300" />
            </button>
          </div>

          {/* ────────── Balance Summary Section ────────── */}
          <div className="relative mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-[22px] border border-emerald-400/15 bg-emerald-400/8 p-3">
              <HiWallet className="text-2xl text-emerald-300" />
              <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                M Balance
              </p>
              <h4 className="mt-1 text-lg font-black text-emerald-300">
                ${formatBalance(user?.m_balance)}
              </h4>
              <p className="text-[10px] font-bold text-slate-500">USDT</p>
            </div>

            <div className="rounded-[22px] border border-violet-400/15 bg-violet-400/8 p-3">
              <HiChartBarSquare className="text-2xl text-violet-300" />
              <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                G Balance
              </p>
              <h4 className="mt-1 text-lg font-black text-violet-300">
                ${formatBalance(user?.g_balance)}
              </h4>
              <p className="text-[10px] font-bold text-slate-500">USDT</p>
            </div>
          </div>

          {/* ────────── Quick Profile Actions Section ────────── */}
          <div className="relative mt-3 space-y-2">
            <Link
              href="/settings/personal-details"
              onClick={handleClose}
              className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[.045] px-4 py-3 transition duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/8"
            >
              <span className="flex items-center gap-3 text-sm font-black text-white">
                <HiUserCircle className="text-xl text-cyan-300" />
                Profile Details
              </span>
              <HiChevronRight className="text-lg text-slate-500" />
            </Link>

            <Link
              href="/settings"
              onClick={handleClose}
              className="flex items-center justify-between rounded-[20px] border border-white/8 bg-white/[.045] px-4 py-3 transition duration-300 hover:border-violet-400/20 hover:bg-violet-400/8"
            >
              <span className="flex items-center gap-3 text-sm font-black text-white">
                <HiCog6Tooth className="text-xl text-violet-300" />
                Settings
              </span>
              <HiChevronRight className="text-lg text-slate-500" />
            </Link>
          </div>

          {/* ────────── Logout Button Section ────────── */}
          <button
            type="button"
            onClick={handleLogout}
            className="relative mt-3 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-sm font-black text-white shadow-[0_16px_35px_rgba(37,99,235,0.24)] transition duration-300 hover:-translate-y-0.5"
          >
            <HiArrowRightOnRectangle className="text-xl" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
