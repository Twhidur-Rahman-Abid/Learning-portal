import React from "react";
import learningportal from "../assets/image/learningportal.svg";
const Form = ({ title, children, ...arg }) => {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img
            className="h-12 mx-auto"
            src={learningportal}
            alt="learningportal"
          />
          {/* form title */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-6" {...arg}>
          {children}
        </form>
      </div>
    </section>
  );
};

export default Form;
