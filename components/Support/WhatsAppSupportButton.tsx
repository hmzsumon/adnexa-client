import { HiChatBubbleLeftRight } from "react-icons/hi2";

const SUPPORT_URL = "https://wa.me/qr/63NTJDPRTS72N1";

/* ────────── WhatsApp Support Button ────────── */
const WhatsAppSupportButton = ({ compact = false }: { compact?: boolean }) => {
  return (
    <a
      href={SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 font-black text-emerald-200 shadow-[0_0_28px_rgba(16,185,129,.12)] transition hover:bg-emerald-400/20 ${compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm"}`}
    >
      <HiChatBubbleLeftRight className="text-xl" />
      WhatsApp Support
    </a>
  );
};

export default WhatsAppSupportButton;
