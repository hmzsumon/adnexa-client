"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiBars3 } from "react-icons/hi2";
import UserSidebar from "./UserSidebar";

const DRAWER_ANIMATION_MS = 460;

const SmallDeviceDrawer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const scrollPositionRef = useRef(0);

  // ────────── Close Animation Timer Ref ──────────
  // Browser এ setTimeout number return করে, তাই NodeJS.Timeout ব্যবহার করা যাবে না
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ────────── Clear Close Timer ──────────
  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) return;

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  // ────────── Open Drawer Handler ──────────
  const handleOpen = useCallback(() => {
    clearCloseTimer();

    scrollPositionRef.current = window.scrollY;
    setIsMounted(true);

    // Drawer mount হওয়ার পর animation start হবে
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, [clearCloseTimer]);

  // ────────── Close Drawer Handler ──────────
  const handleClose = useCallback(() => {
    setIsVisible(false);
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setIsMounted(false);
      closeTimerRef.current = null;
    }, DRAWER_ANIMATION_MS);
  }, [clearCloseTimer]);

  // ────────── Portal Ready Handler ──────────
  useEffect(() => {
    setPortalReady(true);

    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  // ────────── Body Scroll Lock Without Layout Jump ──────────
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

  // ────────── Escape Key Close Handler ──────────
  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, isMounted]);

  const drawerMarkup = isMounted ? (
    <div className="fixed inset-0 z-[9999] h-dvh overflow-hidden overscroll-none">
      {/* ────────── Drawer App Width Wrapper ────────── */}
      <div className="relative mx-auto h-dvh max-w-[460px] overflow-hidden">
        {/* ────────── Drawer Backdrop ────────── */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close drawer overlay"
          className={`absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ────────── Animated Drawer Panel ────────── */}
        <aside
          className={`absolute inset-y-0 left-0 h-dvh w-[88%] max-w-[390px] overflow-hidden rounded-r-[32px] border-r border-cyan-400/10 bg-[#060823] shadow-2xl shadow-black/80 transition-[transform,opacity] duration-[460ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-95"
          }`}
        >
          <UserSidebar handleClose={handleClose} />
        </aside>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* ────────── Menu Open Button ────────── */}
      <button
        type="button"
        onClick={handleOpen}
        className="adnexa-icon-button"
        aria-label="Open menu"
      >
        <HiBars3 className="text-2xl" />
      </button>

      {/* ────────── Mobile Drawer Portal ────────── */}
      {portalReady ? createPortal(drawerMarkup, document.body) : null}
    </>
  );
};

export default SmallDeviceDrawer;
