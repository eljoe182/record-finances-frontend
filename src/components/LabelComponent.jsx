import React from "react";

const LabelComponent = ({ text, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-md font-bold text-neutral-700 ml-2"
    >
      {text}
    </label>
  );
};

export default LabelComponent;
