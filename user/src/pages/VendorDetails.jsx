import ProductCard from '@/components/product/ProductCard'
import ProductCardShimmer from '@/components/product/ProductCardShimmer'
import ProductsState from '@/components/product/ProductsState'
import SubscriptionSummary from '@/components/subscription/SubscriptionSummary'
import VendorDetailsHeader from '@/components/vendor/VendorDetailsHeader'
import VendorDetailsHeaderSkeleton from '@/components/vendor/VendorDetailsHeaderSkeleton'
import { useFetchVendorDetailsQuery, useFetchVendorProductsQuery } from '@/redux/api/VendorsApi'
import React, { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CiWarning } from 'react-icons/ci'
import { useParams } from 'react-router-dom'

const VendorDetails = () => {
  const { id } = useParams()
  // console.log("id",id)
  const vendorDetailsQuery = useFetchVendorDetailsQuery(id)
  const [page, setPage] = useState(1)
  const loaderRef = useRef(null)
  const vendorAllProductsQuery = useFetchVendorProductsQuery({
    vendorId: id,
    page: page,
    limit: 3
  }, {
    refetchOnMountOrArgChange: true
  })
  const pagination = vendorAllProductsQuery?.data?.data?.pagination || {}
  const [allProducts, setAllProducts] = useState([])
  const vendorDetails = vendorDetailsQuery?.data?.data?.vendorDetails
  const products = vendorAllProductsQuery?.data?.data?.products
  const [selectedProductData, setSelectedProductData] = useState(null)
  const selectedPriceOption = selectedProductData?.product?.priceOptions?.[selectedProductData?.selectedOption]
  // console.log("selectedProduct", selectedProductData)

  // reset on Vendor change/page open :
  useEffect(() => {
    setPage(1)
    setAllProducts([])
  }, [id])
  // append new prducts while avoiding duplicates
  useEffect(() => {
    // first page → replace vendors completely
    if (page === 1) {
      setAllProducts(products || [])
      return
    }
    // next pages → append unique products
    if (products?.length > 0) {
      setAllProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id))
        const newProducts = products?.filter(
          (p) => !existingIds.has(p._id)
        )
        return [...prev, ...newProducts]
      })
    }
  }, [products, page])
  const isFetchingMore = vendorAllProductsQuery?.isFetching && page > 1
  // infinite scroll intersection observer
  useEffect(() => {
    if (!loaderRef.current || vendorAllProductsQuery?.isLoading || vendorAllProductsQuery?.isError || allProducts.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && pagination?.currentPage < pagination?.totalPages && !vendorAllProductsQuery.isFetching) {
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
  }, [pagination?.currentPage, pagination?.totalPages, vendorAllProductsQuery?.isFetching, vendorAllProductsQuery?.isLoading, vendorAllProductsQuery?.isError, allProducts?.length])


  const isInitialLoading = vendorAllProductsQuery?.isLoading && page === 1 && allProducts.length === 0
  // console.log("data",vendorDetails)
  return (
    <>
      <Helmet>
        <title>
          {vendorDetails?.displayName ? `${vendorDetails.displayName} | Milzo` : "Vendor Details | Milzo"}
        </title>
        <meta
          name="description"
          content={
            vendorDetails?.displayName
              ? `Order fresh dairy products from ${vendorDetails.displayName} in ${vendorDetails.city}.`
              : "Fresh dairy products on Milzo."
          }
        />

        <meta
          property="og:title"
          content={`${vendorDetails?.displayName || "Vendor"} | Milzo`}
        />
        <meta
          property="og:description"
          content={`Fresh dairy products from ${vendorDetails?.displayName || "trusted vendors"
            }`}
        />
        <meta
          property="og:image"
          content={vendorDetails?.profilePic?.url}
        />
      </Helmet>
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
              <p className="max-w-[600px] text-xs leading-5 font-medium sm:text-sm"> You can create only one subscription booking at a time.
                Once the current booking is completed,
                you can create a subscription for another product from this vendor.</p>
            </div>
            {/* products card */}
            <div className='flex  flex-col gap-5'>
              {isInitialLoading ? (
                ([1, 2, 3, 4].map((_, i) => {
                  return (
                    <ProductCardShimmer key={i} />
                  )
                }))
              ) : allProducts?.length > 0 ? (
                allProducts?.map((product) => {
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
              {/* infinite scroll loader */}
              {allProducts?.length > 0 && (
                <div ref={loaderRef} className="h-20 flex items-center justify-center">
                  {isFetchingMore &&
                    pagination?.currentPage < pagination?.totalPages && (
                      <div className="h-10 w-10 rounded-full border-4 border-[#dcfce7] border-t-[#16a34a] animate-spin" />
                    )}
                </div>
              )}
            </div>
          </div>
          {/* subscription create card */}
          {
            selectedProductData && (
              <SubscriptionSummary selectProductData={selectedProductData} selectedPriceOption={selectedPriceOption} />
            )
          }
        </div>

      </div>
    </>
  )
}

export default VendorDetails
