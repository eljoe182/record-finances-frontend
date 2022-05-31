import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { auth } = useAuth();

  if (auth?.data?._id) return <Navigate to="/" />;

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
