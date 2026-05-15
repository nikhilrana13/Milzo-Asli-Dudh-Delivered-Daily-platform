import VendorCard from '@/components/vendor/VendorCard';
import { useDialog } from '@/context/DialogContext';
import { useUserLocation } from '@/context/LocationContext';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdExplore, MdStar } from 'react-icons/md';
import { TbRoute, TbRoute2 } from 'react-icons/tb';





const Vendors = () => {
  const [filters, setFilters] = useState({
    toprated: false,
    maxDistance: null
  })
 
  const handleTopratedToggle = () => {
    setFilters((prev) => ({
      ...prev, toprated: !prev.toprated
    }))
  }
  const handleMaxDistanceToggle = () => {
    setFilters((prev) => ({
      ...prev, maxDistance: prev.maxDistance === 15 ? null : 15
    }))
  }
  return (
    <div className='py-8'>
      {/* heading */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MdExplore className="text-[#16a34a] text-lg" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#15803d]">
              Premium Sourcing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#191c1e] mb-3">
            Local Creameries
          </h1>
          <p className="text-gray-500 font-medium flex items-center gap-2 text-sm sm:text-base">
            <HiOutlineLocationMarker className="text-[#16a34a]" />
            Showing vendors near Indira nagar, Bengaluru
          </p>
        </div>
        {/* filters */}
        <div className="flex flex-wrap gap-3 mt-8">
          <button onClick={() => handleTopratedToggle()} className={`flex items-center border border-1 gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
          ${filters.toprated ? "bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white shadow-lg shadow-[#22c55e]/20"
              : "bg-[#f3f4f6] text-gray-600 hover:bg-[#e5e7eb]"}`}>
            <MdStar size={18} />
            <span>
              Top Rated
            </span>
          </button>
          <button onClick={() => handleMaxDistanceToggle()} className={`flex border border-1 items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
          ${filters.maxDistance === 15 ? "bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white shadow-lg shadow-[#22c55e]/20"
              : "bg-[#f3f4f6] text-gray-600 hover:bg-[#e5e7eb]"}`}>
            <TbRoute2 size={18} />
            <span>
              Under 15 km
            </span>
          </button>
        </div>
      </div>
      {/* vendors card */}
      <div className='mx-auto mt-9 max-w-7xl px-5 sm:px-6 grid grid-cols-1 md:grid-cols-3  gap-8'>
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
        <VendorCard />
      </div>

    </div>
  );
}

export default Vendors;
