"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import Identification from "@/components/Verification/Identification";
import PersonalInfo from "@/components/Verification/PersonalInfo";
import Selfie from "@/components/Verification/Selfie";
import { HiIdentification, HiShieldCheck, HiUserCircle } from "react-icons/hi2";
import { useSelector } from "react-redux";

const Verification = () => {
  // ────────── Verification Step Data ──────────
  const { user } = useSelector((state: any) => state.auth);
  const step = user?.kyc_step || 1;

  const steps = [
    { id: 1, title: "Personal", icon: HiUserCircle },
    { id: 2, title: "Document", icon: HiIdentification },
    { id: 3, title: "Selfie", icon: HiShieldCheck },
  ];

  return (
    <div className="space-y-6 text-white adnexa-kyc-page">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Verification"
        subtitle="Complete your Adnexa KYC"
        back
      />

      {/* ────────── KYC Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300/90">
              Account Security
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">
              KYC Verify
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Submit correct personal information and documents to unlock full
              Adnexa account features.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-cyan-400/25 bg-cyan-400/12 text-cyan-300">
            <HiShieldCheck className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Verification Stepper ────────── */}
      <section className="grid grid-cols-3 gap-3">
        {steps.map((item) => {
          const Icon = item.icon;
          const active = step === item.id;
          const complete = step > item.id;
          return (
            <div
              key={item.id}
              className={`rounded-[24px] border p-4 text-center ${active ? "border-cyan-400/35 bg-cyan-400/10 text-cyan-200" : complete ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200" : "border-white/10 bg-white/[.045] text-slate-400"}`}
            >
              <Icon className="mx-auto text-2xl" />
              <p className="mt-2 text-xs font-black">{item.title}</p>
            </div>
          );
        })}
      </section>

      {/* ────────── Verification Form Content ────────── */}
      <section className="adnexa-glass-card rounded-[30px] p-4">
        {step === 1 && <PersonalInfo />}
        {step === 2 && <Identification />}
        {step === 3 && <Selfie />}
      </section>
    </div>
  );
};

export default Verification;
