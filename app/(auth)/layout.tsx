import UserNavbar from "@/components/Layouts/UserNavbar";
import MobileBottomNav from "@/components/MobileApp/MobileBottomNav";
import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="adnexa-app-bg min-h-screen">
      {/* ────────── Mobile App Shell ────────── */}
      <div className="relative mx-auto min-h-screen max-w-[460px] overflow-hidden border-x border-white/5 bg-[#05071c]/95 shadow-2xl shadow-black/60">
        <UserNavbar />

        {/* ────────── Page Content Area ────────── */}
        <main className="relative z-10 px-4 pb-28 pt-24">{children}</main>

        {/* ────────── Fixed Bottom Navigation ────────── */}
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default AuthLayout;
