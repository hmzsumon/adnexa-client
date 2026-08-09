"use client";

import {
  INSTALL_STATE_CHANGED_EVENT,
  isAppMarkedInstalled,
  isIosBrowser,
  isRunningAsInstalledApp,
  openInstallPrompt,
} from "@/lib/androidAppInstall";
import { useEffect, useState } from "react";
import {
  HiArrowDownTray,
  HiDevicePhoneMobile,
  HiSparkles,
} from "react-icons/hi2";

const InstallAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(
        !isIosBrowser() &&
          !isRunningAsInstalledApp() &&
          !isAppMarkedInstalled(),
      );
    };

    updateVisibility();
    window.addEventListener(INSTALL_STATE_CHANGED_EVENT, updateVisibility);
    return () => {
      window.removeEventListener(INSTALL_STATE_CHANGED_EVENT, updateVisibility);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={openInstallPrompt}
      className="group relative z-10 mt-5 w-full overflow-hidden rounded-[22px] border border-cyan-300/15 bg-gradient-to-r from-violet-500/10 via-indigo-400/10 to-cyan-300/10 p-[1px] text-left shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30"
    >
      <span className="relative flex items-center gap-3 rounded-[21px] bg-[#090c2a]/95 px-3.5 py-3.5">
        <span className="pointer-events-none absolute -right-7 -top-8 h-24 w-24 rounded-full bg-cyan-400/15 blur-2xl" />
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-2xl text-white shadow-lg shadow-violet-950/60">
          <HiDevicePhoneMobile />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-200">
            <HiSparkles /> Official Android App
          </span>
          <span className="mt-1 block text-sm font-black text-white">
            Install Adnexa on your phone
          </span>
          <span className="mt-0.5 block text-[10px] font-medium text-slate-400">
            One tap access • Full-screen experience
          </span>
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-cyan-200 transition group-hover:bg-cyan-300/10 group-hover:text-white">
          <HiArrowDownTray />
        </span>
      </span>
    </button>
  );
};

export default InstallAppButton;
