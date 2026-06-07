import VendorsTable from '@/components/vendors/VendorsTable'
import { useGetAllVendorsQuery } from '@/redux/api/VendorApi'
import React, { useEffect, useState } from 'react'

const Vendors = () => {
  const [page, setPage] = useState(1)
  const [selectedKycStatus, setSelectedkycStatus] = useState("")
  const vendorQuery = useGetAllVendorsQuery({ page, limit: 5, kycStatus: selectedKycStatus })
  const vendors = vendorQuery?.data?.data?.vendors ?? []
  const pagination = vendorQuery?.data?.data?.pagination ?? {}
  //  console.log("vendors",vendors)  

  // reset to page 1 on filter change
  useEffect(()=>{
    setPage(1)
  },[selectedKycStatus])
  const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0;
  const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalVendors)

  return (
    <div className='w-full px-3 sm:px-5 py-6 flex flex-col gap-6'>
      {/* header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div className="max-w-2xl ">
          <span className="text-[#735c00] font-bold tracking-widest uppercase text-xs mb-2 block">
            Milzo Vendor Operations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] mb-2">
            Vendor Management Hub
          </h2>
          <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
            Review vendor applications, verify KYC status, and onboard trusted dairy
            businesses to strengthen the Milzo ecosystem.
          </p>
        </div>
        {/* input field */}
        <select  value={selectedKycStatus} onChange={(e)=>setSelectedkycStatus(e.target.value)} className='p-2 bg-green-100 text-black cursor-pointer text-sm rounded-md '>
          <option value="">Select kyc Status</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>

      </div>

      {/* vendors table */}
      <div className="w-full bg-[#f3f4f6] rounded-xl p-2 overflow-hidden">
        <VendorsTable vendors={vendors} isLoading={vendorQuery.isLoading} isError={vendorQuery.isError} />
        {/* pagination */}
        {
          !vendorQuery.isLoading && (
            pagination?.totalPages > 1 && (
              <div className="w-full border-t border-[#bccbb9]/30 py-4 px-4 sm:px-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
                {/* Info */}
                <div className="text-center sm:text-left">
                  <span className="text-[#5c5f60] text-xs sm:text-sm font-medium">
                    Showing {start || "0"} – {end || "0"} of {pagination?.totalVendors || 0} Vendors
                  </span>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                  {/* Prev */}
                  <button
                    onClick={() => page > 1 && setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg font-medium 
                   border border-[#006e2f]/20 text-[#006e2f] bg-white hover:bg-[#e8f5e9] disabled:opacity-40 transition">
                    ←
                    <span className="hidden sm:inline ml-1">Prev</span>
                  </button>

                  {/* Page Info */}
                  <span className="text-[#3d4a3d] text-xs sm:text-sm font-semibold">
                    {pagination?.currentPage} / {pagination?.totalPages}
                  </span>
                  {/* Next */}
                  <button
                    onClick={() =>
                      page < pagination?.totalPages && setPage((prev) => prev + 1)
                    }
                    disabled={page === pagination?.totalPages}
                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg font-medium 
                    bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white shadow-sm hover:shadow-md hover:scale-[1.02] 
                    disabled:opacity-40 transition"
                  >
                    <span className="hidden sm:inline mr-1">Next</span>
                    →
                  </button>
                </div>
              </div>
            )
          )
        }



      </div>

    </div>
  )
}

export default Vendors
