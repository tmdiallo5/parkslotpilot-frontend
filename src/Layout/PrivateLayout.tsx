import { Navigate, Outlet } from "react-router";

import { useContext, useState } from "react";
import { GlobalApplicationContext } from "../context/GlobalApplicationContextProvider";
import Header from "../components/headers/Header";
import ScrollToTop from "../components/scroll/ScrollToTop";
import PublicFooter from "../components/footers/PublicFooter";
import ParkingAssistant from "../components/openAI/ParkingAssistant";

function PrivateLayout() {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const [chatOpen, setChatOpen] = useState(false);

  return token ? (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      <Header onOpenChat={() => setChatOpen(true)} />

      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {chatOpen && <ParkingAssistant onClose={() => setChatOpen(false)} />}

      <PublicFooter />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
}

export default PrivateLayout;
