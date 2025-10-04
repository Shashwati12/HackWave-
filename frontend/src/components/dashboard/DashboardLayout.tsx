"use client";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Sidebar, SidebarBody, SidebarLink } from "../ui-components/sidebar";
import { IconLogout } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Role-based dashboards (used only for sidebarLinks)
import UserDashboard from "../../pages/StudentDashboard";
import HostDashboard from "../../pages/HostDashboard";
import VendorDashboard from "../../pages/VendorDashboard";
import SponsorDashboard from "../../pages/SponsorDashboard";
import AdminDashboard from "../../pages/AdminDashboard";

const DashboardLayout = () => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <Sparkles className="w-8 h-8 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      </div>
    );
  }

  // Determine role-based sidebar menu
  const RoleDashboard =
  user?.role === "User"
    ? UserDashboard
    : user?.role === "Host"
    ? HostDashboard
    : user?.role === "Vendor"
    ? VendorDashboard
    : user?.role === "Sponsor"
    ? SponsorDashboard
    : user?.role === "Admin"
    ? AdminDashboard
    : null;


  const sidebarLinks = RoleDashboard?.sidebarMenu || [];

  const logoutLink = {
  label: "Logout",
  href: "#", // prevent navigation
  icon: <IconLogout className="h-5 w-5 text-red-300" />,
  onClick: () => {
    logout(); // ✅ call context logout
  },
};

  return (
    <div className="relative flex h-screen overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Sidebar */}
      <div className="relative z-20 flex-shrink-0">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border-r border-white/10" />

            <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                {open ? <Logo /> : <LogoIcon />}
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {sidebarLinks.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(!open && "flex justify-center")}
                  >
                    <SidebarLink link={link} />
                  </motion.div>
                ))}
              </div>

              {/* Logout Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className={cn("mt-4", !open && "flex justify-center")}
              >
                <SidebarLink link={logoutLink}  />
              </motion.div>
            </div>

            {/* User Avatar Link */}
            <div className={cn("relative", !open && "flex justify-center")}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all",
                  open ? "p-3" : "p-2"
                )}
              >
                <SidebarLink
                  link={{
                    label: user?.name || "User",
                    href: "/dashboard/profile",
                    icon: (
                      <div className="relative">
                        <img
                          src="https://assets.aceternity.com/manu.png"
                          className={cn(
                            "rounded-full ring-2 ring-purple-500/50",
                            open ? "h-10 w-10" : "h-11 w-11"
                          )}
                          alt="Avatar"
                        />
                        <div
                          className={cn(
                            "absolute bg-green-500 rounded-full border-2 border-black",
                            open
                              ? "-bottom-1 -right-1 w-4 h-4"
                              : "-bottom-0.5 -right-0.5 w-3 h-3"
                          )}
                        ></div>
                      </div>
                    ),
                  }}
                />
              </motion.div>
            </div>

            {/* Sidebar Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform z-50"
            >
              {open ? (
                <ChevronLeft className="w-4 h-4 text-white" />
              ) : (
                <ChevronRight className="w-4 h-4 text-white" />
              )}
            </button>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Routed Page Content */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto h-full p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          <Outlet /> {/* ✅ Always render nested routes here */}
        </div>
      </div>
    </div>
  );
};

// Logo Components
export const Logo = () => (
  <a
    href="/dashboard"
    className="flex items-center space-x-3 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
  >
    <div className="relative">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
    </div>
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col"
    >
      <span className="text-sm font-bold text-white">EventHub</span>
    </motion.div>
  </a>
);

export const LogoIcon = () => (
  <a
    href="/dashboard"
    className="flex items-center justify-center mx-auto rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group w-12 h-12"
  >
    <div className="relative">
      <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors group-hover:scale-110 transition-transform" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  </a>
);

export default DashboardLayout;
