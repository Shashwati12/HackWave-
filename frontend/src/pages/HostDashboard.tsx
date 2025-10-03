import React from 'react'
import Sidebar from '../components/dashboard/Sidebar';

const HostDashboard = () => {
  const SiderbarMenu = [
    { label: "Event", path: "allevent" },
    { label: "Host Event", path: "hostEvent" },
    { label: "Schedule", path: "schedule" },
    { label: "History", path: "history" },
    { label: "Certificate", path: "certificate" },
  ];
  return (
    <div>
            <Sidebar SiderbarMenu ={SiderbarMenu} />
    </div>
  )
}

export default HostDashboard
