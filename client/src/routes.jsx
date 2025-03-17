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
import AdminPermission from "./layouts/AdminPermission";
import ProductListPage from "./pages/ProductListPage";
import ProductDisplayPage from "./pages/ProductDisplayPage";

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
            element: (
              <AdminPermission>
                <CategoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "sub-category",
            element: (
              <AdminPermission>
                <SubCategoryPage />
              </AdminPermission>
            ),
          },
          {
            path: "product-admin",
            element: (
              <AdminPermission>
                <ProductAdmin />
              </AdminPermission>
            ),
          },
        ],
      },
    ],
  },
  {
    path: ":category",
    children: [
      {
        path: ":subCategory",
        element: <ProductListPage />,
      },
    ],
  },
  {
    path: "product/:product",
    element: <ProductDisplayPage />,
  },
]);

export default router;
