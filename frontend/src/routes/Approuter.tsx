// AppRouter.ts
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import AuthRoute from "../context/Authroute";
import type { AppRoute } from "../Type/RoutesType";

/**
 * Toggle this to `true` while developing to bypass AuthRoute
 * IMPORTANT: set to `false` for staging / production
 */
const BYPASS_AUTH = true;

const wrapRoute = (route: AppRoute) => {
  const wrapped: any = {
    path: route.path,
    element: BYPASS_AUTH
      ? route.element
      : route.public
      ? route.element
      : <AuthRoute requiredRoles={route.roles}>{route.element}</AuthRoute>,
  };

  if (route.index) wrapped.index = true;
  if (route.children) wrapped.children = route.children.map(wrapRoute);

  return wrapped;
};

export const router = createBrowserRouter(Routes.map(wrapRoute));
