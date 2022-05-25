import React from "react";
import { Link } from "react-router-dom";

const ItemMenuComponent = ({ children, href = "/" }) => {
  return (
    <li className="flex items-center hover:bg-neutral-900 rounded-r-3xl my-1">
      <Link to={href} className="flex flex-row items-center py-2 px-4 w-full">
        {children}
      </Link>
    </li>
  );
};

export default ItemMenuComponent;
