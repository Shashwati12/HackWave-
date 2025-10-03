import { RouterProvider } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { router } from "./routes/Approuter";
import { FloatingNavbar } from "./components/Navbar";

function App() {
  return (
    <>
      <FloatingNavbar/>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
