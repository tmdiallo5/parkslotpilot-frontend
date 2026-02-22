import { createBrowserRouter } from "react-router";
import App from "../App";
import PrivateLayout from "../Layout/PrivateLayout";
import Booking from "../booking/Booking";
import Home from "../pages/Home";
import ErrorPage from "../ErrorPage";
import Login from "../pages/account/Login";
import PublicLayout from "../Layout/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PublicLayout />,

        children: [
          { index: true, element: <Booking /> },
          { path: "login", element: <Login /> },
        ],
      },

      {
        path: "private",
        element: <PrivateLayout />,
        children: [{ path: "booking", element: <Booking /> }],
      },
    ],
  },
]);

export { router };
