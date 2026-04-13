import { useContext } from "react";
import LandingPage from "./LandingPage";
import { GlobalApplicationContext } from "../context/GlobalApplicationContextProvider";
import { search } from "../services";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);

  const { data: user } = useQuery({
    queryKey: ["user-profile", token],
    queryFn: () => search({ url: "profile/read", token }),
    enabled: !!token,
    retry: 2,
  });

  return (
    <>
      <h1 className=" ml-5 text-3xl font-bold">
        Welcome back{user?.firstName ? `, ${user.firstName}!` : ""}
      </h1>
      <LandingPage />
    </>
  );
}
export default Dashboard;
