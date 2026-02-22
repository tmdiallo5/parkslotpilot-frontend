import React from "react";
import { NavLink } from "react-router";

function Nav() {
  return (
    <nav className="ml-auto flex gap-5 mr-2">
      <NavLink
        to=""
        className="text-sm text-green-600 font-medium py-1.5 hover:text-green-800"
      >
        Login
      </NavLink>
      <NavLink
        to=""
        className="rounded-full border border-green-600 font-medium text-green-600 text-sm px-4 py-1.5 hover:bg-green-50"
      >
        Sign Up
      </NavLink>
    </nav>
  );
}

export default Nav;
