// AppRouter.jsx
import { createBrowserRouter , type RouteObject } from "react-router-dom";
import { Routes } from "./Routes";
import AuthRoute from "../context/Authroute";
import type { AppRoute } from "../Type/RoutesType";

const wrapRoute = (route: AppRoute): RouteObject => {
  const wrapped: RouteObject = {
    path: route.path,
    index: route.index,
    loader: route.loader,
    action: route.action,
    errorElement: route.errorElement,
    element: route.public ? (
      route.element
    ) : (
      <AuthRoute requiredRoles={route.roles}>{route.element}</AuthRoute>
    ),
  };

  if (route.children) {
    wrapped.children = route.children.map(wrapRoute);
  }

  return wrapped;
};


const AppRouter = () => {
  return createBrowserRouter(Routes.map(wrapRoute));
};

export default AppRouter;
