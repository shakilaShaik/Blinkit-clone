import React from "react";
import useMobile from "../hooks/useMobile";
import logo from "../assets/logo.svg";
import logo2 from "../assets/logo2.png";

import Search from "./Search";
const Header = () => {
  const [isMobile] = useMobile();
  const isSearchPage = location.pathname === "/search";
  return (
    <header className="h-24 shadow-md sticky top-0">
      {/* {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2  justify-between"></div>
      )}
      <div className="hidden lg:block">
        <Search />
      </div> */}
      {/* logo */}
      <div className=" flex container mx-auto h-full items-center justify-between px-4">
        <div className="h-full">
          <div className="h-full flex justify-center items-center">
            <img src={logo2} width={160} height={70} alt="logo" />
          </div>
        </div>

        <div>
          <Search />
        </div>

        <div> Login</div>
      </div>
    </header>
  );
};

export default Header;
