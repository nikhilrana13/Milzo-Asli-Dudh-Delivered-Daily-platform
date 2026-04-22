import useAddAndEditProduct from '@/hooks/useAddAndEditProduct';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { MdAddAPhoto, MdClose, MdDelete } from 'react-icons/md';
import { RotatingLines } from 'react-loader-spinner';


const AddandEditProduct = ({ onClose, isEdit, product }) => {
    const imgRef = useRef()
    const [previewImages, setPreviewImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])
    const [existingImages, setExistingImages] = useState([])
    const [imageError, setImageError] = useState("")
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm({
        defaultValues: {
            productName: '',
            description: '',
            category: '',
            priceOptions: [
                { unit: '', quantity: 0, mrp: 0, sellingPrice: 0 },
            ],
            images: []
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'priceOptions'
    })
    const { submitProduct, loading } = useAddAndEditProduct({
        isEdit,
        productId: product?._id,
        onSuccess: () => {
            reset()
            setSelectedImages([])
            setPreviewImages([])
            setExistingImages([])
            setImageError("")
            onClose && onClose()
        }
    })
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        const maxImages = 5
        const maxSize = 5 * 1024 * 1024 // 5MB
        let error = ""
        if (existingImages.length + selectedImages.length + files.length > maxImages) {
            error = `Max ${maxImages} images allowed`
        }
        const validFiles = files.filter((file) => {
            if (file.size > maxSize) {
                error = "Each image must be under 5MB"
                return false
            }
            return true
        })
        if (error) {
            setImageError(error)
            return
        }
        setImageError("") // clear error
        const updated = [...selectedImages, ...validFiles]
        setSelectedImages(updated)
        setPreviewImages(prev => [...prev, ...validFiles])
    }

    const handleClose = () => {
        onClose && onClose()
    }
    // fetch product details
    useEffect(() => {
        if (isEdit && product && existingImages.length === 0) {
            reset({
                productName: product.productName,
                description: product.description,
                category: product.category,
                priceOptions: product.priceOptions
            })
            setExistingImages(product.images || [])
        }
    }, [isEdit, product, reset,existingImages.length])

    const onSubmit = async (data) => {
        if (!isEdit && selectedImages.length === 0) {
            setImageError("At least 1 image is required")
            return
        }
        setImageError("")
        await submitProduct(data, selectedImages, existingImages)
    }


    const allImages = [
        ...existingImages.map(img => ({ type: "existing", data: img })),
        ...previewImages.map(file => ({ type: "new", data: file }))
    ]

    //cleanup memory
    useEffect(() => {
        return () => {
            previewImages.forEach(file => URL.revokeObjectURL(file))
        }
    }, [previewImages])
    
    return (
        <div className='fixed inset-0 border z-[9999] rounded-md flex justify-center items-center p-4 sm:p-6 '>
            {/* backdrop */}
            <div
                className="fixed inset-0 bg-[#161021]/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            {/* content */}
            <div className='relative w-full h-[500px] overflow-y-auto max-w-xl bg-white border p-3 border-[#006e2f]/10 rounded-lg shadow-2xl overflow-hidden custom-scrollbar'>
                {/* heading */}
                <div className='flex justify-between'>
                    <h3 className="text-[1.4rem] font-bold text-[#006e2f]">
                        {isEdit ? "Edit Product" : "Add a Product"}
                    </h3>
                    <button
                        onClick={() => handleClose()}
                        className="text-gray-400 cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className='mt-5 space-y-5 '>
                    {/* product name */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-xs font-semibold text-[#3d4a3d] ml-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name='productName'
                            placeholder="e.g Pure milk"
                            className="w-full px-3 py-3 sm:py-4 bg-[#e7e8ea] rounded-lg focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all placeholder:text-[#6d7b6c] outline-none placeholder:text-sm"
                            {...register("productName", {
                                required: "Product Name is Required", maxLength: {
                                    value: 40,
                                    message: "Max 40 characters allowed"
                                }
                            })}
                        />
                        {errors?.productName && (
                            <p className='text-red-500 text-sm'>{errors?.productName?.message}</p>
                        )}
                    </div>
                    {/* product description */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-xs font-semibold text-[#3d4a3d] ml-1">
                            Description
                        </label>
                        <textarea
                            type="text"
                            name='description'
                            maxLength={200}
                            {...register("description", {
                                required: "Description is Required", maxLength: {
                                    value: 200,
                                    message: "Max 200 characters allowed"
                                }
                            })}
                            className="w-full px-3 py-3 sm:py-4 bg-[#e7e8ea] rounded-lg focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all placeholder:text-[#6d7b6c] outline-none text-sm"
                        />
                        {errors?.description && (
                            <p className='text-red-500 text-sm'>{errors?.description?.message}</p>
                        )}
                    </div>
                    {/* product category */}
                    <div className="space-y-1.5 sm:space-y-2">
                        <label className="block text-xs font-semibold text-[#3d4a3d] ml-1">
                            Select a Category
                        </label>
                        <select name="category" {...register("category", { required: "Please Select a Category" })} className="block w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#006e2f]/20 focus:border-[#006e2f] transition-all dark:text-white outline-none">
                            <option value="">Select a Category</option>
                            <option value="milk">Milk</option>
                            <option value="paneer">Paneer</option>
                            <option value="curd">Curd</option>
                            <option value="lassi">Lassi</option>
                            <option value="lassi">butter</option>
                        </select>
                        {errors?.category && (
                            <p className='text-red-500 text-sm'>{errors?.category?.message}</p>
                        )}
                    </div>
                    {/* price and units */}
                    <div className='space-y-1.5 sm:space-y-2'>
                        <div className='flex justify-between'>
                            <label className="text-xs font-semibold text-[#3d4a3d] ml-1">
                                Pricing & Units
                            </label>
                            <button
                                type="button"
                                onClick={() =>
                                    append({ unit: "", quantity: 0, mrp: 0, sellingPrice: 0 })
                                }
                                className="text-sm text-[#006e2f] font-semibold"
                            >
                                + Add Option
                            </button>
                        </div>
                        {/* Unit and Quantity Section */}
                        {fields?.map((field, index) => {
                            return (
                                <div key={field.id} className="relative grid px-1 my-2 grid-cols-2 md:grid-cols-4 gap-4 border p-3 rounded-lg">
                                    {/* Unit */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] block">
                                            Unit
                                        </label>
                                        <select {...register(`priceOptions.${index}.unit`, { required: "Unit is required" })} className="w-full h-10 px-2.5 rounded-lg bg-white text-sm outline-none focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white border border-gray-200 transition-all"
                                        >
                                            <option value="">Select</option>
                                            <option value="ml">ml</option>
                                            <option value="litre">litre</option>
                                            <option value="kg">kg</option>
                                            <option value="g">g</option>
                                        </select>
                                        {errors?.priceOptions?.[index]?.unit && (
                                            <p className='text-red-500 text-sm'>{errors?.priceOptions[index].unit.message}</p>
                                        )}
                                    </div>
                                    {/* Quantity */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] block">
                                            Qty
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0"
                                            {...register(`priceOptions.${index}.quantity`, {
                                                required: "Qty is required",
                                                min: { value: 1, message: "Min 1" },
                                                valueAsNumber: true
                                            })}
                                            className="w-full h-10 px-2.5 rounded-lg bg-white text-sm outline-none focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white border border-gray-200 transition-all placeholder:text-gray-400"
                                        />
                                        {errors?.priceOptions?.[index]?.quantity && (
                                            <p className='text-red-500 text-sm'>{errors?.priceOptions[index].quantity.message}</p>
                                        )}
                                    </div>
                                    {/* MRP */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] block">
                                            MRP (₹)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            {...register(`priceOptions.${index}.mrp`, {
                                                required: "Mrp is required",
                                                valueAsNumber: true
                                            })}
                                            className="w-full h-10 px-2.5 rounded-lg bg-white text-sm outline-none focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white border border-gray-200 transition-all placeholder:text-gray-400"
                                        />
                                        {errors?.priceOptions?.[index]?.mrp && (
                                            <p className='text-red-500 text-sm'>{errors?.priceOptions[index].mrp.message}</p>
                                        )}
                                    </div>
                                    {/* Selling Price */}
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] block">
                                            Selling Price (₹)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            {...register(`priceOptions.${index}.sellingPrice`, {
                                                required: "Selling Price is Required",
                                                valueAsNumber: true
                                            })}
                                            className="w-full h-10 px-2.5 rounded-lg bg-white text-sm outline-none focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white border border-gray-200 transition-all placeholder:text-gray-400"
                                        />
                                        {errors?.priceOptions?.[index]?.sellingPrice && (
                                            <p className='text-red-500 text-sm'>{errors?.priceOptions[index].sellingPrice.message}</p>
                                        )}
                                    </div>
                                    {fields.length > 1 && (
                                        <button type="button" onClick={() => remove(index)} className="absolute top-2 right-2 p-1.5 rounded-full text-red-500 hover:bg-red-100 transition">
                                            <MdDelete />
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    {/* images */}
                    <div className='space-y-1.5 sm:space-y-2'>
                        <label className="text-xs font-semibold text-[#3d4a3d] ml-1">
                            Upload Images
                        </label>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Upload Card */}
                            {existingImages.length + selectedImages.length < 5 && (
                                  <div
                                onClick={() => imgRef.current.click()}
                                className="h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-[#006e2f]"
                            >
                                <MdAddAPhoto size={28} />
                                <p className="text-xs mt-1">Add Images</p>
                            </div>
                            )}
                          
                            {/* Hidden Input */}
                            <input
                                ref={imgRef}
                                type="file"
                                multiple
                                accept="image/*"
                                hidden
                                disabled={existingImages.length + selectedImages.length >= 5}
                                onChange={handleFileChange}
                            />
                            {/* Preview */}
                            {allImages?.map((img, i) => (
                                <div key={i} className="relative h-32">
                                    <img
                                        src={
                                            img.type === "existing"
                                                ? img.data.url
                                                : URL.createObjectURL(img.data)
                                        }
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                    <button
                                        onClick={() => {
                                            if (img.type === "existing") {
                                                setExistingImages(prev =>
                                                    prev.filter(item => item.url !== img.data.url)
                                                )

                                            } else {
                                                setSelectedImages(prev =>
                                                    prev.filter(file => file !== img.data)
                                                )
                                                setPreviewImages(prev =>
                                                    prev.filter(file => file !== img.data)
                                                )
                                            }
                                        }}
                                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                                    >
                                        <MdClose size={16} />
                                    </button>
                                </div>

                            ))}

                        </div>
                        {imageError && (
                            <p className="text-red-500 text-sm mt-1">
                                {imageError}
                            </p>
                        )}

                    </div>

                    <div className='flex mt-10 justify-end'>
                        <button disabled={loading} type='submit' className='flex items-center gap-2 px-4 sm:px-8 py-1 sm:py-2 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-bold rounded-xl shadow-lg disabled:opacity-50'>
                            {
                                loading ? (
                                    <RotatingLines
                                        visible={true}
                                        height="20"
                                        width="20"
                                        color="#ffffff"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                ) : isEdit ? "Update Product" : "Add Product"
                            }



                        </button>
                    </div>
                </form>

            </div>

        </div>
    );
}


export default AddandEditProduct;
