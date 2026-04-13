import { Navigate, Outlet } from "react-router";

import { useContext } from "react";
import { GlobalApplicationContext } from "../context/GlobalApplicationContextProvider";
import Header from "../components/headers/Header";
import ScrollToTop from "../components/scroll/ScrollToTop";
import PublicFooter from "../components/footers/PublicFooter";

function PrivateLayout() {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  return (
    <>
      {token ? (
        <>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <ScrollToTop />
            <Header />
            <main className="flex-1 pt-20">
              <Outlet />
            </main>
            <PublicFooter />
          </div>
        </>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}

export default PrivateLayout;
