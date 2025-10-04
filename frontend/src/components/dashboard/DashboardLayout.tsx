"use client";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Sidebar, SidebarBody } from "../ui-components/sidebar";
import { IconLogout } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Define sidebar links for each role
const roleSidebarLinks = {
  User: [
    { label: "Profile", href: "/dashboard/profile", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Schedule", href: "/dashboard/schedule", icon: <Sparkles className="h-5 w-5" /> },
    { label: "History", href: "/dashboard/history", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Certificates", href: "/dashboard/certificates", icon: <Sparkles className="h-5 w-5" /> },
  ],
  Host: [
    { label: "Profile", href: "/dashboard/profile", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Host Event", href: "/dashboard/hostEvent", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Schedule", href: "/dashboard/schedule", icon: <Sparkles className="h-5 w-5" /> },
    { label: "History", href: "/dashboard/history", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <Sparkles className="h-5 w-5" /> },
  ],
  Vendor: [
    { label: "Profile", href: "/dashboard/profile", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Schedule", href: "/dashboard/schedule", icon: <Sparkles className="h-5 w-5" /> },
    { label: "History", href: "/dashboard/history", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <Sparkles className="h-5 w-5" /> },
  ],
  Sponsor: [
    { label: "Profile", href: "/dashboard/profile", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Schedule", href: "/dashboard/schedule", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <Sparkles className="h-5 w-5" /> },
  ],
  Admin: [
    { label: "Profile", href: "/dashboard/profile", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Host Event", href: "/dashboard/hostEvent", icon: <Sparkles className="h-5 w-5" /> },
    { label: "Schedule", href: "/dashboard/schedule", icon: <Sparkles className="h-5 w-5" /> },
    { label: "History", href: "/dashboard/history", icon: <Sparkles className="h-5 w-5" /> },
  ],
};

const DashboardLayout = () => {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

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

  const sidebarLinks = roleSidebarLinks[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
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
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col justify-between h-full relative">
          {/* Top: Logo and Links */}
          <div className="relative flex flex-col gap-6">
            <div className="flex justify-center mb-8">{open ? <Logo /> : <LogoIcon />}</div>
            <div className="flex flex-col gap-2">
              {sidebarLinks.map((link, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(!open && "flex justify-center")}
                >
                  <Link
                    to={link.href}
                    className="flex items-center gap-2 text-white hover:text-purple-300 p-2 rounded-md w-full"
                  >
                    {link.icon}
                    {open && <span>{link.label}</span>}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom: Avatar + Logout */}
          <div className="flex flex-col gap-4 items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={cn(
                "rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all",
                open ? "p-3" : "p-2"
              )}
            >
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2"
              >
                <img
                  src="https://assets.aceternity.com/manu.png"
                  className={cn("rounded-full ring-2 ring-purple-500/50", open ? "h-10 w-10" : "h-11 w-11")}
                  alt="Avatar"
                />
                {open && <span className="text-white">{user?.name}</span>}
              </Link>
            </motion.div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-300 hover:text-red-400 p-2 rounded-md w-full justify-center"
            >
              <IconLogout className="h-5 w-5" />
              {open && <span>Logout</span>}
            </button>
          </div>

          {/* Sidebar toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform z-50"
          >
            {open ? <ChevronLeft className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white" />}
          </button>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto h-full p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Logo components
export const Logo = () => (
  <Link
    to="/dashboard"
    className="flex items-center space-x-3 py-2 px-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group"
  >
    <div className="relative">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
    </div>
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
      <span className="text-sm font-bold text-white">Unify Event</span>
    </motion.div>
  </Link>
);

export const LogoIcon = () => (
  <Link
    to="/dashboard"
    className="flex items-center justify-center mx-auto rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group w-12 h-12"
  >
    <div className="relative">
      <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors group-hover:scale-110 transition-transform" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  </Link>
);

export default DashboardLayout;
