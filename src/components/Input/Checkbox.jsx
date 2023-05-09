import React from "react";

const Checkbox = ({ label, name, ...arg }) => {
  return (
    <div className="flex gap-2">
      <input
        type="checkbox"
        className=" w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
        {...arg}
      ></input>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
