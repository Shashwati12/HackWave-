
import Sidebar from '../components/dashboard/Sidebar';


const StudetDashboard = () => {

        const SiderbarMenu = [
    { label: "Event", path: "allevent" },
    { label: "Schedule", path: "schedule" },
    { label: "History", path: "history" },
    { label: "Certificate", path: "certificate" },
  ];
  return (
    <div>
            <Sidebar SiderbarMenu={SiderbarMenu} />
    </div>
  )
}

export default StudetDashboard
