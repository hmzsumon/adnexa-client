import PageHeader from "@/components/MobileApp/PageHeader";
import { HiExclamationTriangle, HiTrash } from "react-icons/hi2";

const RemoveAccount = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader
        title="Remove Account"
        subtitle="Contact support for account closure"
        back
      />

      {/* ────────── Remove Account Warning ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-red-400/20 bg-gradient-to-br from-red-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-300/90">
              Danger Zone
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Remove</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Account removal is a sensitive action and must be handled by
              Adnexa support.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-red-400/25 bg-red-400/12 text-red-300">
            <HiTrash className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Support Instruction ────────── */}
      <section className="adnexa-glass-card space-y-4 rounded-[28px] p-5 text-center">
        <HiExclamationTriangle className="mx-auto text-5xl text-amber-300" />
        <h3 className="text-2xl font-black">Contact Support</h3>
        <p className="text-sm leading-6 text-slate-400">
          If you want to remove your account, please contact the support team
          from your registered email.
        </p>
        <a href="mailto:support@adnexa.com" className="adnexa-primary-button">
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default RemoveAccount;
