import { useContext } from "react";
import Nav from "../Nav";
import Logo from "../logos/Logo";
import { GlobalApplicationContext } from "../../context/GlobalApplicationContextProvider";
import { useQuery } from "@tanstack/react-query";
import { search } from "../../services";

type HeaderProps = {
  onOpenChat: () => void;
};

function Header({ onOpenChat }: HeaderProps) {
  const {
    state: { token },
  } = useContext(GlobalApplicationContext);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["user-profile", token],
    queryFn: () => search({ url: "profile/read", token }),
    enabled: !!token,
    retry: 2,
  });
  return (
    <header className="fixed top-0 w-full border-b border-gray-200 bg-white rounded-md">
      <div className="mx-auto flex h-16 items-center justify-between">
        <Logo />
        <Nav
          user={data}
          isSuccess={isSuccess}
          isLoading={isLoading}
          onOpenChat={onOpenChat}
        />
      </div>
    </header>
  );
}

export default Header;
