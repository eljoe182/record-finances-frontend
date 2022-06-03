import React from "react";
import { ItemMenu, SectionMenu } from "../index";
import { dashboard, purchase, wallet } from "../../helpers/icons";

const SidebarComponent = () => {
  return (
    <nav className="w-64 bg-gradient-to-t from-neutral-800 to-neutral-900 text-white my-2 ml-2 rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md pt-5 flex flex-col justify-between shadow-md max-h-[44rem] overflow-y-auto">
      <div className="my-5">
        <SectionMenu
          title="Dashboard"
          icon={dashboard}
          href="/"
          isSection={false}
        />
        <SectionMenu title="Payments" icon={wallet}>
          <li>
            <ItemMenu title="Wallet" href="/wallets" />
          </li>
        </SectionMenu>
        <SectionMenu title="Purchase" icon={purchase}>
          <li>
            <ItemMenu title="Create" href="/purchases/new" />
          </li>
        </SectionMenu>
      </div>
    </nav>
  );
};

export default SidebarComponent;
