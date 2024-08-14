import App from "@/App";
import AboutUs from "@/pages/AboutUs/AboutUs";
import HomePage from "@/pages/Home/HomePage/HomePage";
import ManageProducts from "@/pages/ManageProducts/ManageProducts";
import { createBrowserRouter } from "react-router-dom";
import SingleProduct from "@/pages/SingleProduct/SingleProduct";
import CartPage from "@/pages/Cart/Cart";
import CheckOut from "@/pages/CheckOut/CheckOut";
import SuccessPage from "@/pages/CheckOut/SuccessPage";
import Error from "@/pages/Error/Error";
import AllProducts from "@/pages/AllProducts/AllProducts";
import SignInPage from "@/pages/SignIn&SingnUp/SignInPage";
import SignUpPage from "@/pages/SignIn&SingnUp/SignUpPage";
import ForgetPasswordPage from "@/pages/SignIn&SingnUp/ForgetPasswordPage";
import ResetPasswordPage from "@/pages/SignIn&SingnUp/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>,
    children: [
      {
        index:true,
        element: <HomePage />,
      },
      {
        path:'/product/:id',
        element:<SingleProduct/>
      },
     /*  {
        path:'/all-products',
        element:<AllProducts2/>
      }, */
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
        element:<CartPage/>
      },
      {
        path:'/checkout',
        element:<CheckOut/>
      },
      {
        path:'/order-confirmation',
        element:<SuccessPage/>
      },
    ],
  },
  {
    path:'/signin',
    element:<SignInPage/>
  },
  {
    path:'/signup',
    element:<SignUpPage/>
  },
  {
    path:'/forget-password',
    element:<ForgetPasswordPage/>
  },
  {
    path:'/reset-password',
    element:<ResetPasswordPage/>
  },
]);

export default router;