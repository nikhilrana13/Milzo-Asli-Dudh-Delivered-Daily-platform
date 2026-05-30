import React from "react";
import { MdErrorOutline } from "react-icons/md";


const BookingErrorState = ({onRetry}) => {
  

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(239,68,68,0.08)]">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <MdErrorOutline
            size={48}
            className="text-red-500"
          />
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-2xl font-bold text-[#0f172a]">
          Unable to Load Bookings
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-500">
          We couldn't fetch your booking history
          right now. Please check your connection
          and try again.
        </p>

        {/* Info Box */}
        <div className="mt-5 rounded-2xl bg-red-50 p-4">
          <p className="text-sm text-red-600">
            Your bookings are safe. This is only a
            temporary loading issue.
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] py-3 font-semibold text-white shadow-lg transition duration-200 hover:scale-[1.02]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default BookingErrorState