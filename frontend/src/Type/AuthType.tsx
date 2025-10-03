import type { ReactNode } from "react";

export interface AuthRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
}