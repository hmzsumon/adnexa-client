"use client";

import {
  ADNEXA_APK_URL,
  DOWNLOAD_REMINDER_DELAY_MS,
  INSTALL_PROMPT_DELAY_MS,
  LATER_REMINDER_DELAY_MS,
  OPEN_INSTALL_PROMPT_EVENT,
  delayInstallPrompt,
  getNextInstallPromptAt,
  isAndroidBrowser,
  isAppMarkedInstalled,
  isIosBrowser,
  isRunningAsInstalledApp,
  markAppInstalled,
} from "@/lib/androidAppInstall";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HiArrowDownTray,
  HiCheckCircle,
  HiDevicePhoneMobile,
  HiShieldCheck,
  HiSparkles,
  HiXMark,
} from "react-icons/hi2";

type PromptStep = "intro" | "download-started";

const triggerApkDownload = () => {
  const downloadLink = document.createElement("a");
  downloadLink.href = ADNEXA_APK_URL;
  downloadLink.download = "adnexa.apk";
  downloadLink.rel = "noopener";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
};

const AndroidInstallPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<PromptStep>("intro");

  useEffect(() => {
    let promptTimer: ReturnType<typeof setTimeout> | undefined;

    const openPrompt = () => {
      if (isIosBrowser() || isRunningAsInstalledApp()) return;
      setStep("intro");
      setIsOpen(true);
    };

    window.addEventListener(OPEN_INSTALL_PROMPT_EVENT, openPrompt);

    if (isRunningAsInstalledApp()) {
      markAppInstalled();
    } else if (
      isAndroidBrowser() &&
      !isAppMarkedInstalled() &&
      Date.now() >= getNextInstallPromptAt()
    ) {
      promptTimer = setTimeout(openPrompt, INSTALL_PROMPT_DELAY_MS);
    }

    return () => {
      window.removeEventListener(OPEN_INSTALL_PROMPT_EVENT, openPrompt);
      if (promptTimer) clearTimeout(promptTimer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      delayInstallPrompt(LATER_REMINDER_DELAY_MS);
      setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLater = () => {
    delayInstallPrompt(LATER_REMINDER_DELAY_MS);
    setIsOpen(false);
  };

  const handleDownload = () => {
    delayInstallPrompt(DOWNLOAD_REMINDER_DELAY_MS);
    triggerApkDownload();
    setStep("download-started");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-[#020316]/80 p-2 backdrop-blur-md sm:items-center sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) handleLater();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="adnexa-install-title"
        className="relative w-full max-w-[430px] overflow-hidden rounded-[28px] border border-violet-300/20 bg-[#070a24] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-24 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />

        <button
          type="button"
          onClick={handleLater}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label="Install later"
        >
          <HiXMark />
        </button>

        <div className="relative z-10 p-5 pb-6 sm:p-7">
          <div className="flex items-start gap-4 pr-9">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-[22px] bg-cyan-400/35 blur-xl" />
              <Image
                src="/icons/adnexa-app-icon.png"
                alt="Adnexa Android app icon"
                width={82}
                height={82}
                priority
                className="relative h-[76px] w-[76px] rounded-[22px] border border-white/15 shadow-2xl"
              />
              <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#070a24] bg-emerald-400 text-[#03120d]">
                <HiCheckCircle className="text-lg" />
              </span>
            </div>

            <div className="min-w-0 pt-1">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200">
                <HiSparkles /> Official Android App
              </div>
              <h2
                id="adnexa-install-title"
                className="text-2xl font-black tracking-tight text-white"
              >
                {step === "intro" ? "Install Adnexa" : "Download started"}
              </h2>
              <p className="mt-1 text-xs font-medium leading-5 text-slate-400">
                Fast, full-screen access from your Android home screen.
              </p>
            </div>
          </div>

          {step === "intro" ? (
            <>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  ["2.4 MB", "Lightweight"],
                  ["Android", "Mobile app"],
                  ["Signed", "Official APK"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/5 bg-white/[0.035] px-2 py-3 text-center"
                  >
                    <p className="text-xs font-black text-white">{value}</p>
                    <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-3 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.055] p-3.5">
                <HiShieldCheck className="mt-0.5 shrink-0 text-2xl text-emerald-300" />
                <p className="text-[11px] font-medium leading-5 text-slate-300">
                  Downloaded directly from{" "}
                  <span className="font-bold text-emerald-200">
                    www.adnexa.art
                  </span>
                  . Android will ask you to confirm before installation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                autoFocus
                className="mt-5 flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 p-1 pl-5 text-left shadow-[0_16px_40px_rgba(99,102,241,.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(34,211,238,.3)] active:translate-y-0"
              >
                <span>
                  <span className="block text-sm font-black text-white">
                    Download & Install Now
                  </span>
                  <span className="mt-0.5 block text-[10px] font-semibold text-white/70">
                    Free Android download
                  </span>
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl text-white">
                  <HiArrowDownTray />
                </span>
              </button>

              <button
                type="button"
                onClick={handleLater}
                className="mt-3 w-full py-2 text-xs font-bold text-slate-400 transition hover:text-white"
              >
                Maybe later
              </button>
            </>
          ) : (
            <>
              <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-2xl text-cyan-200">
                    <HiDevicePhoneMobile />
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">
                      Complete these 3 steps
                    </p>
                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      Your browser may show an APK safety notice.
                    </p>
                  </div>
                </div>

                <ol className="mt-4 space-y-3">
                  {[
                    "Open adnexa.apk from your browser downloads.",
                    'Allow "Install unknown apps" if Android asks.',
                    "Tap Install, then open the Adnexa app.",
                  ].map((instruction, index) => (
                    <li
                      key={instruction}
                      className="flex gap-3 text-[11px] font-medium leading-5 text-slate-300"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-[10px] font-black text-violet-200">
                        {index + 1}
                      </span>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={triggerApkDownload}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-black text-slate-200 transition hover:bg-white/10"
                >
                  Download again
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-3 text-xs font-black text-white shadow-lg shadow-violet-950/50"
                >
                  Got it
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default AndroidInstallPrompt;
