import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MdCheckCircle, MdOutlineShoppingBag } from 'react-icons/md'

const ProductCard = ({ product, selectedProductData, setSelectedProductData, isLocked }) => {
    const isSelected = selectedProductData?.product?._id === product?._id
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState(0)
    // current selected pricing
    const currentPriceOption = product?.priceOptions?.[selectedOption]
    // increase quantity
    const handleIncreaseQuantity = () => {
        setQuantity((prev) => prev + 1)
    }
    // decrease quantity
    const handleDecreaseQuantity = () => {
        setQuantity((prev) => prev > 1 ? prev - 1 : 1)
    }
    // handle option change
    const handleSelectedOption = (e) => {
        setSelectedOption(Number(e.target.value))
    }
    //  for on click 
    const handleselectedProduct = () => {
        setSelectedProductData({
            product,
            quantity,
            selectedOption
        })
    }
    // only update selected product card    
    useEffect(() => {
        if (!isSelected) return
        setSelectedProductData({
            product,
            quantity,
            selectedOption
        })
    }, [quantity, selectedOption, isSelected])
    // formatted size options
    const sizeOptions = useMemo(() => {
        return (
            product?.priceOptions?.map(option => {
                return `${option?.quantity} ${option?.unit}`
            }) || []
        )
    }, [product])
    return (
        <motion.div
            whileHover={{
                y: -4
            }}
            animate={{
                boxShadow: isSelected
                    ? [
                        "0 0 0 rgba(34,197,94,0.15)",
                        "0 0 20px rgba(34,197,94,0.25)",
                        "0 0 0 rgba(34,197,94,0.15)"
                    ]
                    : "none"
            }}
            transition={isSelected ? {
                duration: 2,
                repeat: Infinity
            } : {
                    duration: 0.25
                }
            }
            className={`group flex flex-col gap-6 rounded-[28px] border bg-white p-6 transition-all duration-300 md:flex-row
           ${isSelected ? "border-[#22c55e] shadow-[0_0_0_4px_rgba(34,197,94,0.12)]" : "border-[#eef0f2]"}
          ${isLocked ? "pointer-events-none opacity-40 blur-[1px]" : "hover:shadow-[0_12px_32px_rgba(25,28,30,0.04)]"}`}>
            {/* image */}
            <div className='relative h-48 w-full overflow-hidden rounded-3xl md:w-48'>
                <img
                    src={product?.images?.[0]?.url || 'https://placehold.co/600x600'}
                    alt={product?.productName || 'Product'}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                {/* badges */}
                <div className='absolute left-3 top-3 flex flex-col gap-2'>
                    <span className='rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#166534]'>
                        {product?.category}
                    </span>
                    {product?.isAvailable ? (
                        <span className='flex items-center gap-1 rounded-full bg-[#dcfce7] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#166534]'>
                            <MdCheckCircle />
                            Available
                        </span>
                    ) : (
                        <span className='rounded-full bg-[#fee2e2] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#dc2626]'>
                            Out Of Stock
                        </span>
                    )}
                </div>
            </div>
            {/* content */}
            <div className='flex flex-1 flex-col justify-between'>
                {/* top */}
                <div>
                    <div className='flex items-start justify-between gap-4'>
                        <div>
                            <h3 className='text-2xl font-black tracking-tight text-[#191c1e]'>
                                {product?.productName || 'NA'}
                            </h3>
                            {product?.totalReviews > 0 && (
                                <p className='mt-1 text-sm text-gray-500'>
                                    {product?.totalReviews} reviews
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='text-3xl font-black text-[#16a34a]'>
                                ₹{currentPriceOption?.sellingPrice || 0}
                            </span>
                            <span className='text-sm font-medium text-gray-500 line-through'>
                                ₹{currentPriceOption?.mrp || 0}
                            </span>
                        </div>
                    </div>
                    <p className='mt-3 max-w-2xl text-sm leading-relaxed text-gray-500'>
                        {product?.description || 'Fresh dairy product available'}
                    </p>
                </div>
                {/* bottom */}
                <div className='mt-6 flex flex-wrap items-center justify-between gap-4'>
                    {/* controls */}
                    <div className='flex flex-wrap items-center gap-4'>
                        {/* size select */}
                        <select
                            value={selectedOption}
                            onChange={handleSelectedOption}
                            className='rounded-2xl border border-[#eef0f2] bg-[#f8fafc] px-4 py-3 text-sm
                        font-semibold text-[#191c1e] outline-none transition-all focus:border-[#22c55e]'
                        >
                            {sizeOptions.map((size, index) => (
                                <option key={index} value={index}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        {/* quantity */}
                        <div className='flex items-center rounded-2xl border border-[#eef0f2] bg-[#f8fafc] p-1'>
                            <button
                                onClick={handleDecreaseQuantity}
                                className='flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-white'
                            >
                                -
                            </button>
                            <span className='w-10 text-center text-sm font-bold text-[#191c1e]'>
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncreaseQuantity}
                                className='flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-white'
                            >
                                +
                            </button>
                        </div>
                    </div>
                    {/* action button */}
                    {
                        !isSelected ? (
                            <button
                                onClick={handleselectedProduct}
                                disabled={!product?.isAvailable}
                                className={`flex items-center gap-2 rounded-2xl px-7 py-3 text-sm font-bold text-white transition-all duration-300 active:scale-95
                                    ${product?.isAvailable
                                        ? 'bg-gradient-to-r from-[#16a34a] to-[#22c55e] shadow-lg shadow-[#22c55e]/20 hover:scale-[1.02]'
                                        : 'cursor-not-allowed bg-gray-300'
                                    }`}>
                                <MdOutlineShoppingBag className='text-lg' />
                                {
                                    isSelected
                                        ? "Selected"
                                        : "Subscribe"
                                }
                            </button>
                        ) : (
                            <div className="flex  items-center gap-2 rounded-2xl bg-[#f0fdf4] px-5 py-3 text-sm font-bold text-[#166534]">
                                 <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                                <MdCheckCircle className="text-lg"/>
                                Selected For Subscription
                            </div>
                        )}
                    {isSelected && (
                        <button onClick={() => setSelectedProductData(null)} className="mt-3 w-full rounded-2xl border border-[#fee2e2] bg-[#fff5f5] px-5 py-3 text-sm font-bold text-[#dc2626] transition-all hover:bg-[#fee2e2]"
                        >
                            Remove Selection

                        </button>
                    )
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard
