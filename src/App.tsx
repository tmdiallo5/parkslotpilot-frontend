import { Outlet } from "react-router";

function App() {
  return (
    <main className="bg-gray-200 min-h-screen ">
      <Outlet />
    </main>
  );
}

export default App;
