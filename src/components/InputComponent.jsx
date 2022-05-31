import React from "react";

const InputComponent = ({
  id,
  name,
  type = "text",
  placeholder,
  onChange,
  value,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      className="border w-full p-2 mt-2 bg-gray-50 rounded-xl"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComponent;
