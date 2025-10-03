import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import UserDashboard from "../../pages/StudetDashboard";
import HostDashboard from "../../pages/HostDashboard";
import VenderDashboard from "../../pages/VenderDashboard";
import SponserDashboard from "../../pages/SponserDashboard";
import AdminDashboard from "../../pages/AdminDashboard";


const DashboardLayout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/Dashboard/profile";
  const { user, loading } = useAuth(); // ✅ fixed destructuring

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const SidebarComponent = 

    user?.role === "student" ? <UserDashboard /> :
    user?.role === "Host" ? <HostDashboard /> :
    user?.role === "Vender" ? <VenderDashboard /> :
    user?.role === "Sponser" ? <SponserDashboard /> :
    user?.role === "Admin" ? <AdminDashboard /> :
    <div>No user</div>;

  return (
    <div className="flex min-h-screen bg-amber-50">
      {SidebarComponent}
      <div className={`ml-56 w-full bg-amber-50 ${isProfilePage ? "" : "pt-14"}`}>
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
