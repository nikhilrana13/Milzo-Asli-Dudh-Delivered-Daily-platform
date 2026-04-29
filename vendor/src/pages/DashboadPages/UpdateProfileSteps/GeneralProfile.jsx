import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdAdd, MdBadge, MdClose, MdLocationOn } from 'react-icons/md';
import noimg from "/noimg.jpg"



const GeneralProfile = () => {
    const [Imagepreview, setImagePreview] = useState(null)
    const { register, control, watch, setValue, formState: { errors } } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "contactnumbers"
    })
    const profilePic = watch("profilePic")
    // ensure atleast 1 field exists
    useEffect(() => {
        if (fields.length === 0) {
            append("")
        }
    }, [])

    const handleInputChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        // preview
        setImagePreview(URL.createObjectURL(file))
        setValue("profilePic", file)
    }
    // clean up 
    useEffect(() => {
        return () => {
            if (Imagepreview) {
                URL.revokeObjectURL(Imagepreview)
            }
        }
    }, [Imagepreview])

    return (
        <div className='flex flex-col md:flex-row gap-5'>
            <div className="md:col-span-7  bg-white rounded-[24px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <MdBadge className="text-[#006e2f] text-2xl" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#191c1e]">
                        General Profile
                    </h3>
                </div>
                <div className="space-y-5 sm:space-y-6">
                    {/* Username */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                            Username
                        </label>
                        <input
                            type="text"
                            name='username'
                            placeholder='John'
                            className="w-full bg-[#e7e8ea]  rounded-full px-4 sm:px-5 py-3 "
                            {...register("username", {
                                required: "username is required",
                                maxLength: {
                                    value: 50,
                                    message: "Max 50 characters allowed",
                                },
                            })}
                        />
                    </div>

                    {/* Profile Picture */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                            Profile Image
                        </label>
                        <div className="relative group w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-dashed border-[#006e2f]/30 bg-[#f6f7fb] cursor-pointer shadow-sm hover:shadow-md transition-all">
                            {/* IMAGE */}
                            <img
                                src={Imagepreview || (typeof profilePic === "string" && profilePic ? profilePic : noimg)}
                                alt="Vendor Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* EMPTY STATE */}
                            {!Imagepreview && (!profilePic || (typeof profilePic !== "string")) && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 group-hover:bg-white transition-colors">
                                    <FaCloudUploadAlt className="text-2xl text-[#006e2f] mb-1" />
                                    <span className="text-[9px] font-bold text-[#006e2f] uppercase tracking-wider">
                                        Upload
                                    </span>
                                </div>
                            )}
                            {/* HOVER OVERLAY */}
                            {(Imagepreview || (typeof profilePic === "string" && profilePic)) && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-semibold px-2 py-1 rounded bg-black/70">
                                        Change
                                    </span>
                                </div>
                            )}
                            {/* FILE INPUT */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleInputChange}
                                name="profilePic"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 text-center">
                            PNG, JPG, WEBP • MAX 11 MB
                        </p>
                    </div>
                    {/* Business Display Name */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                            Business Display Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter business name"
                            className="w-full bg-[#e7e8ea] rounded-full px-4 sm:px-5 py-3 focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition outline-none"
                            {...register("displayName", {
                                required: "Display Name is required",
                                maxLength: {
                                    value: 50,
                                    message: "Max 50 characters allowed",
                                },
                            })}
                        />
                        {errors.displayName && (
                            <p className="text-red-500 text-sm">
                                {errors.displayName.message}
                            </p>
                        )}
                    </div>
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full bg-[#e7e8ea] rounded-full px-4 sm:px-5 py-3 focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition outline-none"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    {/* description */}
                    <div className="space-y-1.5 pt-2">
                        <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Tell your story..."
                            className="w-full bg-[#e7e8ea] rounded-lg px-4 sm:px-5 py-3 focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition outline-none resize-none"
                            {...register("description")}
                        />
                    </div>
                </div>
            </div>
            <div className="md:col-span-5 max-h-[500px] bg-white rounded-[24px] p-6 sm:p-8 shadow-sm hover:shadow-md flex flex-col transition">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <MdLocationOn className="text-[#006e2f] text-2xl" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#191c1e]">
                        Contact & Location
                    </h3>
                </div>
                <div className="space-y-6 flex-1">
                    {/* Phone Numbers */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-[#6d7b6c] uppercase tracking-wider flex justify-between items-center">
                            Contact Numbers
                            <button
                                type="button"
                                onClick={() => append("")}
                                className="text-[#006e2f] flex items-center gap-1 text-xs font-semibold"
                            >
                                <MdAdd /> add more
                            </button>
                        </label>
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        placeholder="+91 XXXXX XXXXX"
                                        className="flex-1 bg-[#e7e8ea] rounded-full px-4 sm:px-5 py-3 outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                                        {...register(`contactnumbers.${index}`, {
                                            required: index === 0
                                                ? "Primary phone is required"
                                                : false,
                                            pattern: {
                                                value: /^[0-9+\s]{10,15}$/,
                                                message: "Invalid phone number",
                                            },
                                        })}
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                                        >
                                            <MdClose />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {errors.contactnumbers?.[0] && (
                                <p className="text-red-500 text-sm">
                                    {errors.contactnumbers[0].message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* City + Pincode */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* City */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                                City
                            </label>
                            <input
                                type="text"
                                placeholder="Enter city"
                                className="w-full bg-[#e7e8ea] rounded-full px-4 sm:px-5 py-3 outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                                {...register("city", {
                                    required: "City is required",
                                    maxLength: {
                                        value: 50,
                                        message: "Max 50 characters allowed",
                                    },
                                })}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-sm">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>
                        {/* Pincode */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold text-[#6d7b6c] tracking-wider">
                                Pincode
                            </label>
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="6-digit code"
                                className="w-full bg-[#e7e8ea] rounded-full px-4 sm:px-5 py-3 outline-none focus:ring-2 focus:ring-[#006e2f]/20"
                                {...register("pincode", {
                                    required: "Pincode is required",
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "Enter valid 6-digit pincode",
                                    },
                                })}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, "");
                                }}
                            />
                            {errors.pincode && (
                                <p className="text-red-500 text-sm">
                                    {errors.pincode.message}
                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralProfile;
