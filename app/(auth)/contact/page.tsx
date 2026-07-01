import PageHeader from "@/components/MobileApp/PageHeader";
import SectionTitle from "@/components/MobileApp/SectionTitle";
import WhatsAppSupportButton from "@/components/Support/WhatsAppSupportButton";
import {
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiLifebuoy,
  HiShieldCheck,
} from "react-icons/hi2";

const supportItems = [
  {
    title: "Support Email",
    value: "support@adnexa.com",
    href: "mailto:support@adnexa.com",
    icon: HiEnvelope,
    accent: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    title: "Accounts Email",
    value: "service@adnexa.com",
    href: "mailto:service@adnexa.com",
    icon: HiShieldCheck,
    accent: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  },
];

const Contact = () => {
  return (
    <div className="space-y-6 text-white">
      {/* ────────── Page Header ────────── */}
      <PageHeader title="Support" subtitle="Get help from Adnexa team" back />

      {/* ────────── Support Hero Card ────────── */}
      <section className="relative overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 via-indigo-950/90 to-violet-950/50 p-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300/90">
              Help Center
            </p>
            <h2 className="mt-2 text-xl font-black tracking-tight">
              Need Help?
            </h2>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Contact our support team for account, payment, and investment
              related issues.
            </p>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[26px] border border-cyan-400/25 bg-cyan-400/12 text-cyan-300">
            <HiLifebuoy className="text-4xl" />
          </div>
        </div>
      </section>

      {/* ────────── Contact Channels ────────── */}
      <section className="space-y-4">
        <SectionTitle subtitle="Contact" title="Support Channels" />
        {supportItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              href={item.href}
              key={item.title}
              className="adnexa-glass-card flex items-center gap-4 rounded-[26px] p-4 transition hover:-translate-y-0.5"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${item.accent}`}
              >
                <Icon className="text-3xl" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400">{item.title}</p>
                <h3 className="mt-1 break-all text-lg font-black text-white">
                  {item.value}
                </h3>
              </div>
            </a>
          );
        })}
      </section>

      {/* ────────── WhatsApp Support ────────── */}
      <WhatsAppSupportButton />

      {/* ────────── Support Note ────────── */}
      <section className="adnexa-glass-card flex items-center gap-3 rounded-[24px] p-4">
        <HiChatBubbleBottomCenterText className="shrink-0 text-3xl text-violet-300" />
        <p className="text-sm font-bold leading-6 text-slate-400">
          For faster support, include your customer ID, payment TXID, and a
          clear description of your issue.
        </p>
      </section>
    </div>
  );
};

export default Contact;
