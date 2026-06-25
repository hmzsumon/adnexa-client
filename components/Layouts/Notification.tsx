"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiBell, HiCheckCircle, HiChevronDown, HiXMark } from "react-icons/hi2";

const DRAWER_ANIMATION_MS = 420;

type NotificationDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const NotificationDrawer = ({ open, onClose }: NotificationDrawerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const scrollPositionRef = useRef(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ────────── Clear Timer ──────────
  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  // ────────── Open Animation ──────────
  useEffect(() => {
    if (!open) return;

    clearCloseTimer();
    scrollPositionRef.current = window.scrollY;
    setIsMounted(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, [clearCloseTimer, open]);

  // ────────── Close Animation ──────────
  const handleClose = useCallback(() => {
    setIsVisible(false);
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setIsMounted(false);
      closeTimerRef.current = null;
      onClose();
    }, DRAWER_ANIMATION_MS);
  }, [clearCloseTimer, onClose]);

  // ────────── Portal Ready ──────────
  useEffect(() => {
    setPortalReady(true);

    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  // ────────── Body Scroll Lock Without Jump ──────────
  useEffect(() => {
    if (!isMounted) return;

    const currentScrollY = scrollPositionRef.current;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlScrollbarGutter =
      document.documentElement.style.scrollbarGutter;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyLeft = document.body.style.left;
    const previousBodyRight = document.body.style.right;
    const previousBodyWidth = document.body.style.width;
    const previousBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${currentScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.scrollbarGutter =
        previousHtmlScrollbarGutter;

      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.left = previousBodyLeft;
      document.body.style.right = previousBodyRight;
      document.body.style.width = previousBodyWidth;
      document.body.style.paddingRight = previousBodyPaddingRight;

      window.scrollTo(0, currentScrollY);
    };
  }, [isMounted]);

  // ────────── Escape Key Close ──────────
  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, isMounted]);

  if (!portalReady || !isMounted) return null;

  const drawerMarkup = (
    <div className="fixed inset-0 z-[10000] h-dvh overflow-hidden overscroll-none">
      {/* ────────── App Width Wrapper ────────── */}
      <div className="relative mx-auto h-dvh max-w-[460px] overflow-hidden">
        {/* ────────── Backdrop ────────── */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close notifications"
          className={`absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ────────── Notification Panel ────────── */}
        <aside
          className={`absolute inset-y-0 right-0 h-dvh w-[88%] max-w-[390px] overflow-hidden rounded-l-[32px] border-l border-cyan-400/10 bg-[#060823] shadow-2xl shadow-black/80 transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-95"
          }`}
        >
          <div className="flex h-full flex-col overflow-hidden">
            {/* ────────── Sticky Header ────────── */}
            <div className="sticky top-0 z-20 border-b border-white/10 bg-[#060823]/95 px-5 pb-4 pt-6 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <HiBell className="text-3xl" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white">
                      Notifications
                    </h2>
                    <p className="text-sm font-bold text-slate-400">
                      Latest account updates
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-slate-300 transition hover:bg-white/12"
                  aria-label="Close"
                >
                  <HiXMark className="text-2xl" />
                </button>
              </div>
            </div>

            {/* ────────── Notification List ────────── */}
            <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5 pb-28">
              <div className="rounded-[26px] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/12 via-indigo-950/80 to-violet-950/50 p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                    <HiCheckCircle className="text-3xl" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-black text-white">
                          USDT Deposit Successful
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          Your deposit request has been approved successfully.
                        </p>
                      </div>

                      <HiChevronDown className="mt-1 shrink-0 text-xl text-slate-400" />
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                        Status
                      </p>
                      <p className="mt-1 text-sm font-black text-emerald-300">
                        Completed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ────────── Empty Space / More Items Area ────────── */}
              <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] p-5 text-center">
                <p className="text-sm font-bold text-slate-400">
                  No more notifications right now.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  return createPortal(drawerMarkup, document.body);
};

export default NotificationDrawer;
