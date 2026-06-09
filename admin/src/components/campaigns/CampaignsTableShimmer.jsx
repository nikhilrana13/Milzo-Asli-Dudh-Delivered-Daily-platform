import React from "react";

const CampaignTableShimmer = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <tr key={index} className="border-t bg-white animate-pulse">
          {/* Campaign */}
          <td className="px-4 py-3">
            <div className="space-y-2">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
          </td>
          {/* Discount */}
          <td className="px-3 py-3">
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </td>
          {/* Eligibility */}
          <td className="px-3 py-3">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          </td>
          {/* Duration */}
          <td className="px-3 py-3">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
          </td>
          {/* status toggle */}
          <td className="px-4 py-3">
            <div className="flex justify-end">
              <div className="h-9 w-24 bg-gray-200 rounded-lg" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default CampaignTableShimmer;