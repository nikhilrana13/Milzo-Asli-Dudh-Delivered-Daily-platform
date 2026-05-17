import VendorDetailsHeader from '@/components/vendor/VendorDetailsHeader'
import VendorDetailsHeaderSkeleton from '@/components/vendor/VendorDetailsHeaderSkeleton'
import { useFetchVendorDetailsQuery } from '@/redux/api/VendorsApi'
import React from 'react'
import { useParams } from 'react-router-dom'

const VendorDetails = () => {
  const { id } = useParams()
  const vendorDetailsQuery = useFetchVendorDetailsQuery(id)
  const vendorDetails = vendorDetailsQuery?.data?.data?.vendorDetails
  // console.log("data",vendorDetails)
  return (
    <div className='py-8 px-5'>
      {/* hero section show videos and images slider */}
      {
        vendorDetailsQuery?.isLoading || vendorDetailsQuery?.isFetching ? (
          <VendorDetailsHeaderSkeleton />
        ) : (
          <VendorDetailsHeader vendorDetails={vendorDetails} />
        )
      }
      {/* products */}
      
    </div>
  )
}

export default VendorDetails
