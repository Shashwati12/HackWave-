import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import type { AuthRouteProps } from "../Type/AuthType";

const AuthRoute: React.FC<AuthRouteProps> = ({ children, requiredRoles }) => {

  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if(!user.role || !requiredRoles?.includes(user.role)){
    return <Navigate to="/" replace/>
  }

  return children;
};

export default AuthRoute;