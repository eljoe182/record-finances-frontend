import React from "react";
import { ItemMenu, SectionMenu } from "../index";
import { useMenu } from "../../hooks/useMenu";
import { menuInfo } from "../../helpers/menuInfo";

const SidebarComponent = () => {
  const { openMenu } = useMenu();
  return (
    <div className="flex max-h-[44rem] xs:absolute md:absolute lg:static z-10">
      <nav
        className={`${
          openMenu ? "" : "xs:hidden md:hidden"
        } lg:inline w-64 bg-gradient-to-t from-neutral-800 to-neutral-900 text-white my-2 ml-2 rounded-tl-md rounded-tr-3xl rounded-bl-3xl rounded-br-md pt-5 flex flex-col justify-between shadow-md overflow-y-auto`}
      >
        <div className="my-5">
          {menuInfo.map((section, index) => (
            <SectionMenu
              key={index}
              name={section.name}
              title={section.title}
              icon={section.icon}
              href={section.href}
              isMenu={section.isMenu}
            >
              {section.subMenu.map((subMenu, index) => (
                <ItemMenu
                  key={index}
                  name={subMenu.name}
                  title={subMenu.title}
                  href={subMenu.href}
                  section={section.name}
                />
              ))}
            </SectionMenu>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarComponent;
