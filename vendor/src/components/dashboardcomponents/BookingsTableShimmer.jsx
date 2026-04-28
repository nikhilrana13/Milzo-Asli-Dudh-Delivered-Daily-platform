import React from "react";

const BookingsTableShimmer = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-t animate-pulse">
          {/* Product */}
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
                <div className="h-2 w-16 bg-gray-100 rounded"></div>
              </div>
            </div>
          </td>
          {/* Customer */}
          <td className="px-3 py-3">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
              <div className="h-2 w-28 bg-gray-100 rounded"></div>
            </div>
          </td>
          {/* Duration */}
          <td className="px-3 py-3">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-2 w-16 bg-gray-100 rounded"></div>
            </div>
          </td>
          {/* Amount */}
          <td className="px-3 py-3">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-2 w-20 bg-gray-100 rounded"></div>
            </div>
          </td>
          {/* Status */}
          <td className="px-3 py-3">
            <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
          </td>
          {/* Time & Date */}
          <td className="px-4 py-3">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-2 w-16 bg-gray-100 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default BookingsTableShimmer;