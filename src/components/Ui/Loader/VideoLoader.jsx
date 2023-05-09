import React from "react";

const VideoLoader = () => {
  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <div
        role="status"
        className="w-full  rounded shadow animate-pulse  dark:border-gray-700"
      >
        <div
          role="status"
          className="flex items-center  justify-center h-96  bg-gray-700 rounded-lg animate-pulse "
        >
          <svg
            className="w-12 h-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="h-5 mt-8 bg-gray-700 rounded-full  w-3/5 mb-2"></div>
        <div className="h-3 mt-4 bg-gray-700 rounded-full  w-4/5 mb-8"></div>
        <div className="mt-8">
          <div role="status" className="space-y-2.5 animate-pulse w-full">
            <div className="flex items-center w-full space-x-2">
              <div className="h-2.5 bg-gray-600 rounded-full  w-32"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-56"></div>
              <div className="h-2.5 bg-gray-700 rounded-full  w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 ">
              <div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 ">
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-700 w-80"></div>
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-full"></div>
            </div>
            <div className="flex items-center w-full space-x-2 ">
              <div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-full"></div>
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-24"></div>
            </div>
            <div className="flex items-center w-full space-x-2 ">
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-600 w-32"></div>
              <div className="h-2.5 bg-gray-600 rounded-full dark:bg-gray-600 w-24"></div>
              <div className="h-2.5 bg-gray-700 rounded-full dark:bg-gray-700 w-full"></div>
            </div>

            <span className="sr-only">Loading...</span>
          </div>
        </div>

        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default VideoLoader;
