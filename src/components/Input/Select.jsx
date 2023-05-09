import React from "react";

const Select = ({ label, placeholder, children, ...arg }) => {
  return (
    <div className="mb-4 ">
      <label htmlFor={label}>{label}</label>
      <select className="rounded-md text-white login-input" required {...arg}>
        <option value="" hidden>
          {placeholder || label}
        </option>
        {children}
      </select>
    </div>
  );
};

export default Select;
