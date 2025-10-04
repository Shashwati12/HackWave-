import type { ReactNode } from "react";

export interface AuthRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  role: string;
  date_of_birth: string;
  image_url: string | null;
  created_at: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
}