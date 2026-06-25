"use client";

import {
  HiCube,
  HiEnvelope,
  HiIdentification,
  HiUserCircle,
} from "react-icons/hi2";

const PartnerTable = ({ data = [] }: any) => {
  const rows = Array.isArray(data) ? data : [];

  if (rows.length === 0) {
    return (
      <p className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-center text-sm font-semibold text-slate-400">
        No members found in this level.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {/* ────────── Team Member List ────────── */}
      {rows.map((record: any) => (
        <div
          key={record.customer_id || record._id}
          className="rounded-[22px] border border-white/10 bg-white/[.04] p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <HiUserCircle className="text-3xl" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-base font-black text-white">
                {record.name || "Member"}
              </h4>
              <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-400">
                <HiEnvelope /> {record.email || "No email"}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <span className="rounded-xl bg-white/[.05] px-3 py-2 font-bold text-slate-300">
                  <HiIdentification className="mr-1 inline text-cyan-300" /> ID:{" "}
                  {record.customer_id || "N/A"}
                </span>
                <span className="rounded-xl bg-white/[.05] px-3 py-2 font-bold text-slate-300">
                  <HiCube className="mr-1 inline text-violet-300" />{" "}
                  {record.active_packages?.length || 0} Package
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnerTable;
