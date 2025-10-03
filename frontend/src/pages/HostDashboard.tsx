"use client";
import { SidebarDemo } from "../components/dashboard/Sidebar";
import { IconCalendarEvent, IconPlus, IconClock, IconHistory, IconCertificate } from "@tabler/icons-react";

const HostDashboard = () => {
  const SiderbarMenu = [
    { label: "Event", path: "allevent", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { label: "Host Event", path: "hostEvent", icon: <IconPlus className="h-5 w-5" /> },
    { label: "Schedule", path: "schedule", icon: <IconClock className="h-5 w-5" /> },
    { label: "History", path: "history", icon: <IconHistory className="h-5 w-5" /> },
    { label: "Certificate", path: "certificate", icon: <IconCertificate className="h-5 w-5" /> },
  ];

  return <SidebarDemo SiderbarMenu={SiderbarMenu} />;
};

export default HostDashboard;
