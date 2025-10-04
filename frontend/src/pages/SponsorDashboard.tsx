"use client";
import { IconCalendarEvent, IconClock, IconHistory } from "@tabler/icons-react";

const SponsorDashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to Sponsor Dashboard</h1>
      <p className="mb-4">Here you can view and manage sponsored events, schedules, and history.</p>
    </div>
  );
};

// Sidebar menu
SponsorDashboard.sidebarMenu = [
  { label: "Event", href: "/dashboard/allevent", icon: <IconCalendarEvent className="h-5 w-5" /> },
  { label: "Schedule", href: "/dashboard/schedule", icon: <IconClock className="h-5 w-5" /> },
  { label: "History", href: "/dashboard/history", icon: <IconHistory className="h-5 w-5" /> },
];

export default SponsorDashboard;
