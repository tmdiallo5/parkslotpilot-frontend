import PublicFooter from "../components/footers/PublicFooter";

import { Outlet } from "react-router";
import ScrollToTop from "../components/scroll/ScrollToTop";
import Header from "../components/headers/Header";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
