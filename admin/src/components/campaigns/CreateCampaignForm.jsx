import { useCreateACampaignMutation } from '@/redux/api/CampaignsApi';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const CreateCampaignForm = ({ onClose }) => {
    const { handleSubmit, register, watch, reset, formState: { errors } } = useForm()
    const today = new Date().toISOString().split("T")[0];
    const [CreateACampaign, { isLoading }] = useCreateACampaignMutation()


    const handleClose = () => {
        onClose && onClose()
    }
    // handle form submit 
    const onSubmit = async (data) => {
        const payload = {
            title: data.title,
            discountType: data.discountType,
            discountValue: Number(data.discountValue),
            maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : null,
            minOrderAmount: data.minOrderAmount ? Number(data.minOrderAmount) : 0,
            applicableFor: data.applicableFor,
            startDate: data.startDate,
            endDate: data.endDate,
        }
        // for(let pair in payload){
        //     console.log(pair + " " + payload[pair])
        // }
        try {
            const res = await CreateACampaign(payload).unwrap()
            toast.success(res?.message)
            reset()
            onClose()
        } catch (error) {
            console.error("failed to create campaign", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <div className='fixed inset-0 border z-[9999] rounded-md flex justify-center items-center p-4 sm:p-6 '>
            {/* overlay */}
            <div onClick={handleClose} className="fixed inset-0 bg-[#161021]/60 backdrop-blur-sm" />
            {/* content */}
            <div className="relative w-full h-[500px] overflow-y-auto max-w-xl bg-white border border-[#006e2f]/10 rounded-lg shadow-2xl overflow-hidden custom-scrollbar">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-[#006e2f]/10 px-5 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#006e2f]">
                            Create a Campaign
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Set up discount offers, eligibility criteria, and campaign schedules to maximize customer engagement across the Milzo platform.
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4 sm:p-6">
                    {/* Campaign Details */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Campaign Details
                        </h4>
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Campaign Title
                                </label>
                                <input type="text" placeholder="e.g. New User Offer 60% OFF" className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("title", {
                                        required: "Title is Required",
                                        setValueAs: (value) => value.trim(),
                                        maxLength: {
                                            value: 40,
                                            message: "Max 40 characters allowed"
                                        }
                                    })}
                                />
                            </div>
                        </div>
                        {errors?.title && (
                            <p className='text-red-500 my-2 text-sm'>{errors?.title?.message}</p>
                        )}
                    </div>
                    {/* Discount Settings */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Discount Settings
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Discount Type
                                </label>
                                <select {...register("discountType", { required: "Discount Type is Required", })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="">Select Discount Type</option>
                                    <option value="percentage">Percentage</option>
                                    <option value="flat">Flat Amount</option>
                                </select>
                                {errors?.discountType && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.discountType?.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Discount Value
                                </label>
                                <input
                                    type="number"
                                    placeholder="60"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("discountValue", {
                                        required: "Discount Value is Required", min: {
                                            value: 1,
                                            message: "Discount must be greater than 0"
                                        }, validate: (value) => {
                                            if (
                                                watch("discountType") === "percentage" &&
                                                Number(value) > 100
                                            ) {
                                                return "Percentage discount cannot exceed 100";
                                            }
                                            return true;
                                        }
                                    })}
                                />
                                {errors?.discountValue && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.discountValue?.message}</p>
                                )}
                            </div>
                            {watch("discountType") === "percentage" && (
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Max Discount
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                        {...register("maxDiscount", {
                                            min: {
                                                value: 1,
                                                message: "Max discount must be greater than 0"
                                            }
                                        })}
                                    />
                                    {errors?.maxDiscount && (
                                        <p className='text-red-500 my-2 text-sm'>{errors?.maxDiscount?.message}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Minimum Order Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="1000"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("minOrderAmount", {
                                        min: {
                                            value: 1,
                                            message: "Minimum order amount must be greater than 0"
                                        }
                                    })}
                                />
                                {errors?.minOrderAmount && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.minOrderAmount?.message}</p>
                                )}
                            </div>

                        </div>
                    </div>
                    {/* Eligibility */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Eligibility Rules
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Applicable For
                                </label>
                                <select {...register("applicableFor", { required: "Applicable For is Required" })} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500">
                                    <option value="">Select Applicable for</option>
                                    <option value="first_subscription">
                                        First Subscription
                                    </option>
                                    <option value="all">
                                        All Users
                                    </option>
                                </select>
                                {errors?.applicableFor && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.applicableFor?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Duration */}
                    <div>
                        <h4 className="text-lg font-semibold text-[#191c1e] mb-4">
                            Campaign Duration
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("startDate", {
                                        required: "Start Date is Required", validate: value =>
                                            value >= today || "Start date cannot be in the past"
                                    })}
                                />
                                {errors?.startDate && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.startDate?.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                                    {...register("endDate", {
                                        required: "End Date is Required", validate: value =>
                                            value > watch("startDate") ||
                                            "End date must be after start date"
                                    })}
                                />
                                {errors?.endDate && (
                                    <p className='text-red-500 my-2 text-sm'>{errors?.endDate?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            onClick={handleClose}
                            type="button"
                            className="px-6 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition"
                        >
                            {isLoading ? "Creating..." : "Create Campaign"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateCampaignForm;
