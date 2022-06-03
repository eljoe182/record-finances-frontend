import React from "react";
import { useNavigate } from "react-router-dom";
import { purchase, chevronRight } from "../../helpers/icons";

const SectionMenuComponent = ({
  children,
  title,
  icon,
  href,
  isSection = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isSection) {
      navigate(href);
    }
  };

  return (
    <div className="my-1">
      <button
        className="flex flex-row justify-between w-full gap-4 px-5 py-2 "
        onClick={handleClick}
      >
        <div className="">{icon}</div>
        <div className="w-full text-left pl-1">{title}</div>
        {isSection && <div className="">{chevronRight}</div>}
      </button>
      <ul className="bg-neutral-800">{children}</ul>
    </div>
  );
};

export default SectionMenuComponent;
