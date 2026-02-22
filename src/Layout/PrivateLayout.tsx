import React from "react";
import { Outlet } from "react-router";
import Nav from "../components/Nav";
import PublicHeader from "../components/headers/PublicHeader";

function PrivateLayout() {
  return (
    <>
      <PublicHeader />

      <Outlet />
    </>
  );
}

export default PrivateLayout;
