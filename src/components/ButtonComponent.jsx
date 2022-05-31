import React from "react";

const ButtonComponent = ({ label, type, onClick, color, size }) => {
  const getColor = (value) => {
    switch (value) {
      case "secondary":
        return "bg-blue-600 text-white hover:bg-blue-800";
      case "info":
        return "bg-sky-400 text-white hover:bg-sky-600";
      case "warning":
        return "bg-yellow-600 text-white hover:bg-yellow-800";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-800";
      case "neutral":
        return "bg-neutral-600 text-white hover:bg-neutral-800";
      default:
        return "bg-green-600 text-white hover:bg-green-800";
    }
  };

  const getSize = (value) => {
    switch (value) {
      case "small":
        return "py-1 px-5 rounded-md text-xs";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "py-2 px-10 rounded-xl";
    }
  };

  return (
    <button
      type={type}
      className={`${getColor(color)} w-full ${getSize(
        size
      )} uppercase transition-colors`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;