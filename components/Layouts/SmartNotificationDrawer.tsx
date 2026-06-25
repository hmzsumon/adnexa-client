"use client";

import ioBaseUrl from "@/config/baseUrl";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import {
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notify/notificationApi";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  HiBell,
  HiCheckCircle,
  HiChevronDown,
  HiClock,
  HiXMark,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";

const DRAWER_ANIMATION_MS = 420;

type NotificationItem = {
  _id: string;
  title?: string;
  message?: string;
  createdAt?: string;
  is_read?: boolean;
};

const getNotificationList = (payload: any): NotificationItem[] => {
  if (Array.isArray(payload?.notifications)) return payload.notifications;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

const formatDate = (date?: string) => {
  if (!date) return "Just now";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const SmartNotificationDrawer = () => {
  const { user } = useSelector((state: any) => state.auth);

  const { data, isSuccess, refetch } = useGetNotificationsQuery(undefined);
  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [loadUser, setLoadUser] = useState(false);
  const [openNotificationId, setOpenNotificationId] = useState<string | null>(
    null,
  );

  const scrollPositionRef = useRef(0);

  // ────────── Close Animation Timer Ref ──────────
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLoadUserQuery(undefined, { skip: !loadUser });

  const notifications = useMemo(() => getNotificationList(data), [data]);
  const count = notifications.length;
  const notificationCount = count > 99 ? "99+" : count;

  // ────────── Clear Close Timer Handler ──────────
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
      setOpenNotificationId(null);
      closeTimerRef.current = null;

      if (isSuccess && notifications.length > 0) {
        updateNotificationStatus(undefined);
      }
    }, DRAWER_ANIMATION_MS);
  }, [
    clearCloseTimer,
    isSuccess,
    notifications.length,
    updateNotificationStatus,
  ]);

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

  // ────────── Realtime Notification Socket Handler ──────────
  useEffect(() => {
    const socket = socketIOClient(ioBaseUrl, {
      transports: ["websocket", "polling"],
    });

    socket.on("user-notification", (notification: any) => {
      if (notification?.user_id === user?._id) {
        setLoadUser(true);
        refetch();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [refetch, user?._id]);

  const drawerMarkup = isMounted ? (
    <div className="fixed inset-0 z-[10000] h-dvh overflow-hidden overscroll-none">
      {/* ────────── Drawer App Width Wrapper ────────── */}
      <div className="relative mx-auto h-dvh max-w-[460px] overflow-hidden">
        {/* ────────── Drawer Backdrop Layer ────────── */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close notifications backdrop"
          className={`absolute inset-0 bg-black/65 backdrop-blur-md transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ────────── Right Side Notification Drawer ────────── */}
        <aside
          className={`absolute inset-y-0 right-0 h-dvh w-[88%] max-w-[390px] overflow-hidden rounded-l-[32px] border-l border-cyan-400/10 bg-[#060823] text-white shadow-2xl shadow-black/80 transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-95"
          }`}
        >
          <div className="relative flex h-full flex-col overflow-hidden">
            <div className="pointer-events-none absolute -right-24 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 top-1/3 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />

            {/* ────────── Drawer Header Section ────────── */}
            <div className="relative z-20 border-b border-white/10 bg-[#060823]/95 px-5 pb-4 pt-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <HiBell className="text-2xl" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">Notifications</h2>
                    <p className="text-xs font-bold text-slate-500">
                      Latest account updates
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-white/10 bg-white/[0.06] text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-200"
                  aria-label="Close notifications"
                >
                  <HiXMark className="text-2xl" />
                </button>
              </div>
            </div>

            {/* ────────── Drawer Scroll Body ────────── */}
            <div className="adnexa-scrollbar relative z-10 flex-1 overflow-y-auto overscroll-contain px-3 py-5 pb-28">
              {/* ────────── Notification Summary Card ────────── */}
              <section className="relative overflow-hidden rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-indigo-950/85 to-cyan-500/10 p-4">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/25 blur-2xl" />

                <p className="relative text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                  Adnexa Alerts
                </p>

                <h3 className="relative mt-2 text-sm font-black">
                  {count} Updates
                </h3>

                <p className="relative mt-1 text-xs font-bold text-slate-400">
                  Tap any notification to read details.
                </p>
              </section>

              {/* ────────── Notification List Section ────────── */}
              <section className="relative mt-5 space-y-3">
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const isExpanded = openNotificationId === notification._id;

                    return (
                      <button
                        type="button"
                        key={notification._id}
                        onClick={() =>
                          setOpenNotificationId(
                            isExpanded ? null : notification._id,
                          )
                        }
                        className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] p-4 text-left transition hover:border-cyan-400/25 hover:bg-cyan-400/[0.08]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                            <HiCheckCircle className="text-2xl" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="text-base font-black text-white">
                                {notification.title || "Notification"}
                              </h4>

                              <HiChevronDown
                                className={`mt-0.5 shrink-0 text-xl text-slate-400 transition ${
                                  isExpanded ? "rotate-180 text-cyan-300" : ""
                                }`}
                              />
                            </div>

                            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
                              <HiClock className="text-sm" />
                              {formatDate(notification.createdAt)}
                            </div>

                            <p
                              className={`${
                                isExpanded ? "line-clamp-none" : "line-clamp-2"
                              } mt-3 text-sm font-semibold leading-6 text-slate-400`}
                            >
                              {notification.message ||
                                "No details found for this notification."}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/[0.045] p-8 text-center">
                    <Image
                      src="/no-notifications.webp"
                      width={160}
                      height={160}
                      alt="No notifications"
                      className="mx-auto opacity-90"
                    />

                    <h3 className="mt-4 text-xl font-black text-white">
                      No notifications
                    </h3>

                    <p className="mt-2 text-sm font-bold text-slate-500">
                      Your latest Adnexa alerts will appear here.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </aside>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* ────────── Notification Trigger Button ────────── */}
      <button
        type="button"
        onClick={handleOpen}
        className="adnexa-icon-button relative"
        aria-label="Open notifications"
      >
        <HiBell className="text-2xl" />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-black text-white ring-2 ring-[#05071c]">
            {notificationCount}
          </span>
        )}
      </button>

      {/* ────────── Notification Drawer Portal ────────── */}
      {portalReady ? createPortal(drawerMarkup, document.body) : null}
    </>
  );
};

export default SmartNotificationDrawer;
