import EmptyState from '@/components/common/EmptyState';
import VendorCard from '@/components/vendor/VendorCard';
import VendorCardShimmer from '@/components/vendor/VendorCardShimmer';
import { useUserLocation } from '@/context/LocationContext';
import { useFetchNearByVendorsQuery } from '@/redux/api/VendorsApi';
import { generateSlug } from '@/utils/Helpers';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { MdExplore, MdStar } from 'react-icons/md';
import { TbRoute, TbRoute2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';





const Vendors = () => {
  const { selectedLocation } = useUserLocation()
  const [filters, setFilters] = useState({
    toprated: false,
    maxDistance: null
  })
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, isFetching } = useFetchNearByVendorsQuery({
    lat: selectedLocation?.lat,
    lng: selectedLocation?.lng,
    toprated: filters.toprated,
    maxDistance: filters.maxDistance,
    page: page,
  },
    // wait until user location is available before calling API
    // also refetch fresh data when component remounts or query params change
    {
      skip: !selectedLocation?.lat || !selectedLocation?.lng,
      refetchOnMountOrArgChange: true,
    }
  )
  const nearbyVendors = data?.data?.vendors
  const pagination = data?.data?.pagination || {}
  const navigate = useNavigate()
  const loaderRef = useRef()
  const [allVendors, setAllVendors] = useState([])
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
  // append new vendors while avoiding duplicates
  useEffect(() => {
    // first page → replace vendors completely
    if (page === 1) {
      setAllVendors(nearbyVendors || [])
      return
    }
    // next pages → append unique vendors
    if (nearbyVendors?.length > 0) {
      setAllVendors((prev) => {
        const existingIds = new Set(prev.map((v) => v._id))
        const newVendors = nearbyVendors.filter(
          (v) => !existingIds.has(v._id)
        )
        return [...prev, ...newVendors]
      })
    }
  }, [nearbyVendors, page])
  // reset on filter change
  useEffect(() => {
    setPage(1)
  }, [filters.toprated, filters.maxDistance, selectedLocation?.lat, selectedLocation?.lng])
  // infinite scroll intersection observer
  useEffect(() => {
     if (!loaderRef.current || isLoading || isError || allVendors.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && pagination?.currentPage < pagination?.totalPages && !isFetching) {
        setPage((prev) => prev + 1)
      }
    },
      {
        threshold: 0.3,
        rootMargin: "100px"
      })
    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }
    return () => {
      if (currentLoader) {
        observer.disconnect()
      }
    }
  }, [pagination?.currentPage, pagination?.totalPages, isFetching,isLoading,isError,allVendors?.length])

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
            Showing vendors near {selectedLocation?.city || "NA"}, {selectedLocation?.state || "NA"}
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
      {isLoading ? (
        <div className='mx-auto mt-9 max-w-7xl px-5 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[1, 2, 3, 4, 5, 6].map((_, i) => {
            return (
              <VendorCardShimmer key={i} />
            )
          })}
        </div>
      ) : allVendors?.length > 0 ? (
        <div className='mx-auto mt-9 max-w-7xl px-5 sm:px-6 grid grid-cols-1 md:grid-cols-3  gap-8'>
          {allVendors.map((vendor) => {
            return (
              <VendorCard key={vendor?._id} vendor={vendor} onViewProducts={()=>{
                navigate(`/vendor/${vendor?._id}/${generateSlug(vendor?.displayName)}`)
              }} />
            )
          })}
        </div>
      ) : (
        <EmptyState isError={isError} />
      )
      }
      {/* infinite scroll loader */}
      {allVendors?.length > 0 && (
        <div ref={loaderRef} className="h-20 flex items-center justify-center">
          {isFetching &&
            pagination?.currentPage < pagination?.totalPages && (
              <div className="h-10 w-10 rounded-full border-4 border-[#dcfce7] border-t-[#16a34a] animate-spin" />
            )}
        </div>
      )}
    </div>
  );
}

export default Vendors;
