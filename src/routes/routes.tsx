import App from "@/App";
import AboutUs from "@/pages/AboutUs/AboutUs";
import HomePage from "@/pages/Home/HomePage/HomePage";
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
import DashboardLayout from "@/components/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard/Dashboard";
import UnauthorizedPage from "@/pages/Error/UnauthorizedPage";
import PrivateRoute from "./PrivateRoute";
import WishListPage from "@/pages/WishListPage/WishListPage";
import Blogs from "@/pages/Blogs/Blogs";
import ProfileLayout from "@/components/layout/ProfileLayout";
import Profile from "@/pages/UserMenu/Profile";
import MyOrders from "@/pages/UserMenu/MyOrders";
import MyCart from "@/pages/UserMenu/MyCart";
import MyWishlist from "@/pages/UserMenu/MyWishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
      },
      /*        {
        path:'/all-products/:category',
        element:<AllProducts/>
      }, */
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wishlist",
        element: <WishListPage />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute roles={["user", "admin", "superAdmin"]}>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/order-confirmation",
        element: <SuccessPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute roles={["user","admin", "superAdmin"]}>
        <ProfileLayout />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path:'my-orders',
        element: <MyOrders />,
      },
      {
        path:'my-cart',
        element: <MyCart />,
      },
      {
        path:'my-wishlist',
        element: <MyWishlist />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={["admin", "superAdmin"]}>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);

export default router;
