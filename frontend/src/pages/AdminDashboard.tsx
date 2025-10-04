"use client";
import {
  IconUsers,
  IconBuildingStore,
  IconStar,
  IconUserPlus,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";

const AdminDashboard = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p className="mb-4">Manage users, stores, ratings, and create new accounts or stores here.</p>
    </div>
  );
};

// Sidebar menu
AdminDashboard.sidebarMenu = [
  { label: "Users", href: "/dashboard/alluser", icon: <IconUsers className="h-5 w-5" /> },
  { label: "Stores", href: "/dashboard/allstore", icon: <IconBuildingStore className="h-5 w-5" /> },
  { label: "Ratings", href: "/dashboard/allrating", icon: <IconStar className="h-5 w-5" /> },
  { label: "Create User", href: "/dashboard/createUser", icon: <IconUserPlus className="h-5 w-5" /> },
  { label: "Create Store", href: "/dashboard/createStore", icon: <IconPlus className="h-5 w-5" /> },
  { label: "Profile", href: "/dashboard/AdminProfile", icon: <IconUser className="h-5 w-5" /> },
];

export default AdminDashboard;
