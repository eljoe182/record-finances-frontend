import React from "react";

const InputComponent = ({
  id,
  name,
  type = "text",
  placeholder,
  onChange,
  icon,
  readOnly,
  disabled,
  value,
}) => {
  return (
    <div className="relative">
      <span className="absolute top-4 left-2">{icon}</span>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        className={`${
          icon ? "pl-10" : ""
        } border w-full p-2 mt-2 bg-gray-50 rounded-xl`}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        step="any"
      />
    </div>
  );
};

export default InputComponent;
