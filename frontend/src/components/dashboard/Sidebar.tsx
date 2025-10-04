"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui-components/sidebar";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarMenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarDemoProps {
  SiderbarMenu: SidebarMenuItem[];
  children?: React.ReactNode;
}

export function SidebarDemo({ SiderbarMenu, children }: SidebarDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sidebar */}
      <div className="relative z-20 flex-shrink-0">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 relative">
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border-r border-white/10" />
            
            {/* Content */}
            <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {/* Logo Section */}
              <div className="mb-8 flex justify-center">
                {open ? <Logo /> : <LogoIcon />}
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {SiderbarMenu.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(!open && "flex justify-center")}
                  >
                    <SidebarLink
                      link={{
                        label: link.label,
                        href: link.path,
                        icon: (
                          <div className={cn(
                            "rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border border-purple-500/30 group-hover:border-purple-500/50 transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/20",
                            open ? "w-10 h-10" : "w-11 h-11"
                          )}>
                            {link.icon}
                          </div>
                        ),
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Optional: Premium Section */}
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto mb-4 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20"
                >
                  <div className="flex items-center gap-2 text-purple-300 text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">Premium Features</span>
                  </div>
                  <p className="text-[#B0B3C0] text-xs mt-1">
                    Unlock advanced analytics & insights
                  </p>
                </motion.div>
              )}
            </div>

            {/* User Profile Section */}
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
                    label: "User",
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
                        <div className={cn(
                          "absolute bg-green-500 rounded-full border-2 border-black",
                          open ? "-bottom-1 -right-1 w-4 h-4" : "-bottom-0.5 -right-0.5 w-3 h-3"
                        )}></div>
                      </div>
                    ),
                  }}
                />
              </motion.div>
            </div>

            {/* Toggle Button */}
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

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 overflow-y-auto h-full p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// Sidebar Logo
export const Logo = () => (
  <a
    href="#"
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
      <span className="text-xs text-purple-300">Premium</span>
    </motion.div>
  </a>
);

export const LogoIcon = () => (
  <a
    href="#"
    className="flex items-center justify-center mx-auto rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all group w-12 h-12"
  >
    <div className="relative">
      <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors group-hover:scale-110 transition-transform" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  </a>
);
