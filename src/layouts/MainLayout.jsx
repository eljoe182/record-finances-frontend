import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../components";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../services/profile.api";

const MainLayout = () => {
  const navigation = useNavigate();
  const { setAuth, clearAuth } = useAuth();

  useEffect(() => {
    const getData = async () => {
      await getProfile().then((res) => {
        setAuth(res);
      });
    };

    getData().catch(() => {
      clearAuth();
      navigation("/auth/login");
    });
  }, []);

  return (
    <>
      <div className="flex flex-col  min-h-full">
        <Header />
        <div className="flex flex-row flex-1">
          <Sidebar />
          <main className="px-4 pt-4 w-full ">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
