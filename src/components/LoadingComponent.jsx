import React from "react";

const LoadingComponent = ({ show = false, text }) => {
  if (show) {
    return (
      <div>
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
        <h1 className="text-center text-sm text-neutral-600">{text}</h1>
      </div>
    );
  }
  return null;
};

export default LoadingComponent;
