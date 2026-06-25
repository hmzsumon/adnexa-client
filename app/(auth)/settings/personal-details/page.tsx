"use client";

import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import {
  HiEnvelope,
  HiIdentification,
  HiMapPin,
  HiPhone,
  HiUserCircle,
} from "react-icons/hi2";
import { useSelector } from "react-redux";

const PersonalDetails = () => {
  const { user } = useSelector((state: any) => state.auth);
  const items = [
    {
      label: "Full Name",
      value: user?.name || "Not available",
      icon: HiUserCircle,
    },
    { label: "Email", value: user?.email || "Not available", icon: HiEnvelope },
    { label: "Phone", value: user?.phone || "Not available", icon: HiPhone },
    {
      label: "Customer ID",
      value: user?.customer_id || user?.partner_id || "Not available",
      icon: HiIdentification,
    },
    {
      label: "Country",
      value: user?.country || "Not available",
      icon: HiMapPin,
    },
  ];

  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Personal Details"
        subtitle="Your Adnexa profile information"
        back
      />

      {/* ────────── Profile Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-cyan-400/25 bg-cyan-400/12 text-3xl font-black text-cyan-300">
            {String(user?.name || "A")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300/90">
              Profile
            </p>
            <h2 className="mt-1 text-3xl font-black">
              {user?.name || "Adnexa User"}
            </h2>
            <p className="mt-1 text-sm font-bold text-slate-400">
              {user?.rank || "Member"}
            </p>
          </div>
        </div>
      </section>

      {/* ────────── Profile Information List ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Information" title="Account Details" />
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="adnexa-glass-card flex items-center gap-4 rounded-[24px] p-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Icon className="text-2xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-500">{item.label}</p>
                <h3 className="mt-1 break-all font-black text-white">
                  {item.value}
                </h3>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PersonalDetails;
