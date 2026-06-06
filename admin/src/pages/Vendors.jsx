import { useGetAllVendorsQuery } from '@/redux/api/VendorApi'
import React from 'react'

const Vendors = () => {
  const vendorQuery = useGetAllVendorsQuery()
  const vendors = vendorQuery?.data?.data?.vendors ?? []
  //  console.log("vendors",vendors)

  return (
    <div className='w-full px-3 sm:px-5 py-6 flex flex-col gap-6'>
      {/* header */}
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
      {/* vendors table */}
       <div className="w-full bg-[#f3f4f6] rounded-xl p-2 overflow-hidden">
        
       </div>

    </div>
  )
}

export default Vendors
