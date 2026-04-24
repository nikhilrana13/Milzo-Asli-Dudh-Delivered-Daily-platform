import AddandEditProduct from '@/components/dashboardcomponents/AddandEditProduct';
import ProductsTable from '@/components/dashboardcomponents/ProductsTable';
import { useGetVendorProductsQuery } from '@/redux/api/GetVendorProducts';
import React, { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';

const Products = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError,refetch } = useGetVendorProductsQuery({ page, limit: 5 })
  const products = data?.data?.products || []
  const pagination = data?.data?.pagination || {}
  const [showAddProductModel, setShowAddProductModel] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)


  const handleEdit = (product) => {
    setIsEdit(true)
    setSelectedProduct(product)
    setShowAddProductModel(true)
  }
// detect empty page
 useEffect(() => {
  if (!isLoading && products.length === 0 && page > 1) {
    setPage(prev => prev - 1)
  }
}, [products, isLoading])

  const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0;
  const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalProducts)

  return (
    <>
      <div className="w-full px-3 sm:px-5 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          {/* Left */}
          <div className="max-w-2xl">
            <span className="text-[#735c00] font-bold tracking-widest uppercase text-xs mb-2 block">
              Milzo Inventory Management
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] mb-2">
              Product Catalog
            </h2>
            <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
              Manage your premium dairy listings. Ensure stock levels are updated
              to maintain your{" "}
              <span className="font-medium">"Digital Creamery"</span> freshness rating.
            </p>
          </div>
          {/* Button */}
          <div onClick={() => { setShowAddProductModel(true), setIsEdit(false), setSelectedProduct(null) }} className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-gradient-to-r from-[#006e2f] to-[#009e4f] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition">
              <MdAddCircle className="text-xl" />
              Add New Product
            </button>
          </div>
        </div>
        {/* Table Card */}
        <div className="w-full bg-[#f3f4f6] rounded-xl p-2 overflow-hidden">
          <ProductsTable products={products} isLoading={isLoading} isError={isError} onEdit={handleEdit} />
          {/* pagination */}
          {
            !isLoading && (
              pagination?.totalPages > 1 && (
                <div className="w-full border-t border-[#bccbb9]/30 py-4 px-4 sm:px-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
                  {/* Info */}
                  <div className="text-center sm:text-left">
                    <span className="text-[#5c5f60] text-xs sm:text-sm font-medium">
                      Showing {start || "0"} – {end || "0"} of {pagination?.totalProducts || 0} Products
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
      {/* Add product form model */}
      {showAddProductModel && (
        <AddandEditProduct onClose={() => { setShowAddProductModel(false),setIsEdit(false),setSelectedProduct(null),refetch()}} isEdit={isEdit} product={selectedProduct}  />
      )}
    </>
  );
};

export default Products;