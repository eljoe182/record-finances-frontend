import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem("recFin-token");
  };

  return (
    <MainContext.Provider
      value={{ auth, setAuth, clearAuth, openMenu, setOpenMenu }}
    >
      {children}
    </MainContext.Provider>
  );
};
