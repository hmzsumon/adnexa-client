"use client";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div>
      {/* ────────── Section Heading ────────── */}
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-violet-300/80">
        {subtitle}
      </p>
      <h2 className="mt-1 text-xl font-black tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
