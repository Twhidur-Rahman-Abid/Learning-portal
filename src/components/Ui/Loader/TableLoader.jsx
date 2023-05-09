import React from "react";

const TableLoader = () => {
  return (
    <div
      role="status"
      className="w-full p-8 mt-8 space-y-4 border border-gray-700 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-40 bg-gray-600 rounded-full  w-35 mb-2.5"></div>
        <div className="h-2.5 bg-gray-600 rounded-full  w-60 mb-2.5"></div>
        <div className="h-2.5 bg-gray-600 rounded-full  w-24 mb-2.5"></div>
      </div>
      <div className="flex pt-4 pb-2 items-center justify-between">
        <div className="h-2.5 w-40 bg-gray-600 rounded-full  w-35 "></div>
        <div className="h-2.5 bg-gray-600 rounded-full  w-60 "></div>
        <div className="h-2.5 bg-gray-600 rounded-full  w-24 "></div>
      </div>
      <div className="flex pt-4 pb-2 items-center justify-between">
        <div className="h-2.5 w-40 bg-gray-600 rounded-full  w-35 "></div>
        <div className="h-2.5 bg-gray-600 rounded-full  w-60 "></div>
        <div className="h-2.5 bg-gray-600 rounded-full  w-24 "></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TableLoader;
