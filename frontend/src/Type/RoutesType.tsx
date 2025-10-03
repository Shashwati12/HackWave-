import type { RouteObject } from "react-router-dom";
import type { ReactNode } from "react";


export interface AppRoute extends Omit<RouteObject, "children"> {
  path: string;
  element: ReactNode;
  public?: boolean;     
  roles?: string[];     
  index?: boolean;
  children?: AppRoute[]; 
}