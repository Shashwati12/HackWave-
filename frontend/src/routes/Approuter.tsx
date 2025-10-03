// AppRouter.ts
import { createBrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";
import AuthRoute from "../context/Authroute";
import type { AppRoute } from "../Type/RoutesType";

const wrapRoute = (route: AppRoute) => {
  const wrapped = {
    path: route.path,
    element: route.public ? (
      route.element
    ) : (
      <AuthRoute requiredRoles={route.roles}>{route.element}</AuthRoute>
    ),
  };

  if (route.index) wrapped.index = true;
  if (route.children) wrapped.children = route.children.map(wrapRoute);

  return wrapped;
};

export const router = createBrowserRouter(Routes.map(wrapRoute));
