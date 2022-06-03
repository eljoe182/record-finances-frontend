import React from "react";
import { Link } from "react-router-dom";

const ItemMenuComponent = ({ href = "/", title, active = false }) => {
  return (
    <div
      className={`flex items-center hover:bg-neutral-700 hover:rounded-r-3xl hover:font-bold py-2 pl-10 hover:text-gray-100 transition-colors ${
        active ? "bg-neutral-600 font-bold" : ""
      } `}
    >
      <Link to={href} className="flex flex-row items-center py-2 px-4 w-full ">
        {title}
      </Link>
    </div>
  );
};

export default ItemMenuComponent;
