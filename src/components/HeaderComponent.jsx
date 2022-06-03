import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logOut } from "../helpers/icons";

const HeaderComponent = () => {
  const { clearAuth } = useAuth();
  return (
    <header className="py-4 bg-green-600 shadow-md">
      <div className="container flex flex-row mx-auto justify-between px-20">
        <h1 className="font-black text-xl">
          Record<span className="text-white">Finance</span>
        </h1>
        <nav className="text-white">
          <Link
            to="/auth/login"
            className="hover:text-gray-200 flex flex-row items-center"
            onClick={() => clearAuth()}
          >
            {logOut} Logout
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
