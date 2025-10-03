import React from 'react'
import Sidebar from '../components/dashboard/Sidebar';

const AdminDashboard = () => {
     const SiderbarMenu = [
    { label: "Users", path: "alluser" },
    { label: "Stores", path: "allstore" },
    { label: "Ratings", path: "allrating" },
    { label: "Create User", path: "createUser" },
    { label: "Create Store", path: "createStore" },
  ];
  return (
    <div>
            <Sidebar SiderbarMenu={SiderbarMenu}/>
    </div>
  )
}

export default AdminDashboard
