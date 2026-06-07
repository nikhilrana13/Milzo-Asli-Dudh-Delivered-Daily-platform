import React from "react";
import { MdStorefront } from "react-icons/md";

const VendorEmptyState = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-[#dcfce7] flex items-center justify-center shadow-sm">
          <MdStorefront className="text-5xl text-[#16a34a]" />
        </div>
        {/* Heading */}
        <h3 className="mt-6 text-2xl font-bold text-[#191c1e]">
          No Vendors Found
        </h3>
        {/* Description */}
        <p className="mt-3 text-[#5f6b62] leading-relaxed">
          There are currently no vendor registrations available.
          Once vendors join the platform, they will appear here
          for review and management.
        </p>
        {/* Badge */}
        <div className="mt-5 inline-flex items-center rounded-full bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-2 text-sm font-medium text-[#15803d]">
          Milzo Vendor Network
        </div>
      </div>
    </div>
  );
};

export default VendorEmptyState;