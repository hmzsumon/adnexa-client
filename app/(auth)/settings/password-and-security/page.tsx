"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import Link from "next/link";
import {
  HiChevronRight,
  HiKey,
  HiLockClosed,
  HiShieldCheck,
} from "react-icons/hi2";

const securityItems = [
  {
    title: "Change Password",
    subtitle: "Update login password",
    href: "/settings/change-password",
    icon: HiShieldCheck,
    accent: "text-violet-300 bg-violet-400/10 border-violet-400/20",
  },
  {
    title: "Change PIN",
    subtitle: "Update transaction PIN",
    href: "/settings/change-pin",
    icon: HiKey,
    accent: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  },
];

const PasswordAndSecurity = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Password & Security"
        subtitle="Manage account protection"
        back
      />

      {/* ────────── Security Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-500/18 via-indigo-950/90 to-cyan-950/35 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-violet-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300/90">
              Security Center
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              Protected
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Keep your Adnexa account safe with updated password and security
              PIN.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-violet-400/25 bg-violet-500/15 text-violet-300">
            <HiLockClosed className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Security Menu List ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Settings" title="Security Options" />
        {securityItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              key={item.title}
              className="adnexa-glass-card flex items-center gap-4 rounded-[26px] p-4"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${item.accent}`}
              >
                <Icon className="text-3xl" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-black text-white">{item.title}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">
                  {item.subtitle}
                </p>
              </div>
              <HiChevronRight className="text-2xl text-slate-500" />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default PasswordAndSecurity;
