import type { AppRoute } from "../Type/RoutesType";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import Hostevent from "../components/Host/Hostevent";
import Schedule from "../pages/Schedule";
import History from "../pages/History";
import Analytics from "../components/Host/Analytics";
import Sponser from "../components/Host/Sponser";
import { Home } from "../pages/Home";
import EventPage from "../pages/EventPage";


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
    path: "/dashboard",
    element: <DashboardLayout />,
    roles: ["User", "Host", "Vender" , "Sponser" , "Admin"],
    children: [
      {
        path: "", 
        element: <Navigate to="/dashboard/profile" replace />,
      },
      {
        path: "profile",
        element: <Profile />,
        roles: ["User", "Host", "Vender" , "Sponser" , "Admin"],
      },
      {
        path : 'event',
        element: <Event/>,
        roles: ["User", "Host", "Vender" , "Sponser" , "Admin"],
      },
      {
        path : 'hostEvent',
        element :<Hostevent/>,
        roles: ["Host" , "Admin"]
      },
      {
        path : "schedule",
        element : <Schedule/>,
        roles: ["User", "Host", "Vender" , "Sponser" , "Admin"],
      },
        {
        path : "history",
        element : <History/>,
        roles: ["User", "Host", "Vender" , "Sponser" , "Admin"],
      },
      {
        path : "analytics",
        element : <Analytics/>,
        roles: ["User", "Host", "Vender" , "Sponser" , "Admin"],
      },
      {
        path : "sponser",
        element : <Sponser/>,
        roles: [ "Host", "Admin"],
      },
    
    ],
  },
];
