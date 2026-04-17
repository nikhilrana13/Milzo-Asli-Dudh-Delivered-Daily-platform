import React from 'react';
import { MdBiotech, MdCloudUpload } from 'react-icons/md';

const KycDocuments = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          2
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          KYC Verification
        </h2>
      </div>

      {/* Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-[#bccbb9]/20">

        {/* Aadhar Number */}
        <div className="col-span-full space-y-2">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Aadhar Number
          </label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX"
            maxLength={12}
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#e1e2e4] rounded-xl focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all outline-none"
          />
        </div>
        {/* Aadhar Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Aadhar Card (Front & Back)
          </label>
          <div
            className="group flex flex-col items-center justify-center w-full h-44 sm:h-48 border-2 border-dashed border-[#bccbb9]/40 rounded-xl hover:border-[#006e2f]/60 transition-all cursor-pointer bg-[#f3f4f6]"
          >
            <MdCloudUpload className="text-4xl text-[#6d7b6c] mb-2 group-hover:scale-110 transition" />
            <p className="text-sm font-medium text-[#3d4a3d]">
              Upload Aadhar Photos
            </p>
            <p className="text-[10px] text-[#6d7b6c] mt-1">
              JPG, PNG (Max 5MB)
            </p>

            <input
              type="file"
              multiple
              accept="image/*"
              hidden
             
            />
          </div>
        </div>

        {/* Lab Report */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-[#3d4a3d] ml-1">
            Milk Lab Test Report
          </label>

          <div
            className="group flex flex-col items-center justify-center w-full h-44 sm:h-48 border-2 border-dashed border-[#bccbb9]/40 rounded-xl hover:border-[#006e2f]/60 transition-all cursor-pointer bg-[#f3f4f6]"
          >
            <MdBiotech className="text-4xl text-[#6d7b6c] mb-2 group-hover:scale-110 transition" />
            <p className="text-sm font-medium text-[#3d4a3d]">
              Upload Lab Report
            </p>
            <p className="text-[10px] text-[#6d7b6c] mt-1">
              PDF or Image (Max 5MB)
            </p>

            <input
              type="file"
              accept=".pdf,image/*"
              hidden
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default KycDocuments;
