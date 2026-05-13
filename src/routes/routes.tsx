import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import PrivateLayout from "../Layout/PrivateLayout";

import ErrorPage from "../ErrorPage";
import Login from "../pages/account/Login";
import PublicLayout from "../Layout/PublicLayout";

import SignUp from "../pages/account/SignUp";
import Dashboard from "../components/Dashboard";
import LandingPage from "../components/LandingPage";
import SignupSuccess from "../components/SignupSuccess ";
import Active from "../components/Active";
import AccountActivated from "../components/AccountActivated";
import AvailableSpotsPage from "../components/AvailableSpotsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicLayout />,

        children: [
          { index: true, element: <LandingPage /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
          { path: "signUp-success", element: <SignupSuccess /> },
          { path: "active", element: <Active /> },
          { path: "accountActivated", element: <AccountActivated /> },
          { path: "AvailableSpotsPage", element: <AvailableSpotsPage /> },
        ],
      },

      {
        path: "private",
        element: <PrivateLayout />,
        children: [
          { index: true, element: <Navigate to={"/private/dashboard"} /> },
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
]);

export { router };
