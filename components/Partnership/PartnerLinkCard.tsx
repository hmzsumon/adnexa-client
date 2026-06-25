"use client";

import CopyToClipboard from "@/lib/CopyToClipboard";
import { useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { HiLink, HiShare, HiUsers } from "react-icons/hi2";
import { RWebShare } from "react-web-share";

const PartnerLinkCard = ({ partnerId, referralLink }: any) => {
  const [showLink, setShowLink] = useState<"link" | "code">("link");
  const value = showLink === "link" ? referralLink : partnerId;

  return (
    <div className="adnexa-glass-card mt-5 rounded-[30px] p-4">
      {/* ────────── Referral Switch Buttons ────────── */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setShowLink("link")}
          className={`rounded-2xl px-4 py-3 text-sm font-black transition-all ${showLink === "link" ? "bg-cyan-400/15 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.12)]" : "bg-white/[.04] text-slate-400"}`}
        >
          <HiLink className="mr-1 inline text-lg" /> Referral Link
        </button>
        <button
          type="button"
          onClick={() => setShowLink("code")}
          className={`rounded-2xl px-4 py-3 text-sm font-black transition-all ${showLink === "code" ? "bg-violet-400/15 text-violet-300 shadow-[0_0_25px_rgba(139,92,246,.12)]" : "bg-white/[.04] text-slate-400"}`}
        >
          <HiUsers className="mr-1 inline text-lg" /> Code
        </button>
      </div>

      {/* ────────── Referral Value Box ────────── */}
      <div className="mt-4 rounded-[22px] border border-white/10 bg-white/[.04] p-4">
        <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          {showLink === "link" ? "Your Invite Link" : "Your Referral Code"}
        </p>
        <div className="flex items-center gap-3">
          <p className="min-w-0 flex-1 break-all text-sm font-semibold text-slate-200">
            {value}
          </p>
          <CopyToClipboard text={value} />
        </div>
      </div>

      {/* ────────── Invite Actions ────────── */}
      <div className="mt-4 flex items-center gap-3">
        <RWebShare data={{ url: referralLink }}>
          <button className="flex min-h-[58px] flex-1 items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-600 to-teal-500 text-base font-black text-white shadow-lg shadow-blue-950/30">
            <HiShare className="text-xl" /> Invite Friend
          </button>
        </RWebShare>
        <button className="flex h-[58px] w-[58px] items-center justify-center rounded-[20px] border border-white/10 bg-white/[.05] text-2xl text-slate-300">
          <FaQrcode />
        </button>
      </div>
    </div>
  );
};

export default PartnerLinkCard;
