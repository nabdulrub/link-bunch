import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/AuthProvider.jsx";
import "./index.css";
import SignInForm from "./components/auth/SignInForm.jsx";
import RegisterForm from "./components/auth/RegisterForm.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignInForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
