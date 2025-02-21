// src/routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";

console.log("Router configuration started");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <div>hello</div>,
      },
    ],
  },
]);

console.log("Router configuration completed");

export default router;
