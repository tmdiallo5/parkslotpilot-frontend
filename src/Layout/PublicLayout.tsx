import Booking from "../booking/Booking";
import PublicHeader from "../components/headers/PublicHeader";
import { Outlet } from "react-router";

function PublicLayout() {
  return (
    <>
      <PublicHeader />

      <Outlet />
    </>
  );
}

export default PublicLayout;
