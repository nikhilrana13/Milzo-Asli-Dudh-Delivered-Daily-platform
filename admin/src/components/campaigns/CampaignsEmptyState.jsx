import React from "react";
import { MdCampaign } from "react-icons/md";

const CampaignsEmptyState = ({ onCreateCampaign }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="max-w-lg text-center px-6">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-sm">
          <MdCampaign className="text-5xl text-[#16a34a]" />
        </div>
        {/* Heading */}
        <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-[#191c1e]">
          No Campaigns Yet
        </h3>
        {/* Description */}
        <p className="mt-3 text-[#5f6b62] text-sm sm:text-base leading-relaxed">
          You haven't created any campaigns yet. Launch promotional offers,
          attract new customers, and boost vendor engagement across the
          Milzo marketplace.
        </p>
        {/* Badge */}
        <div className="mt-5 inline-flex items-center rounded-full bg-[#f0fdf4] border border-[#bbf7d0] px-4 py-2 text-sm font-medium text-[#15803d]">
          Milzo Campaign Management
        </div>
        {/* CTA */}
        <div className="mt-8">
          <button
            onClick={onCreateCampaign}
            className="bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition"
          >
            Create Your First Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsEmptyState;