import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../hooks/useMenu";

const ItemMenuComponent = ({ href = "/", name, title, section }) => {
  const { setOpenMenu, menuName, setSectionName, setMenuName } = useMenu();
  return (
    <div
      className={`flex items-center hover:bg-neutral-700 hover:rounded-r-3xl hover:font-bold pl-10 hover:text-gray-100 transition-colors ${
        menuName === name ? "bg-neutral-600 font-bold" : ""
      } `}
    >
      <Link
        to={href}
        className="flex flex-row items-center py-2 px-4 w-full "
        onClick={() => {
          setOpenMenu(false);
          setSectionName(section);
          setMenuName(name);
        }}
      >
        {title}
      </Link>
    </div>
  );
};

export default ItemMenuComponent;
