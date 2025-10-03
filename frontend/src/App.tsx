import { RouterProvider } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { router } from "./routes/Approuter";

function App() {
  return (
    <>
    
    <RouterProvider router={AppRouter()}/>
    <Toaster/>
    </>
  );
}

export default App;
