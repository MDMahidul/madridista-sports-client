import App from "@/App";
import AboutUs from "@/pages/AboutUs/AboutUs";
import AllProducts from "@/pages/AllProducts/AllProducts";
import HomePage from "@/pages/Home/HomePage/HomePage";
import ManageProducts from "@/pages/ManageProducts/ManageProducts";
import Cart from "@/pages/Cart/Cart";
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
      {
        path:'/all-products',
        element:<AllProducts/>
      },
      {
        path:'/manage-products',
        element:<ManageProducts/>
      },
      {
        path:'/about-us',
        element:<AboutUs/>
      },
      {
        path:'/cart',
        element:<Cart/>
      },
    ],
  },
]);

export default router;