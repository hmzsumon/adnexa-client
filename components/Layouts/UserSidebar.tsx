"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import { formatBalance } from "@/lib/functions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiArrowDownTray,
  HiArrowPathRoundedSquare,
  HiArrowTrendingUp,
  HiArrowUpTray,
  HiChatBubbleLeftRight,
  HiChevronRight,
  HiCog6Tooth,
  HiCube,
  HiGift,
  HiGlobeAlt,
  HiHeart,
  HiHome,
  HiTrophy,
  HiXMark,
} from "react-icons/hi2";
import { useSelector } from "react-redux";

const menuGroups = [
  {
    title: "Main",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: HiHome,
        accent: "text-cyan-300",
      },
      {
        label: "Transactions",
        href: "/transactions",
        icon: HiArrowPathRoundedSquare,
        accent: "text-slate-300",
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        label: "Deposit",
        href: "/deposit",
        icon: HiArrowDownTray,
        accent: "text-emerald-300",
      },
      {
        label: "Withdraw",
        href: "/withdraw",
        icon: HiArrowUpTray,
        accent: "text-sky-300",
      },
      // {
      //   label: "Send USDT",
      //   href: "/send",
      //   icon: HiPaperAirplane,
      //   accent: "text-fuchsia-300",
      // },
    ],
  },
  {
    title: "Investment",
    items: [
      {
        label: "All Packages",
        href: "/investment",
        icon: HiCube,
        accent: "text-violet-300",
      },
      {
        label: "My Package",
        href: "/investment/my-package",
        icon: HiGift,
        accent: "text-amber-300",
      },
    ],
  },
  {
    title: "Tasks",
    items: [
      {
        label: "My Tasks",
        href: "/tasks/my-tasks",
        icon: HiGift,
        accent: "text-emerald-300",
      },
      {
        label: "Task Report",
        href: "/tasks/tasks-report",
        icon: HiArrowTrendingUp,
        accent: "text-sky-300",
      },
    ],
  },
  {
    title: "Referral",
    items: [
      {
        label: "Referral Program",
        href: "/partner-program",
        icon: HiHeart,
        accent: "text-amber-300",
      },
      {
        label: "Generation",
        href: "/generation-program",
        icon: HiGlobeAlt,
        accent: "text-cyan-300",
      },
    ],
  },
  {
    title: "More",
    items: [
      {
        label: "Rank & Reward",
        href: "/rank-and-reward",
        icon: HiTrophy,
        accent: "text-amber-300",
      },
      {
        label: "Settings",
        href: "/settings",
        icon: HiCog6Tooth,
        accent: "text-slate-300",
      },
      {
        label: "Support",
        href: "/contact",
        icon: HiChatBubbleLeftRight,
        accent: "text-sky-300",
      },
    ],
  },
];

const UserSidebar = ({ handleClose }: { handleClose?: () => void }) => {
  const pathname = usePathname();
  const { user } = useSelector((state: any) => state.auth);

  return (
    <aside className="flex h-full flex-col overflow-hidden text-white">
      {/* ────────── Drawer Top Area ────────── */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-[#060823]/95 px-5 pb-4 pt-5 backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <AppBrand compact />

          {handleClose && (
            <button
              type="button"
              onClick={handleClose}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/7 text-white shadow-lg shadow-black/30 transition hover:bg-white/12"
              aria-label="Close menu"
            >
              <HiXMark className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* ────────── Drawer Scroll Content ────────── */}
      <div className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-3 pb-36 pt-5 adnexa-scrollbar">
        {/* ────────── User Mini Profile Card ────────── */}
        <div className="adnexa-glass-card mb-4 rounded-2xl p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-black shadow-[0_0_28px_rgba(124,58,237,.45)]">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-black">
                {user?.name || "Adnexa User"}
              </h3>
              <p className="mt-1 inline-flex rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                ⭐ Level Investor
              </p>
            </div>
            <HiChevronRight className="text-2xl text-slate-400" />
          </div>

          {/* ────────── Drawer Balance Row ────────── */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
            <div>
              <p className="text-xs text-slate-400">Total Balance</p>
              <p className="text-lg font-black text-emerald-300">
                ${formatBalance(user?.m_balance || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Game Balance</p>
              <p className="text-lg font-black text-violet-300">
                ${formatBalance(user?.g_balance || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* ────────── Navigation Groups ────────── */}
        <div className="space-y-3">
          {menuGroups.map((group) => (
            <div
              key={group.title}
              className="adnexa-glass-card rounded-2xl p-3"
            >
              <h4 className="mb-2 px-2 text-xs font-black uppercase tracking-[.2em] text-slate-500">
                {group.title}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname?.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClose}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/30"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/7 ${active ? "text-cyan-300" : item.accent}`}
                      >
                        <Icon className="text-xl" />
                      </span>
                      <span className="flex-1 font-semibold">{item.label}</span>
                      {active ? (
                        <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      ) : (
                        <HiChevronRight className="text-xl text-slate-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ────────── Invite Promo Card ────────── */}
        <Link
          href="/partner-program"
          onClick={handleClose}
          className="mt-4 block rounded-2xl border border-violet-400/30 bg-gradient-to-r from-violet-700/40 to-cyan-600/20 px-2 py-4 shadow-[0_0_35px_rgba(124,58,237,.25)]"
        >
          <div className="flex items-center gap-1">
            <div className="text-3xl">🎁</div>
            <div className="min-w-0 flex-1">
              <h3 className="font-black text-white">Invite & Earn More</h3>
              <p className="text-[0.60rem] leading-5 text-slate-300">
                Refer friends and unlock exciting rewards!
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
              →
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default UserSidebar;
