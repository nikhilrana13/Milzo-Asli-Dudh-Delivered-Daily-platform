import ProductCard from '@/components/product/ProductCard'
import ProductCardShimmer from '@/components/product/ProductCardShimmer'
import ProductsState from '@/components/product/ProductsState'
import VendorDetailsHeader from '@/components/vendor/VendorDetailsHeader'
import VendorDetailsHeaderSkeleton from '@/components/vendor/VendorDetailsHeaderSkeleton'
import { useFetchVendorDetailsQuery, useFetchVendorProductsQuery } from '@/redux/api/VendorsApi'
import React, { useState } from 'react'
import { CiWarning } from 'react-icons/ci'
import { useParams } from 'react-router-dom'

const VendorDetails = () => {
  const { id } = useParams()
  const vendorDetailsQuery = useFetchVendorDetailsQuery(id)
  const vendorAllProductsQuery = useFetchVendorProductsQuery(id)
  const vendorDetails = vendorDetailsQuery?.data?.data?.vendorDetails
  const products = vendorAllProductsQuery?.data?.data?.products
  const [selectedProductData, setSelectedProductData] = useState(null)
  const selectedPriceOption = selectedProductData?.product?.priceOptions?.[selectedProductData?.selectedOption]
  // console.log("selectedProduct", selectedProductData)

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
      <div className='flex mx-auto max-w-7xl flex-col md:flex-row md:justify-between gap-5 '>
        {/* products*/}
        <div className='flex-1'>
          <h3 className='text-[1.5rem] md:text-[2rem] mb-6 font-[600]'>Dairy Products</h3>
          {/* note */}
          <div className="mb-5 flex items-center gap-2 rounded-2xl border border-[#dcfce7] bg-[#f0fdf4] px-4 py-5 text-sm
           font-medium text-[#166534]">
            <span className="text-lg">
              <CiWarning />
            </span>
            <p  className="max-w-[600px] text-xs leading-5 font-medium sm:text-sm"> You can create only one subscription booking at a time.
              Once the current booking is completed,
              you can create a subscription for another product from this vendor.</p>
          </div>
          {/* products card */}
          <div className='flex  flex-col gap-5'>
            {vendorAllProductsQuery?.isLoading ? (
              ([1, 2, 3, 4].map((_, i) => {
                return (
                  <ProductCardShimmer key={i} />
                )
              }))
            ) : products?.length > 0 ? (
              products.map((product) => {
                return (
                  <ProductCard key={product?._id} product={product} selectedProductData={selectedProductData} setSelectedProductData={setSelectedProductData} isLocked={selectedProductData && selectedProductData?.product?._id !== product?._id}
                  />
                )
              })
            ) : (
              <ProductsState isError={vendorAllProductsQuery?.isError} onRetry={() => {
                vendorAllProductsQuery?.refetch()
              }} />
            )
            }
          </div>
        </div>
        {/* subscription create card */}
        {
          selectedProductData && (
            <div className='w-full sticky hidden lg:block top-28 bg-white rounded-[24px] border md:w-[400px]'>

            </div>
          )
        }
      </div>

    </div>
  )
}

export default VendorDetails
