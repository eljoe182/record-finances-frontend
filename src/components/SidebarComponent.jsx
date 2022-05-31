import React from "react";
import { ItemMenu } from ".";
import { dashboard, purchase, wallet } from "../helpers/icons";

const SidebarComponent = () => {
  return (
    <nav className="bg-neutral-800 text-white w-52">
      <ul className="flex flex-col mt-5">
        <ItemMenu title="Dashboard" icon={dashboard} />
        <ItemMenu title="Wallets" icon={wallet} href="/wallets" />
        <ItemMenu title="Purchases" icon={purchase} href="/purchases" />
      </ul>
    </nav>
  );
};

export default SidebarComponent;
