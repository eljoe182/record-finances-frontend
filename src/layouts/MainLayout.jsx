import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Sidebar } from "../components";

const MainLayout = () => {
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
