import { Outlet } from "react-router";
import GlobalApplicationContextProvider from "./context/GlobalApplicationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60000,
      },
    },
  });
  return (
    <GlobalApplicationContextProvider>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </GlobalApplicationContextProvider>
  );
}

export default App;
