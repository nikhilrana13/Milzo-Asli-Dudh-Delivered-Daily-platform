import React from 'react';

const BookingsEmptyState = () => {
  return (
    <div className="w-full py-12 flex items-center justify-center">
  <div className="flex flex-col items-center text-center gap-4 max-w-md">
    {/* Icon */}
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#e8f5e9] to-[#d1fae5] flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-[#006e2f]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10m-11 8h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </div>
    {/* Title */}
    <h3 className="text-lg font-semibold text-[#191c1e]">
      No bookings yet
    </h3>
    {/* Subtitle */}
    <p className="text-sm text-[#5c5f60] leading-relaxed">
      Once customers start placing orders, all booking details will appear here.
      Stay ready to manage and track deliveries smoothly.
    </p>
  </div>
</div>
  );
}

export default BookingsEmptyState;
