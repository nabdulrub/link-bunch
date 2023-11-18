import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import SignIn from "./pages/SignIn.jsx";
import Preview from "./pages/Preview.jsx";
import Providers from "./Providers.jsx";

const router = createBrowserRouter([
  {
    element: <Preview />,
    path: "/:id",
  },
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
