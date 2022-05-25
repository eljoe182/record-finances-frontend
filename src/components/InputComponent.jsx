import React from "react";

const InputComponent = ({ id, type, placeholder, onChange, value }) => {
  return (
    <input
      id={id}
      type={type}
      className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;
