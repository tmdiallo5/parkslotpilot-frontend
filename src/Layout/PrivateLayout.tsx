import React from "react";
import { Outlet } from "react-router";
import Nav from "../components/Nav";

function PrivateLayout() {
  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white rounded-md">
        <div className="mx-auto flex h-16 items-center">
          <div className="text-lg font-semibold text-green-600 ml-2">Logo</div>
          <Nav />
        </div>
      </header>

      <Outlet />
    </>
  );
}

export default PrivateLayout;
