// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import UserMenuMobile from "./pages/UserMenuMobile";
import Profile from "./pages/Profile";
import Dashboard from "./layouts/Dashboard";
import MyOrders from "./pages/MyOrders";
import Address from "./pages/Address";
import UploadProduct from "./pages/UploadProduct";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import ProductAdmin from "./pages/ProductAdmin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/user",
        element: <UserMenuMobile />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "upload-product",
            element: <UploadProduct />,
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "sub-category",
            element: <SubCategoryPage />,
          },
          {
            path: "product-admin",
            element: <ProductAdmin />,
          },
        ],
      },
    ],
  },
]);

export default router;
