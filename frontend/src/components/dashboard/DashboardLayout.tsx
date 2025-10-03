"use client";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { Sidebar, SidebarBody, SidebarLink } from "../ui-components/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "../../lib/utils";

// Role-based dashboard components
import UserDashboard from "../../pages/StudentDashboard";
import HostDashboard from "../../pages/HostDashboard";
import VenderDashboard from "../../pages/VendorDashboard";
import SponserDashboard from "../../pages/SponserDashboard";
import AdminDashboard from "../../pages/AdminDashboard";

const DashboardLayout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/Dashboard/profile";
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Determine which dashboard to render
  const RoleDashboard =
    user?.role === "student"
      ? UserDashboard
      : user?.role === "Host"
      ? HostDashboard
      : user?.role === "Vender"
      ? VenderDashboard
      : user?.role === "Sponser"
      ? SponserDashboard
      : user?.role === "Admin"
      ? AdminDashboard
      : null;

  // Sidebar links
  const links = [
    { label: "Dashboard", href: "#", icon: <IconBrandTabler className="h-5 w-5 text-white" /> },
    { label: "Profile", href: "#", icon: <IconUserBolt className="h-5 w-5 text-white" /> },
    { label: "Settings", href: "#", icon: <IconSettings className="h-5 w-5 text-white" /> },
    { label: "Logout", href: "#", icon: <IconArrowLeft className="h-5 w-5 text-white" /> },
  ];

  return (
    <div className={cn("flex w-full h-screen overflow-hidden bg-black border border-cyan-500")}>
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.name || "User",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content area */}
      <div className={`flex-1 ${isProfilePage ? "" : "pt-14"} p-4 md:p-10 overflow-y-auto`}>
        {RoleDashboard ? <RoleDashboard /> : <div>No user dashboard available</div>}
        <Outlet />
      </div>
    </div>
  );
};

// Sidebar logo components
export const Logo = () => (
  <a href="#" className="flex items-center space-x-2 py-1 text-sm font-medium text-white">
    <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Acet Labs
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a href="#" className="flex items-center space-x-2 py-1 text-sm font-medium text-white">
    <div className="h-5 w-6 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
  </a>
);

export default DashboardLayout;
