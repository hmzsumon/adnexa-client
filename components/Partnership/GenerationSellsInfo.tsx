"use client";

import NeonStatCard from "@/components/MobileApp/NeonStatCard";
import { formatBalance } from "@/lib/functions";
import { HiChartBar, HiUsers } from "react-icons/hi2";

const GenerationSellsInfo = ({ total_sells, level_01_sells }: any) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-3">
      {/* ────────── Generation Sales Summary ────────── */}
      <NeonStatCard
        label="1st Gen Sales"
        value={`$${formatBalance(level_01_sells || 0)}`}
        description="Package volume"
        icon={HiUsers}
        variant="teal"
      />
      <NeonStatCard
        label="Total Team Sales"
        value={`$${formatBalance(total_sells || 0)}`}
        description="All generations"
        icon={HiChartBar}
        variant="violet"
      />
    </div>
  );
};

export default GenerationSellsInfo;
