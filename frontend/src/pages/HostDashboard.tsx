"use client";
import {
  IconCalendarEvent,
  IconPlus,
  IconClock,
  IconHistory,
  IconCertificate,
} from "@tabler/icons-react";

const HostDashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to Host Dashboard</h1>
      <p className="mb-4">
        Here you can manage your events, host new events, view your schedule, history, and certificates.
      </p>
    </div>
  );
};

// Attach sidebar menu
HostDashboard.sidebarMenu = [
  { label: "Events", href: "/events", icon: <IconCalendarEvent className="h-5 w-5" /> },
  { label: "Host Event", href: "/dashboard/hostEvent", icon: <IconPlus className="h-5 w-5" /> },
  { label: "Schedule", href: "/dashboard/schedule", icon: <IconClock className="h-5 w-5" /> },
  { label: "History", href: "/dashboard/history", icon: <IconHistory className="h-5 w-5" /> },
];

export default HostDashboard;
