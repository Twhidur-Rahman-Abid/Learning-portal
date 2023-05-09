import React from "react";
import Modal from "../Ui/Modal";

const DashboardFrom = ({
  showModal,
  closeModal,
  handleSubmit,
  disabled,
  title,
  children,
}) => {
  return (
    showModal && (
      <Modal closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-lg text-white font-semibold">
            {title}
          </h1>
          {children}

          <button
            disabled={disabled}
            className="px-4 py-2 rounded-full bg-cyan  hover:opacity-90 active:opacity-100 active:scale-95 "
          >
            {title}
          </button>
        </form>
      </Modal>
    )
  );
};

export default DashboardFrom;
