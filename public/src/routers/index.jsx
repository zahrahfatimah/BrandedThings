import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import Home from "../views/Home";
import Detail from "../views/Detail";
// import Toastify from "toastify-js";
const url = "https://h8-phase2-gc.vercel.app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/home",
        element: <Home url={url} />,
      },
      {
        path: "/", // Default route
        element: <Home url={url} />,
      },
      {
        path: "*", // Route not found
        element: <Home url={url} />,
      },
      {
        path: "/detail/:id",
        element: <Detail url={url} />,
      },
    ],
  },
]);

export default router;
