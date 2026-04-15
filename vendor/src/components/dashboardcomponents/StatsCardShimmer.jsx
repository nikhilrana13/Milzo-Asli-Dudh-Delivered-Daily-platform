import React from "react";

const StatCardShimmer = () => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gray-200" />
      </div>
      <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
      <div className="h-6 sm:h-7 w-20 bg-gray-300 rounded" />
    </div>
  );
};

export default StatCardShimmer;