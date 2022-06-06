import { useContext } from "react";
import { MainContext } from "../context/MainProviderContext";

export const useAuth = () => {
  const { auth, setAuth, clearAuth } = useContext(MainContext);
  return { auth, setAuth, clearAuth };
};
