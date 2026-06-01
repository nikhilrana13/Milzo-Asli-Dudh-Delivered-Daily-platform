import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    MdPause,
    MdPlayArrow,
    MdLocationOn,
    MdCalendarToday,
    MdAccessTime,
    MdVerified
} from 'react-icons/md'
import { formatIndianNumber } from '@/utils/Helpers'
import { useUpdatePauseAndActiveSubsMutation } from '@/redux/api/SubscriptionsApi'
import { toast } from 'react-toastify'

const SubscriptionCard = ({ subscription }) => {
    const [selectedstatus, setSelectedStatus] = useState(subscription?.status)
    const product = subscription?.productId
    const isPaused = selectedstatus === "paused";
    const vendor = subscription?.vendorId
    const image = product?.images?.[0]?.url
    const deliveryAddress = subscription?.deliveryAddress
    const canManageSubscription = ["active", "paused"].includes(selectedstatus);
    const [UpdatePauseAndActiveSubs, { isLoading }] = useUpdatePauseAndActiveSubsMutation()
    // sync local status with latest subscription status from RTK Query
   // keeps optimistic UI updates and server state in sync
    useEffect(() => {
    setSelectedStatus(subscription?.status)
}, [subscription?.status])
    // handle pause and active subscription 
    const handlePauseAndActiveSubs = async (status) => {
        try {
            setSelectedStatus(status)
            const response = await UpdatePauseAndActiveSubs({
                id: subscription?._id,
                status: status
            }).unwrap()
            toast.success(response?.message)
        } catch (error) {
            console.error("Failed to pause and active subscription", error)
            // rollback ui
            setSelectedStatus(subscription?.status)
            return toast.error(error?.data?.message || "Internal server error")
        }
    }


    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-3xl border border-[#eef0f2] bg-white
            shadow-sm hover:shadow-2xl hover:shadow-black/5 transition-all">
            {/* image */}
            <div className="relative h-52 sm:h-64 overflow-hidden">
                <img
                    src={image}
                    alt={product?.productName}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {/* status */}
                <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide backdrop-blur-md border
                ${subscription?.bookingStatus === "pending" ? "bg-yellow-500/90 text-white border-yellow-400" : subscription?.bookingStatus === "confirmed" ? "bg-[#16a34a]/90 text-white border-[#22c55e]" : subscription?.bookingStatus === "cancelled" ? "bg-red-500/90 text-white border-red-400" : "bg-gray-500/90 text-white border-gray-400"}`}
                    >
                        {subscription?.bookingStatus === "pending"
                            ? "Pending Approval"
                            : subscription?.bookingStatus}
                    </span>
                </div>

                {/* vendor */}
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-black text-white capitalize">
                                {product?.productName}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <MdVerified className="text-[#86efac]" />
                                <p className="text-sm text-white/90 font-medium">
                                    {vendor?.displayName}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
                                ${selectedstatus === "completed"
                                        ? "bg-blue-100 text-blue-700"
                                        : selectedstatus === "paused" ? "bg-orange-100 text-orange-700"
                                            : selectedstatus === "cancelled" ? "bg-red-100 text-red-700" :
                                                selectedstatus === "active" ? "bg-green-100 text-green-700" : ""
                                    }`}
                                >
                                    {selectedstatus}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 text-center
                            shadow-lg">
                            <p className="text-xs text-gray-500 font-medium">
                                Per Day
                            </p>
                            <p className="text-xl font-black text-[#191c1e]">
                                ₹{subscription?.pricePerDay}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="p-2 sm:p-6">
                {/* info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* address */}
                    <div className="rounded-2xl bg-[#f8fafc]  p-4 border border-[#eef2f7]">
                        <div className="flex items-start gap-3">
                            <div
                                className="h-10 w-10 rounded-full bg-[#dcfce7] flex items-center justify-center
                                shrink-0"
                            >
                                <MdLocationOn className="text-[#16a34a]" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                    Delivery Address
                                </p>
                                <p className="text-sm text-[#191c1e] line-clamp-2">
                                    {deliveryAddress?.addressLine},{" "}
                                    {deliveryAddress?.city}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* timing */}
                    <div
                        className="rounded-2xl bg-[#f8fafc] p-4 border border-[#eef2f7]">
                        <div className="flex items-start gap-3">
                            <div
                                className="h-10 w-10 rounded-full bg-[#ecfeff] flex items-center justify-center
                                shrink-0"
                            >
                                <MdAccessTime className="text-cyan-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                                    Delivery Slot
                                </p>
                                <p className="text-sm font-semibold text-[#191c1e] capitalize">
                                    {
                                        subscription?.deliveryTimings?.[0]?.slot
                                    }{" "}
                                    •{" "}
                                    {
                                        subscription?.deliveryTimings?.[0]?.time
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* dates */}
                <div
                    className="rounded-2xl bg-[#fafafa] border border-[#f1f5f9]
                    p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="h-10 w-10 rounded-full bg-[#f3f4f6] flex items-center justify-center"
                        >
                            <MdCalendarToday className="text-gray-700" />
                        </div>
                        <div>
                            <p className="text-xs uppercase font-bold tracking-wide text-gray-500">
                                Subscription Period
                            </p>
                            <p className="text-sm font-semibold text-[#191c1e]">
                                {new Date(
                                    subscription?.startDate
                                ).toLocaleDateString("en-GB")}
                                {" "}—{" "}
                                {new Date(
                                    subscription?.endDate
                                ).toLocaleDateString("en-GB")}
                            </p>
                        </div>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="text-xs uppercase font-bold tracking-wide text-gray-500">
                            Total Amount
                        </p>
                        <p className="text-2xl font-black text-[#191c1e]">
                            ₹{formatIndianNumber(subscription?.totalAmount)}
                        </p>
                    </div>

                </div>
                {/* footer */}
                {
                    canManageSubscription && (
                        <div className="flex flex-col sm:flex-row gap-3">

                            {!isPaused ? (
                                <button disabled={isLoading} onClick={() => handlePauseAndActiveSubs("paused")} className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r  from-orange-500 to-orange-400 text-white font-semibold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <MdPause className="text-lg" />
                                    {isLoading ? "Updating..." : "Pause Subscription"}
                                </button>

                            ) : (
                                <button disabled={isLoading} onClick={() => handlePauseAndActiveSubs("active")} className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white  font-semibold shadow-lg shadow-[#22c55e]/20
                            hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                                    <MdPlayArrow className="text-lg" />
                                    {isLoading ? "Updating..." : "Resume Subscription"}
                                </button>
                            )}
                        </div>
                    )
                }

            </div>
        </motion.div>

    )
}

export default SubscriptionCard
