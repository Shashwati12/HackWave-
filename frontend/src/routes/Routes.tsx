import type { AppRoute } from "../Type/RoutesType";
import { Home } from "../pages/Home";
import EventPage from "../pages/EventPage";


export const Routes: AppRoute[] = [
  {
    path: "/",
    element: <Home />,
    public: true,
  },
    {
    path: "/events",
    element: <EventPage />,
    public: true,
  },
 
];
