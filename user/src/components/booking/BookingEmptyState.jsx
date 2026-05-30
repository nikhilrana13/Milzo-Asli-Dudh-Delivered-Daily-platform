import React from 'react';
import { FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BookingEmptyState = () => {
    const navigate = useNavigate()
  return (
     <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="max-w-md text-center">
            {/* Icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#ecfdf5]">
              <FiPackage
                size={42}
                className="text-[#16a34a]"
              />
            </div>
            {/* Heading */}
            <h2 className="mt-6 text-2xl font-bold text-[#0f172a]">
              No Bookings Yet
            </h2>
    
            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-gray-500">
              You haven't placed any bookings yet.
              Start exploring fresh dairy products
              and create your first subscription.
            </p>
            {/* CTA */}
            <button
              onClick={() => navigate("/vendors")}
              className="mt-6 rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Explore Vendors
            </button>
          </div>
        </div>
  );
}

export default BookingEmptyState;
