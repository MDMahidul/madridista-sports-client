import App from "@/App";
import HomePage from "@/pages/Home/HomePage/HomePage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <HomePage />,
      },
    ],
  },
]);

export default router;