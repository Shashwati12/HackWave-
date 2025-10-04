"use client";
import {
  IconCalendarEvent,
  IconClock,
  IconHistory,
  IconCertificate,
} from "@tabler/icons-react";

const StudentDashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to Student Dashboard</h1>
      <p className="mb-4">Here you can view your events, schedule, history, and certificates.</p>
    </div>
  );
};

// Static property to define sidebar menu
StudentDashboard.sidebarMenu = [
  {
    label: "Events",
    href: "/events",
    icon: <IconCalendarEvent className="h-5 w-5" />,
  },
  {
    label: "Schedule",
    href: "/dashboard/schedule",
    icon: <IconClock className="h-5 w-5" />,
  },
  {
    label: "History",
    href: "/dashboard/history",
    icon: <IconHistory className="h-5 w-5" />,
  },
  {
    label: "Certificates",
    href: "/dashboard/certificate",
    icon: <IconCertificate className="h-5 w-5" />,
  },
];

export default StudentDashboard;
