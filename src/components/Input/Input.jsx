import React from "react";

const Input = ({ label, type, htmlFor, name, error, classNamees, ...arg }) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        type={type}
        name={name}
        className={`login-input ${classNamees}`}
        required
        {...arg}
      />
      {error && <p class="mt-2 text-sm text-red-500 "> {error}</p>}
    </div>
  );
};

export default Input;
