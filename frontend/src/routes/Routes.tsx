import type { AppRoute } from "../Type/RoutesType";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Profile from "../components/Host/HostProfile";
import Event from "../pages/EventPage";
import Hostevent from "../components/Host/Hostevent";
import Schedule from "../pages/Schedule";
import HistoryPage from "../pages/History";
import AnalyticsDashboard from "../pages/Analytics";
import Sponser from "../components/Host/Sponser";
import { Home } from "../pages/Home";
import EventPage from "../pages/EventPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";



export const Routes: AppRoute[] = [
  {
    path: "/",
    element: <Home/>,
    public: true,
  },
  {
    path: "/events",
    element: <EventPage />,
    public: true,
  },
  {
    path : '/login',
    element : <LoginPage/>,
    public: true,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    roles: ["User", "Host", "Vendor" , "Sponser" , "Admin"],
    children: [
      {
        path: "", 
        element: <Navigate to="/dashboard/profile" replace />,
      },
      {
        path: "profile",
        element: <Profile />,
        public: true,
        roles: ["User", "Host", "Vendor" , "Sponser" , "Admin"],
      },
      {
        path : 'event',
        element: <Event/>,
        roles: ["User", "Host", "Vendor" , "Sponser" , "Admin"],
      },
      {
        path : 'hostEvent',
        element :<Hostevent/>,
        roles: ["Host" , "Admin"]
      },
      {
        path : "schedule",
        element : <Schedule/>,
        roles: ["User", "Host", "Vendor" , "Sponser" , "Admin"],
      },
        {
        path : "history",
        element : <HistoryPage />,
        roles: ["User", "Host", "Vendor" , "Sponser" , "Admin"],
      },
      {
        path : "analytics",
        element : <AnalyticsDashboard />,
        roles: ["Host", "Vender" , "Sponser" ],
      },
      {
        path : "sponser",
        element : <Sponser/>,
        roles: [ "Host", "Admin"],
      },
    
    ],
  },
];