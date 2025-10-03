"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui-components/sidebar";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

interface SidebarMenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarDemoProps {
  SiderbarMenu: SidebarMenuItem[];
}

export function SidebarDemo({ SiderbarMenu }: SidebarDemoProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("flex min-h-screen overflow-hidden bg-blue-950 border border-cyan-500")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {SiderbarMenu.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={{
                    label: link.label,
                    href: link.path,
                    icon: link.icon,
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Admin",
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
    </div>
  );
}

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
