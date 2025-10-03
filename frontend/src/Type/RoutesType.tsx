import type { RouteObject } from "react-router-dom";
import type { ReactNode } from "react";


export interface AppRoute extends Omit<RouteObject, "children"> {
  path: string;
  element: ReactNode;
  public?: boolean;     // whether login is required
  roles?: string[];     // allowed roles
  index?: boolean;
  children?: AppRoute[]; // recursive children
}