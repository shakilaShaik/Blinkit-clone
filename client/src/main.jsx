import { StrictMode } from "react";

import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
