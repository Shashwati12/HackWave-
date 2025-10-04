"use client";
import { IconCalendarEvent, IconPlus, IconClock, IconHistory } from "@tabler/icons-react";

const VendorDashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to Vendor Dashboard</h1>
      <p className="mb-4">Here you can host events, view your schedule, and manage event history.</p>
    </div>
  );
};

// Sidebar menu
VendorDashboard.sidebarMenu = [
  { label: "Events", href: "/dashboard/allevent", icon: <IconCalendarEvent className="h-5 w-5" /> },
  { label: "Host Event", href: "/dashboard/hostEvent", icon: <IconPlus className="h-5 w-5" /> },
  { label: "Schedule", href: "/dashboard/schedule", icon: <IconClock className="h-5 w-5" /> },
  { label: "History", href: "/dashboard/history", icon: <IconHistory className="h-5 w-5" /> },
];

export default VendorDashboard;
