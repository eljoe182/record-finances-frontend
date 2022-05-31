import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem("recFin-token");
  };

  return (
    <MainContext.Provider value={{ auth, setAuth, clearAuth }}>
      {children}
    </MainContext.Provider>
  );
};
