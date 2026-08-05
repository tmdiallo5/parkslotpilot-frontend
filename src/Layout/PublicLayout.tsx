import PublicFooter from "../components/footers/PublicFooter";

import { Outlet } from "react-router";
import ScrollToTop from "../components/scroll/ScrollToTop";
import Header from "../components/headers/Header";
import ParkingAssistant from "../components/openAI/ParkingAssistant";
import { useState } from "react";

function PublicLayout() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ScrollToTop />
      <Header onOpenChat={() => setChatOpen(true)} />
      <main className="pt-20">
        <Outlet />
      </main>

      {chatOpen && <ParkingAssistant onClose={() => setChatOpen(false)} />}

      <PublicFooter />
    </div>
  );
}

export default PublicLayout;
