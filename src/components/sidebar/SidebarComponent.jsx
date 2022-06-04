import React from "react";
import { ItemMenu, SectionMenu } from "../index";
import { dashboard, purchase, wallet } from "../../helpers/icons";
import { useMenu } from "../../hooks/useMenu";

const SidebarComponent = () => {
  const { openMenu, setOpenMenu } = useMenu();
  return (
    <div className="flex max-h-[44rem] xs:absolute md:absolute lg:static z-10">
      <nav
        className={`${
          openMenu ? "" : "xs:hidden md:hidden"
        } lg:inline w-64 bg-gradient-to-t from-neutral-800 to-neutral-900 text-white my-2 ml-2 rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md pt-5 flex flex-col justify-between shadow-md overflow-y-auto`}
      >
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
            <li>
              <ItemMenu title="All purchases" href="/purchases" />
            </li>
          </SectionMenu>
        </div>
      </nav>
    </div>
  );
};

export default SidebarComponent;
