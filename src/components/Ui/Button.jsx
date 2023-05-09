import React from "react";

const Button = ({ children, ...arg }) => {
  return (
    <div className="w-full flex" {...arg}>
      <button className="btn ml-auto">{children}</button>
    </div>
  );
};

export default Button;
