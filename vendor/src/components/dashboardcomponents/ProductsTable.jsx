import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import noimg from "/noimg.jpg"
import AppleToggle from './AppleToggle';
import ProductCardShimmer from './ProductCardShimmer';
import EmptyProductsState from './EmptyProductState';
import { toast } from 'react-toastify';
import { useDeleteProductMutation, useUpdateProductStatusMutation } from '@/redux/api/GetVendorProducts';

const ProductsTable = ({ products, isLoading, isError, onEdit, }) => {
    // console.log("products",allproducts)    
    const [toggleId, setToggleId] = useState(null)
    const [deleteprojectId, setDeleteProjectId] = useState(null)
    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation()
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductStatusMutation()
    // handle product isAvailable toggle 
    const handleToggle = async (productId, currentStatus) => {
        try {
            setToggleId(productId)
            const res = await updateProduct({ id: productId, isAvailable: !currentStatus }).unwrap()
            toast.success(res?.message)
        } catch (error) {
            console.error("failed to toggle", error)
            toast.error(error?.data?.message || "Internal server error")
        } finally {
            setToggleId(null)
        }
    }
    // handle delete 
    const handleDelete = async (productId) => {
        try {
            setDeleteProjectId(productId)
            const res = await deleteProduct(productId).unwrap()
            toast.success(res?.messsage || "Product Deleted")
        } catch (error) {
            console.error("failed to delete product", error)
            toast.error(error?.data?.message || "Internal server error")
        } finally {
            setDeleteProjectId(null)
        }
    }

    return (
        <div className='w-full overflow-x-auto'>
            <table className="w-full text-left border-collapse">
                {/* Header */}
                <thead>
                    <tr className="text-[#6d7b6c] text-xs font-bold uppercase tracking-widest">
                        <th className="px-4 py-3">Product</th>
                        <th className="px-3 py-3">Units</th>
                        <th className="px-3 py-3">Pricing</th>
                        <th className="px-3 py-3">Stock</th>
                        <th className="px-3 py-3">Available</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                {isLoading ? (
                    <tbody>
                        <ProductCardShimmer />
                    </tbody>
                ) : products?.length > 0 ? (
                    <tbody>
                        {products?.map((product) => {
                            return (
                                <tr key={product?._id} className="border-t bg-white  hover:bg-gray-50 transition">
                                    {/* Product */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={product?.images?.[0]?.url || noimg} onError={(e) => { e.target.src = noimg; }} className="w-10 h-10 rounded-lg" />
                                            <div>
                                                <p className="font-semibold text-sm">{product?.productName || "NA"}</p>
                                                <p className="text-xs text-gray-500">{product?.category || "NA"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Units */}
                                    <td className="px-3 py-3 text-sm">
                                        {product?.priceOptions?.map(option => `${option.quantity}${option.unit}`).join(', ') || 'N/A'}
                                    </td>
                                    {/* Pricing */}
                                    <td className="px-3 py-3">
                                        <div className="flex flex-col gap-1">
                                            {product?.priceOptions?.map((option, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs">
                                                    <span className="text-[#006e2f] font-semibold">
                                                        ₹{Number(option?.sellingPrice).toLocaleString("en-IN")}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        ({option.quantity}{option.unit})
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    {/* Stock */}
                                    <td className="px-3 py-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${product?.isAvailable ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {product?.isAvailable ? "In Stock" : "Out of stock"}
                                        </span>
                                    </td>

                                    {/* Toggle */}
                                    <td className="px-3 py-3">
                                        <div className="flex items-center gap-2">
                                            <AppleToggle
                                                checked={toggleId === product?._id
                                                    ? !product?.isAvailable
                                                    : product?.isAvailable}
                                                disabled={
                                                    toggleId === product?._id || isUpdating
                                                }
                                                onChange={() => handleToggle(product?._id, product?.isAvailable)}
                                            />
                                            {toggleId === product?._id && (
                                                <div className="w-4 h-4 border-2 border-gray-300 border-t-[#006e2f] rounded-full animate-spin"></div>
                                            )}
                                        </div>
                                    </td>
                                    {/* Actions */}
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => onEdit(product)} className="p-1 hover:bg-gray-100 rounded">
                                                <MdEdit />
                                            </button>
                                            <button disabled={deleteprojectId === product?._id || isDeleting} onClick={() => handleDelete(product?._id)} className="p-1 hover:bg-red-100 text-red-500 rounded flex items-center justify-center">
                                                {deleteprojectId === product?._id ? (
                                                    <div className="w-4 h-4 border-2 border-red-400 border-t-red-600 rounded-full animate-spin"></div>
                                                ) : (
                                                    <MdDelete />
                                                )
                                                }

                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                ) : isError ? (
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-red-500">
                                Error loading products. Please try again.
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="6">
                                <EmptyProductsState />
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}

export default ProductsTable;


