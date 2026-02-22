import React from "react";
import { NavLink } from "react-router";
import { NAV_LINKS } from "../utils/data";

function Nav() {
  return (
    <nav className="ml-auto flex gap-5 mr-2">
      {NAV_LINKS.map(({ to, label, className }) => (
        <NavLink to={to} className={className}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Nav;
