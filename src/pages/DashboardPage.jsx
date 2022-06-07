import React from "react";
import { useMenu } from "../hooks/useMenu";

const DashboardPage = () => {
  const { setSectionName, setMenuName } = useMenu();
  setMenuName("dashboard");
  setSectionName("dashboard");
  return <div>DashboardPage</div>;
};

export default DashboardPage;
