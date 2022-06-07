import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [menuName, setMenuName] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(null);

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem("recFin-token");
  };

  return (
    <MainContext.Provider
      value={{
        auth,
        setAuth,
        clearAuth,
        openMenu,
        setOpenMenu,
        sectionName,
        setSectionName,
        menuName,
        setMenuName,
        sectionOpen,
        setSectionOpen,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
