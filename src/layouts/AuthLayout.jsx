import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center">
        <div className="mx-auto w-96 my-12 px-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
