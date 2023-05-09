import React from "react";

const VideosLoader = () => {
  return (
    <div className="w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3">
      {/* <!-- Thumbnail --> */}
      <div className="h-8 w-8  bg-gray-700 rounded-full   mb-2"></div>
      {/* <!-- Description --> */}
      <div clas="flex flex-col w-full">
        <span>
          <div className="h-4  bg-gray-700 rounded-full  w-4/5 mb-2"></div>
        </span>
        <div className="flex items-center mt-4 gap-2">
          <span className="h-2.5 bg-gray-700 rounded-full  w-24"></span>
          <span className="text-gray-400 text-xs "> | </span>
          <span className="h-2.5 bg-gray-700 rounded-full  w-24"></span>
        </div>
      </div>
    </div>
  );
};

export default VideosLoader;
