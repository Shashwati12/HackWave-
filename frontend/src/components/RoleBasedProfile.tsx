import { useAuth } from "../context/useAuth";
import HostProfile from "./Host/HostProfile";
import UserProfile from "./User/UserProfile";
import VendorProfile from "./Vendor/VendorProfile";
import SponsorProfile from "./Sponsor/SponsorProfile";
import AdminProfile from "./Admin/AdminProfile";

export const RoleBasedProfile = () => {
  const { user } = useAuth();

  if (!user) return null; // or redirect to login

  switch (user.role) {
    case "User":
      return <UserProfile />;
    case "Host":
      return <HostProfile />; // Host profile
    case "Vendor":
      return <VendorProfile />;
    case "Sponsor":
       return <SponsorProfile />;
    case "Admin":
      return <AdminProfile />;
  }
};
