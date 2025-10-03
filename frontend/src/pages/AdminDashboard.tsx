"use client";
import React from 'react'
import { SidebarDemo } from "../components/dashboard/Sidebar";
import { IconUsers, IconBuildingStore, IconStar, IconUserPlus, IconPlus, IconUser } from "@tabler/icons-react";

const AdminDashboard = () => {
  const SiderbarMenu = [
    { label: "Users", path: "alluser", icon: <IconUsers className="h-5 w-5" /> },
    { label: "Stores", path: "allstore", icon: <IconBuildingStore className="h-5 w-5" /> },
    { label: "Ratings", path: "allrating", icon: <IconStar className="h-5 w-5" /> },
    { label: "Create User", path: "createUser", icon: <IconUserPlus className="h-5 w-5" /> },
    { label: "Create Store", path: "createStore", icon: <IconPlus className="h-5 w-5" /> },
  ];

  return <SidebarDemo SiderbarMenu={SiderbarMenu} />;
};

export default AdminDashboard;
