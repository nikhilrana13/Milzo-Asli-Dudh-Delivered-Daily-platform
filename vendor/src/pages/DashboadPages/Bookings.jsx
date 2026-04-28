import BookingTable from '@/components/dashboardcomponents/BookingTable';
import StatsCard from '@/components/dashboardcomponents/StatsCard';
import StatCardShimmer from '@/components/dashboardcomponents/StatsCardShimmer';
import { useGetBookingStatsQuery } from '@/redux/api/BookingStatsApi';
import { useGetVendorBookingsQuery } from '@/redux/api/GetVendorBookingsApi';
import React, { useState } from 'react';
import { FcCancel } from 'react-icons/fc';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdCalendarMonth, MdPendingActions } from 'react-icons/md';

const Bookings = () => {
  const statsQuery = useGetBookingStatsQuery()
  const stats = statsQuery?.data?.data?.stats
  const [selectedStatus, setSelectedStatus] = useState("")
  const [page, setPage] = useState(1)
  const bookingsQuery = useGetVendorBookingsQuery({ page, limit: 6, status: selectedStatus })
  const bookings = bookingsQuery?.data?.data?.bookings || []
  const pagination = bookingsQuery?.data?.data?.pagination || {}

  const statsData = [
    {
      icon: MdCalendarMonth,
      label: "Total Bookings",
      value: statsQuery.isError ? "--" : stats?.totalBookings || 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: IoPeopleSharp,
      label: "Paid Bookings",
      value: statsQuery.isError ? "--" : stats?.paidBookings || 0,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: FcCancel,
      label: "failed Bookings",
      value: statsQuery.isError ? "--" : stats?.failedBookings || 0,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      icon: MdPendingActions,
      label: "Pending Bookings",
      value: statsQuery.isError ? "--" : stats?.pendingBooking ?? 0,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0;
  const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalBookings)
  return (
    <div className='w-full p-5 flex flex-col gap-8'>
      {/* heading */}
      <div className="max-w-2xl">
        <span className="text-[#735c00] font-bold tracking-widest uppercase text-xs mb-2 block">
          Milzo Order Management
        </span>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] mb-2">
          Booking Overview
        </h2>

        <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
          Get a complete overview of all customer bookings. Stay updated with order timelines,
          track payments, and manage deliveries efficiently for a consistent{" "}
          <span className="font-medium">customer experience</span>.
        </p>
      </div>
      {/* stats card */}
      {statsQuery?.isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
          {Array(4).fill(0).map((_, i) => <StatCardShimmer key={i} />)}
        </div>
      ) : statsQuery?.isError ? (
        <p className="text-red-500 text-center">Failed to load stats</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
          {statsData.map((stat, i) => <StatsCard key={i} {...stat} />)}
        </div>
      )
      }
      {/* Bookings table */}
      <div className="w-full bg-[#f3f4f6] rounded-xl overflow-hidden">
        {/* filter */}
        <div className="p-4 bg-white flex flex-wrap gap-5 justify-start">
        <select onChange={(e)=>setSelectedStatus(e.target.value)} className="bg-[#F2F3F5]  text-black text-sm px-3 py-2 rounded-xl">
          <option value="">Payment Status</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
    </div>
        <BookingTable bookings={bookings} isLoading={bookingsQuery?.isLoading} isError={bookingsQuery?.isError} />
        {/* pagination */}
        {
          !bookingsQuery?.isLoading && (
            pagination?.totalPages > 1 && (
              <div className="w-full border-t border-[#bccbb9]/30 py-4 px-4 sm:px-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
                {/* Info */}
                <div className="text-center sm:text-left">
                  <span className="text-[#5c5f60] text-xs sm:text-sm font-medium">
                    Showing {start || "0"} – {end || "0"} of {pagination?.totalBookings || 0} Bookings
                  </span>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                  {/* Prev */}
                  <button
                    onClick={() => page > 1 && setPage((prev) => prev - 1)}
                    disabled={page === 1}
                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg font-medium 
                   border border-[#006e2f]/20 text-[#006e2f] bg-white hover:bg-[#e8f5e9] disabled:opacity-40 transition">
                    ←
                    <span className="hidden sm:inline ml-1">Prev</span>
                  </button>
                  {/* Page Info */}
                  <span className="text-[#3d4a3d] text-xs sm:text-sm font-semibold">
                    {pagination?.currentPage} / {pagination?.totalPages}
                  </span>
                  {/* Next */}
                  <button
                    onClick={() =>
                      page < pagination?.totalPages && setPage((prev) => prev + 1)
                    }
                    disabled={page === pagination?.totalPages}
                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg font-medium 
                    bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white shadow-sm hover:shadow-md hover:scale-[1.02] 
                    disabled:opacity-40 transition"
                  >
                    <span className="hidden sm:inline mr-1">Next</span>
                    →
                  </button>
                </div>
              </div>
            )
          )
        }
      </div>



    </div>
  );
}

export default Bookings;
