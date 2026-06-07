import { NavLink } from "react-router";
import { NAV_LINKS } from "../utils/data";
import type { Profile } from "../type/Profie";
import { useContext, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { GlobalApplicationContext } from "../context/GlobalApplicationContextProvider";

type NavProps = {
  user?: Profile;
  isLoading?: boolean;
  isSuccess?: boolean;
};

function Nav({ user, isLoading, isSuccess }: NavProps) {
  const { logout } = useContext(GlobalApplicationContext);

  const [open, setOpen] = useState(false);

  const displayName = user?.firstName;
  const filteredLinks = NAV_LINKS.filter((link) => {
    if (link.private && !displayName) {
      return false;
    }
    if (displayName && (link.label === "Login" || link.label === "Signup")) {
      return false;
    }
    return true;
  });

  return (
    <nav className="ml-auto flex gap-5 mr-2 ">
      {filteredLinks.map(({ to, label, className }) => (
        <NavLink key={to} to={to} className={className}>
          {label}
        </NavLink>
      ))}

      {!isLoading && isSuccess && displayName && (
        <div className="relative ml-2">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm text-green-600 font-medium py-1.5"
          >
            Hello, {displayName}
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md border">
              <button
                type="button"
                className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
              >
                My Account
              </button>

              <button
                type="button"
                onClick={logout}
                className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
