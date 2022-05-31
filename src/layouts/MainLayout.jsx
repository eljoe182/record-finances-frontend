import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../components";
import { useAuth } from "../hooks/useAuth";
import { getProfile } from "../services/profile.api";

const MainLayout = () => {
  const { setAuth, clearAuth } = useAuth();

  useEffect(() => {
    const getData = async () => {
      await getProfile().then((res) => {
        setAuth(res);
      });
    };

    getData().catch(() => clearAuth());
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <main className="flex-1 px-4 pt-4 mb-10">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
