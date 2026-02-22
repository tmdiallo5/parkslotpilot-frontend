import { createBrowserRouter } from "react-router";
import App from "../App";
import PrivateLayout from "../Layout/PrivateLayout";
import Booking from "../booking/Booking";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
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
