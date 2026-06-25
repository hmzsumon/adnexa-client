"use client";

import AppBrand from "@/components/MobileApp/AppBrand";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import { useEffect, useState } from "react";
import SmallDeviceDrawer from "./SmallDeviceDrawer";
import SmartNotificationDrawer from "./SmartNotificationDrawer";
import UserProfileMenu from "./UserProfileMenu";

const UserNavbar = () => {
  useLoadUserQuery();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] mx-auto max-w-[460px] px-4 pt-4 pb-3 transition-all duration-300 ${
        isScrolled
          ? "border-b border-cyan-400/10 bg-[#05071c]/95 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* ────────── Scrolled Solid Background Glow ────────── */}
      {isScrolled && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-16 -top-12 h-36 w-36 rounded-full bg-violet-500/12 blur-3xl" />
        </div>
      )}

      {/* ────────── Top App Navigation ────────── */}
      <div className="relative z-10 flex items-center justify-between">
        <SmallDeviceDrawer />

        <div className="scale-90">
          <AppBrand compact />
        </div>

        <div className="flex items-center gap-2">
          <SmartNotificationDrawer />
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
