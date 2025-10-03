import React from 'react'
import Sidebar from '../components/dashboard/Sidebar';

const SponserDashboard = () => {
 const SiderbarMenu = [
    { label: "Event", path: "allevent" },
    { label: "Schedule", path: "schedule" },
    { label: "History", path: "history" },
  ];
  return (
    <div>
            <Sidebar SiderbarMenu ={SiderbarMenu} />
    </div>
  )
}

export default SponserDashboard
