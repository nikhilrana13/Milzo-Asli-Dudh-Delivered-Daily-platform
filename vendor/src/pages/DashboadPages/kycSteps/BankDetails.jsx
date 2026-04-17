import React, { useState } from 'react';
import { MdInfo } from 'react-icons/md';

const BankDetails = () => {
    const [showAccount,setShowAccount] = useState(false)
  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          3
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          Bank Settlement Details
        </h2>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-[#bccbb9]/20">

        {/* Account Number */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Bank Account Number
          </label>

          <div className="relative">
            <input
              type={showAccount ? "text" : "password"}
              placeholder="Account Number"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none pr-12"
            />

            {/* Toggle visibility */}
            <button
              type="button"
              onClick={() => setShowAccount(!showAccount)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#006e2f] font-semibold"
            >
              {showAccount ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* IFSC */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            IFSC Code
          </label>
          <input
            type="text"
            placeholder="e.g. SBIN0001234"
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
          />
        </div>
        {/* Info Box */}
        <div className="col-span-full flex items-start gap-3 p-4 bg-[#ffe083]/20 rounded-lg">
          <MdInfo className="text-[#735c00] mt-0.5 text-lg" />
          <p className="text-xs sm:text-sm text-[#4f3e00] leading-relaxed">
            Payments are settled every <strong>Tuesday and Friday</strong> directly
            to this bank account. Ensure the name matches your Aadhar card.
          </p>
        </div>

      </div>
    </section>
  );
}

export default BankDetails;
