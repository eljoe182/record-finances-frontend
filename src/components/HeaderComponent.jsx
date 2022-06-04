import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logOut, menu } from "../helpers/icons";
import { useMenu } from "../hooks/useMenu";

const HeaderComponent = () => {
  const { clearAuth } = useAuth();
  const { openMenu, setOpenMenu } = useMenu();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header className="py-4 bg-green-600 shadow-md w-full">
      <div className="flex mx-auto md:flex-row justify-between md:px-5 xs:px-2 sm:px-5 items-center">
        <button className="text-white lg:hidden" onClick={handleOpenMenu}>
          {menu}
        </button>
        <h1 className="font-black text-xl lg:text-justify md:flex-1 md:text-center">
          Record<span className="text-white">Finance</span>
        </h1>
        <nav className="text-white">
          <Link
            to="/auth/login"
            className="hover:text-gray-200 flex flex-row items-center gap-2"
            onClick={() => clearAuth()}
          >
            {logOut}
            <span className="hidden lg:inline">Logout</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
