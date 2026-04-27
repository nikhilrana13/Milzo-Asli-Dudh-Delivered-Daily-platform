import React, { useState } from 'react';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import SubscriptionsTableShimmer from './SubscriptionTableShimmer';
import UpdateBookingStatusModel from './UpdateBookingStatusModel';

const SubscriptionsTable = ({ subscriptions, isLoading, isError }) => {
    const [showModel, setShowModel] = useState(false)
    const [selectedSubId, setSelectedSubId] = useState(null)

    return (
        <>
            <div className='w-full overflow-x-auto custom-scrollbar  bg-white'>
                <table className="w-full text-left border-collapse">
                    {/* Header */}
                    <thead className="bg-[#f8faf8]">
                        <tr className="text-[#6d7b6c] text-xs font-semibold uppercase tracking-wider">
                            <th className="px-5 py-4">Customer</th>
                            <th className="px-4 py-4">Product</th>
                            <th className="px-4 py-4">Timing</th>
                            <th className="px-4 py-4">Start</th>
                            <th className="px-4 py-4">End</th>
                            <th className="px-4 py-4">Status</th>
                            <th className="px-4 py-4">Booking</th>
                            <th className="px-4 py-4">Address</th>
                            <th className="px-4 py-4">Payment</th>
                            <th className="px-4 py-4">Paused Days</th>
                            <th className="px-4 py-4">Action</th>

                        </tr>
                    </thead>
                    {/* Body */}
                    {isLoading ? (
                        <tbody>
                            <SubscriptionsTableShimmer />
                        </tbody>
                    ) : subscriptions?.length > 0 ? (
                        <tbody>
                            {subscriptions.map((sub) => {
                                const username = sub?.userId?.username || "NA";
                                return (
                                    <tr
                                        key={sub?._id}
                                        className="border-t hover:bg-[#f6faf7] transition"
                                    >
                                        {/* CUSTOMER */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#006e2f] to-[#22c55e] flex items-center justify-center text-white font-bold">
                                                    {username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-[#191c1e]">
                                                        {username}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {sub?.userId?.email || "NA"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Product */}
                                        <td className="px-4 py-4 text-sm text-[#3d4a3d]">
                                            {sub?.productId?.productName || "NA"}
                                        </td>
                                        {/* Timing */}
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {sub?.deliveryTime || "Morning"}
                                        </td>
                                        {/* start date */}
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {sub?.startDate
                                                ? new Date(sub.startDate).toLocaleDateString("en-IN")
                                                : "NA"}
                                        </td>
                                        {/* end date */}
                                        <td className="px-4 py-4 text-sm text-gray-600">
                                            {sub?.endDate
                                                ? new Date(sub.endDate).toLocaleDateString("en-IN")
                                                : "Ongoing"}
                                        </td>
                                        {/* Status*/}
                                        <td className="px-4 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${sub?.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : sub?.status === "paused"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : sub?.status === "cancelled"
                                                            ? "bg-red-100 text-red-600"
                                                            : sub?.status === "completed"
                                                                ? "bg-slate-100 text-slate-700"
                                                                : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {sub?.status || "NA"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full font-medium capitalize ${sub?.bookingStatus === "confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : sub?.bookingStatus === "pending"
                                                            ? "bg-amber-100 text-amber-700"
                                                            : sub?.bookingStatus === "cancelled"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {sub?.bookingStatus || "NA"}
                                            </span>
                                        </td>

                                        {/* Address */}
                                        <td className="px-4 py-4 text-sm text-gray-500 max-w-[200px]">
                                            <div className="truncate">
                                                {sub?.deliveryAddress ? (
                                                    <div className="space-y-0.5">
                                                        <p className="font-medium text-gray-700">
                                                            {sub?.deliveryAddress.addressLine}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {sub?.deliveryAddress.city}, {sub?.deliveryAddress?.state} {sub?.deliveryAddress?.pincode}
                                                        </p>
                                                    </div>
                                                ) : sub?.address ? (
                                                    sub?.address
                                                ) : (
                                                    "NA"
                                                )}
                                            </div>
                                        </td>
                                        {/* Payment */}
                                        <td className="px-4 py-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full font-medium ${sub?.paymentStatus === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {sub?.paymentStatus || "NA"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1  text-xs rounded-full font-medium bg-[#eef7f0] text-[#006e2f]">
                                                {sub?.totalPausedDays ?? 0} days
                                            </span>
                                        </td>
                                        {/* action */}
                                        <td className="px-9 py-4">
                                            {sub?.bookingStatus === "pending" ? (
                                                <button
                                                    onClick={() => {
                                                        setSelectedSubId(sub?._id)
                                                        setShowModel(true)
                                                    }}
                                                    className="cursor-pointer hover:text-[#006e2f] transition"
                                                >
                                                    <BsThreeDotsVertical />
                                                </button>
                                            ) : (
                                                <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                                                    Locked
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : isError ? (
                        <tbody>
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-red-500">
                                    Failed to load subscriptions. Please try again.
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="9" className="py-14">
                                    <div className="flex flex-col items-center justify-center text-center gap-4">
                                        {/* Icon */}
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#e8f5e9] to-[#d1fae5] flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-6 h-6 text-[#006e2f]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 7h18M3 12h18M3 17h18"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#191c1e]">
                                            No subscriptions yet
                                        </h3>
                                        <p className="text-sm text-[#5c5f60] max-w-sm">
                                            Once customers start subscribing to your products, you’ll see all
                                            active and past subscriptions listed here.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )}

                </table>
            </div>
            {/* show update booking status dialog */}
            {showModel && (
                <UpdateBookingStatusModel onClose={() => { setShowModel(false) }} id={selectedSubId} />
            )}
        </>

    );
}

export default SubscriptionsTable;
