import React from "react";
import { Link } from "react-router-dom";

const ItemMenuComponent = ({ href = "/", title, icon, active = false }) => {
  return (
    <li
      className={`flex items-center hover:bg-neutral-600 hover:rounded-r-3xl ${
        active ? "bg-neutral-900" : ""
      }`}
    >
      <Link
        to={href}
        className="flex flex-row items-center py-3 pl-4 w-full gap-4 "
      >
        {icon}
        <span className="text-normal">{title}</span>
      </Link>
    </li>
  );
};

export default ItemMenuComponent;
