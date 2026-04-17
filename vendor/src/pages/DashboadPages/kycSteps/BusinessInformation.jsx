import React from 'react';

const BusinessInformation = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          1
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          Business Information
        </h2>
      </div>
      {/* Form Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-[#bccbb9]/20">
        {/* Display Name */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Display Name (Store/Farm Name)
          </label>
          <input
            type="text"
            maxLength={100}
            placeholder="e.g. Green Valley Organic Farms" 
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
          />
        </div>
        {/* City */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            City
          </label>
          <input
            type="text"
            placeholder="e.g. Bangalore"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
          />
        </div>
        {/* Pincode */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Pincode
          </label>
          <input
            type="text"
            maxLength={6}
            placeholder="6-digit code"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
          />
        </div>
        {/* Detailed Location */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Detailed Location
          </label>
          <textarea
            rows={3}
            placeholder="Street address, Landmark, etc."
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessInformation;
