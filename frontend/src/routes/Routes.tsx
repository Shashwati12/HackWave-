import type { AppRoute } from "../Type/RoutesType";
import { Navigate } from "react-router-dom";
import Event from "../pages/EventPage";
import Hostevent from "../components/Host/Hostevent";
import Schedule from "../pages/Schedule";
import HistoryPage from "../pages/History";
import AnalyticsDashboard from "../pages/Analytics";
//import Sponsor from "../components/Host/Sponsor";
import { Home } from "../pages/Home";
import EventPage from "../pages/EventPage";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { RoleBasedProfile } from "../components/RoleBasedProfile";
import CertificatePage from "../components/User/Certificates";

export const Routes: AppRoute[] = [
  { path: "/", element: <Home />, public: true },
  { path: "/events", element: <EventPage />, public: true },
  { path: "/login", element: <LoginPage />, public: true },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    roles: ["User", "Host", "Vendor", "Sponsor", "Admin"],
    children: [
      { path: "", element: <Navigate to="/dashboard/profile" replace /> },
      {
        path: "profile",
        element: <RoleBasedProfile />,
        roles: ["User", "Host", "Vendor", "Sponsor", "Admin"],
      },
      { path: "event", element: <Event />, roles: ["User", "Host", "Vendor", "Sponsor", "Admin"] },
      { path: "hostEvent", element: <Hostevent />, roles: ["Host", "Admin"] },
      { path: "schedule", element: <Schedule />, roles: ["User", "Host", "Vendor", "Sponsor", "Admin"] },
      { path: "history", element: <HistoryPage />, roles: ["User", "Host", "Vendor", "Sponsor", "Admin"] },
      { path: "analytics", element: <AnalyticsDashboard />, roles: ["Host", "Vendor", "Sponsor"] },
      //{ path: "sponsor", element: <Sponsor />, roles: ["Host", "Admin"] },
      { path: "certificates", element: <CertificatePage />, roles: ["User"] }
    ],
  },
];