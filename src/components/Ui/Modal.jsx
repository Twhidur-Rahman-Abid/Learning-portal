import { useEffect } from "react";

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = "scroll";
    };
  }, []);
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed w-full h-full inset-0 bg-gray-900/30"
      ></div>
      <div
        className="fixed w-1/2
            top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
            bg-gray-900 drop-shadow-xl rounded-xl p-10 border-gray-700 border"
      >
        <div className="text-right">
          <button
            type="button"
            onClick={closeModal}
            className="ml-auto -mx-1.5 -my-1.5  text-white rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-800 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-4"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {children}
      </div>
    </>
  );
};

export default Modal;
