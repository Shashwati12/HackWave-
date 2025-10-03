import SidebarMenu from "../Profile/SidebarMenu";
import { Outlet, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const location = useLocation();
  const isProfilePage = location.pathname === "/Dashboard/profile";

  return (
    <div className="flex min-h-screen bg-amber-50">
      <SidebarMenu />
      <div
        className={`ml-56  w-full bg-amber-50 ${
          isProfilePage ? "" : "pt-14"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
