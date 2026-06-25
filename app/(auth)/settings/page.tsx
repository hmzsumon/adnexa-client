"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import CardWrapper from "@/components/Settings/CardWrapper";
import { HiCog6Tooth } from "react-icons/hi2";

const Settings = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader title="Settings" subtitle="Manage your Adnexa account" back />

      {/* ────────── Settings Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-600/20 via-indigo-950/90 to-cyan-950/35 p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-violet-400/15 blur-2xl" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-violet-400/25 bg-violet-400/10 text-violet-300">
            <HiCog6Tooth className="text-4xl" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-300/90">
              Control Center
            </p>
            <h2 className="mt-1 text-3xl font-black">Account Settings</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Update profile, security, verification, wallet, and notification
              preferences.
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Settings Content ────────── */}
      <CardWrapper />
    </div>
  );
};

export default Settings;
