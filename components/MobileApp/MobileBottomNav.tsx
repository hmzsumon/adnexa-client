"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiArrowDownTray,
  HiArrowUpTray,
  HiClock,
  HiCube,
  HiHome,
} from "react-icons/hi2";

const navItems = [
  { label: "Home", href: "/dashboard", icon: HiHome },
  { label: "Deposit", href: "/deposit", icon: HiArrowDownTray },
  { label: "Withdraw", href: "/withdraw", icon: HiArrowUpTray },
  { label: "Packages", href: "/investment", icon: HiCube },
  { label: "History", href: "/transactions", icon: HiClock },
];

const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 -bottom-3 z-30 mx-auto max-w-[460px]  pb-3">
      {/* ────────── Bottom Navigation Glass Bar ────────── */}
      <div className="adnexa-glass-card flex items-center justify-between rounded-t-[28px] px-3 py-3 shadow-2xl shadow-black/40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1 transition-all duration-300 ${
                active ? "text-cyan-300" : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon
                className={`text-2xl ${active ? "drop-shadow-[0_0_12px_rgba(34,211,238,.75)]" : ""}`}
              />
              <span className="text-[11px] font-medium">{item.label}</span>
              <span
                className={`h-1 w-1 rounded-full ${active ? "bg-cyan-300" : "bg-transparent"}`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
