import React from "react";
import { useNavigate } from "react-router-dom";
import { chevronDown, chevronRight } from "../../helpers/icons";
import { useMenu } from "../../hooks/useMenu";

const SectionMenuComponent = ({
  children,
  name,
  title,
  icon,
  href,
  isMenu = true,
}) => {
  const navigate = useNavigate();
  const {
    setOpenMenu,
    sectionName,
    setSectionName,
    sectionOpen,
    setSectionOpen,
  } = useMenu();

  const handleClick = () => {
    setSectionOpen(name);
    if (!isMenu) {
      setOpenMenu(false);
      navigate(href);
    }
  };

  return (
    <div className="">
      <button
        className={`flex flex-row justify-between w-full gap-4 px-5 py-4 ${
          !isMenu && sectionName === name ? "bg-neutral-800 font-bold" : ""
        }`}
        onClick={handleClick}
      >
        <div className="">{icon}</div>
        <div className="w-full text-left pl-1">{title}</div>
        {isMenu && (
          <div className="">
            {sectionOpen === name ? chevronDown : chevronRight}
          </div>
        )}
      </button>
      {sectionOpen === name && (
        <>
          <ul className="bg-neutral-700/60">{children}</ul>
        </>
      )}
    </div>
  );
};

export default SectionMenuComponent;
