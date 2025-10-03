"use client";
import { SidebarDemo } from "../components/dashboard/Sidebar";

const SponserDashboard = () => {
  const SiderbarMenu = [
    { label: "Event", path: "allevent", icon: null },
    { label: "Schedule", path: "schedule", icon: null },
    { label: "History", path: "history", icon: null },
  ];

  return <SidebarDemo SiderbarMenu={SiderbarMenu} />;
};

export default SponserDashboard;
