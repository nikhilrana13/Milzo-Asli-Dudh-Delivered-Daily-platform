import React from 'react';
import { MdAccessTime, MdLocationOn } from "react-icons/md";
import { FiCalendar, FiPackage } from "react-icons/fi";

const BookingCard = ({ booking }) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-[#dcfce7] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Status Header */}
      <div className="flex items-center justify-between border-b border-[#f0fdf4] bg-[#f8fffa] px-5 py-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            Booking ID
          </p>
          <p className="font-semibold text-[#0f172a]">
            #{booking?._id?.slice(-8)}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border
           ${booking.status === "paid"
              ? "bg-green-50 text-green-700 border-green-200"
              : booking.status === "failed"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }
  `}
        >
          <span
            className={`w-2 h-2 rounded-full ${booking.status === "paid"
                ? "bg-green-500"
                : booking.status === "failed"
                  ? "bg-red-500"
                  : "bg-yellow-500 animate-pulse"
              }`}
          />

          {booking.status === "pending" && "Payment Pending"}
          {booking.status === "paid" && "Payment Successful"}
          {booking.status === "failed" && "Payment Failed"}
        </span>

      </div>

      <div className="p-5">
        {/* Product */}
        <div className="flex gap-4">
          <img
            src={booking?.productId?.images?.[0]?.url}
            alt={booking?.productId?.productName}
            className="h-24 w-24 rounded-2xl object-cover border"
          />

          <div className="flex-1">
            <h3 className="line-clamp-2 text-lg font-bold text-[#0f172a]">
              {booking?.productId?.productName}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Vendor:{" "}
              <span className="font-medium text-[#047857]">
                {booking?.vendorId?.displayName}
              </span>
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <FiPackage />
              <span>
                {booking?.quantity} {booking?.unit}
              </span>
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="mt-5 rounded-2xl bg-[#f8fafc] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Total Amount
            </span>

            <span className="text-xl font-bold text-[#16a34a]">
              ₹{booking?.totalAmount}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Price / Day
            </span>

            <span className="font-medium">
              ₹{booking?.pricePerDay}
            </span>
          </div>
        </div>

        {/* Subscription Duration */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FiCalendar />
              <span className="text-xs">
                Start Date
              </span>
            </div>

            <p className="mt-2 font-semibold">
              {new Date(
                booking?.startDate
              ).toLocaleDateString("en-GB")}
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FiCalendar />
              <span className="text-xs">
                End Date
              </span>
            </div>

            <p className="mt-2 font-semibold">
              {new Date(
                booking?.endDate
              ).toLocaleDateString("en-GB")}
            </p>
          </div>
        </div>

        {/* Delivery */}
        <div className="mt-5 rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-[#047857]">
            <MdLocationOn size={18} />
            <span className="font-medium">
              Delivery Address
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            {booking?.deliveryAddress?.addressLine},
            {" "}
            {booking?.deliveryAddress?.city},
            {" "}
            {booking?.deliveryAddress?.state}
            {" - "}
            {booking?.deliveryAddress?.pincode}
          </p>
        </div>

        {/* Delivery Time */}
        <div className="mt-4 rounded-2xl border p-4">
          <div className="flex items-center gap-2 text-[#047857]">
            <MdAccessTime size={18} />
            <span className="font-medium">
              Delivery Slot
            </span>
          </div>

          {booking?.deliveryTimings?.map((slot, index) => (
            <p
              key={index}
              className="mt-2 text-sm text-gray-600"
            >
              {slot?.slot} • {slot?.time}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5  border-t pt-4">
          <span className="text-xs text-gray-500">
            Created on{" "}
            {new Date(
              booking?.createdAt
            ).toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
