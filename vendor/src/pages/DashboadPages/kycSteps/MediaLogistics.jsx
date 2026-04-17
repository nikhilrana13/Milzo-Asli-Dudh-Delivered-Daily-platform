import React from 'react';
import { MdAdd, MdAddAPhoto, MdVideoCall } from 'react-icons/md';

const MediaLogistics = () => {
  return (
      <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#006e2f] flex items-center justify-center text-white font-bold">
          4
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#191c1e]">
          Media & Logistics
        </h2>
      </div>
      <div className="space-y-8 p-5 sm:p-8 bg-white rounded-xl shadow-sm border border-[#bccbb9]/20">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 sm:gap-4 h-[260px] sm:h-80">
          
          {/* Main Image */}
          <div
            className="col-span-2 row-span-2 rounded-xl overflow-hidden relative group cursor-pointer bg-[#e1e2e4]"
          >
            {/* {formData.mainImage ? (
              <img
                src={URL.createObjectURL(formData.mainImage)}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#6d7b6c]">
                <MdAddAPhoto className="text-3xl" />
              </div>
            )} */}
             <div className="flex items-center justify-center h-full text-[#6d7b6c]">
                <MdAddAPhoto className="text-3xl" />
              </div>

            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <MdAddAPhoto className="text-white text-2xl" />
            </div>

            <input
              type="file"
              accept="image/*"
              hidden
            />
          </div>

          {/* Gallery */}
          <div
            className="col-span-2 row-span-1 rounded-xl overflow-hidden relative group cursor-pointer bg-[#e1e2e4] flex items-center justify-center"
          >
            <span className="text-sm font-medium text-[#3d4a3d] bg-black/40 text-white px-3 py-1 rounded-full">
              + Upload Gallery
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              hidden
            />
          </div>

          {/* Video */}
          <div className="col-span-1 flex items-center justify-center rounded-xl border-2 border-dashed border-[#bccbb9]/40 bg-[#f3f4f6]">
            <MdVideoCall className="text-[#6d7b6c] text-xl" />
          </div>

          {/* Add more */}
          <div className="col-span-1 flex items-center justify-center rounded-xl border-2 border-dashed border-[#bccbb9]/40 bg-[#f3f4f6]">
            <MdAdd className="text-[#6d7b6c] text-xl" />
          </div>
        </div>

        {/* Delivery Timings */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#191c1e]">
            Delivery Timings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Morning */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#6d7b6c] uppercase">
                Morning Slot
              </label>

              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="time"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#e1e2e4] rounded-xl outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                />
                <span className="text-[#3d4a3d] text-sm">to</span>
                <input
                  type="time"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#e1e2e4] rounded-xl outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                />
              </div>
            </div>

            {/* Evening */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#6d7b6c] uppercase">
                Evening Slot
              </label>

              <div className="flex items-center gap-2 sm:gap-3">
                <input
                  type="time"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#e1e2e4] rounded-xl outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                />
                <span className="text-[#3d4a3d] text-sm">to</span>
                <input
                  type="time"
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#e1e2e4] rounded-xl outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default MediaLogistics;
