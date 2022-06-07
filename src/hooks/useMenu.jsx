import { useContext } from "react";
import { MainContext } from "../context/MainProviderContext";

export const useMenu = () => {
  const {
    openMenu,
    setOpenMenu,
    sectionName,
    setSectionName,
    menuName,
    setMenuName,
    sectionOpen,
    setSectionOpen,
  } = useContext(MainContext);
  return {
    openMenu,
    setOpenMenu,
    sectionName,
    setSectionName,
    menuName,
    setMenuName,
    sectionOpen,
    setSectionOpen,
  };
};
