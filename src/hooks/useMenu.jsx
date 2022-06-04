import { useContext } from "react";
import { MainContext } from "../context/MainProviderContext";

export const useMenu = () => {
  const { openMenu, setOpenMenu } = useContext(MainContext);
  return { openMenu, setOpenMenu };
};
