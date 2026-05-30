import React from "react";

const BookingCardShimmer = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#dcfce7] bg-white shadow-sm animate-pulse">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#f0fdf4] bg-[#f8fffa] px-5 py-4">
        <div>
          <div className="h-3 w-20 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-28 rounded bg-gray-200" />
        </div>

        <div className="h-7 w-16 rounded-full bg-gray-200" />
      </div>

      <div className="p-5">

        {/* Product */}
        <div className="flex gap-4">
          <div className="h-24 w-24 rounded-2xl bg-gray-200" />

          <div className="flex-1">
            <div className="h-5 w-40 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-28 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-20 rounded bg-gray-200" />
          </div>
        </div>

        {/* Amount Section */}
        <div className="mt-5 rounded-2xl bg-[#f8fafc] p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
        </div>

        {/* Dates */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border p-4">
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
          </div>

          <div className="rounded-2xl border p-4">
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>

        {/* Address */}
        <div className="mt-5 rounded-2xl border p-4">
          <div className="h-4 w-32 rounded bg-gray-200" />

          <div className="mt-3 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
        </div>

        {/* Delivery Slot */}
        <div className="mt-4 rounded-2xl border p-4">
          <div className="h-4 w-28 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
        </div>

        {/* Footer */}
        <div className="mt-5 border-t pt-4">
          <div className="h-3 w-32 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default BookingCardShimmer;