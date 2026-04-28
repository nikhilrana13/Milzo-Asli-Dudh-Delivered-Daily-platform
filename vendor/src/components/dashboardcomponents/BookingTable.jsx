import BookingsEmptyState from "./BookingsEmptyState";
import BookingsTableShimmer from "./BookingsTableShimmer";
import noimg from "/noimg.jpg"




const BookingTable = ({ bookings, isLoading, isError }) => {

    return (
        <div className='w-full'>
            {/* Desktop Table */}
            <div className='hidden md:block overflow-x-auto'>
                <table className="w-full text-left border-collapse">
                    {/* Header */}
                    <thead>
                        <tr className="text-[#6d7b6c] text-xs font-bold uppercase tracking-widest">
                            <th className="px-4 py-3">Product</th>
                            <th className="px-3 py-3">Customer</th>
                            <th className="px-3 py-3">Duration</th>
                            <th className="px-3 py-3">Amount</th>
                            <th className="px-3 py-3">Status</th>
                            <th className="px-4 py-3">Time & Date</th>
                        </tr>
                    </thead>
                    {isLoading ? (
                        <tbody>
                            <BookingsTableShimmer />
                        </tbody>
                    ) : bookings?.length > 0 ? (
                        <tbody>
                            {bookings?.map((booking) => {
                                const startDate = new Date(booking?.startDate);
                                const endDate = new Date(booking?.endDate);
                                const formattedStart = startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
                                const formattedEnd = endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
                                // Format booking creation timestamp
                                const bookingCreatedDate = new Date(booking?.createdAt);
                                const formattedBookingDate = bookingCreatedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                                const formattedBookingTime = bookingCreatedDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
                                const statusColor = {
                                    'paid': 'bg-green-100 text-green-700',
                                    'pending': 'bg-yellow-100 text-yellow-700',
                                    'cancelled': 'bg-red-100 text-red-700',
                                    'delivered': 'bg-blue-100 text-blue-700'
                                };
                                return (
                                    <tr key={booking?._id} className="border-t bg-white hover:bg-gray-50 transition">
                                        {/* Product */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={booking?.productId?.images?.[0]?.url || noimg}
                                                    onError={(e) => { e.target.src = noimg; }}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-sm">{booking?.productId?.productName || "NA"}</p>
                                                    <p className="text-xs text-gray-500">{booking?.quantity} {booking?.unit}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* Customer */}
                                        <td className="px-3 py-3 text-sm">
                                            <div>
                                                <p className="font-medium">{booking?.userId?.username || "NA"}</p>
                                                <p className="text-xs text-gray-500">{booking?.userId?.email || "NA"}</p>
                                            </div>
                                        </td>
                                        {/* Duration */}
                                        <td className="px-3 py-3 text-sm">
                                            <div>
                                                <p className="font-medium">{formattedStart} - {formattedEnd}</p>
                                                <p className="text-xs text-gray-500">{booking?.totalDays} days</p>
                                            </div>
                                        </td>
                                        {/* Amount */}
                                        <td className="px-3 py-3">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[#006e2f] font-semibold">
                                                    ₹{Number(booking?.totalAmount).toLocaleString("en-IN")}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    ₹{Number(booking?.pricePerDay).toLocaleString("en-IN")}/day
                                                </span>
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td className="px-3 py-3 whitespace-nowrap">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[booking?.status] || 'bg-gray-100 text-gray-700'}`}>
                                                {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1) || "Pending"}
                                            </span>
                                        </td>
                                        {/* Time & Date */}
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-1">
                                                <p className="font-medium text-gray-800 text-sm">{formattedBookingDate}</p>
                                                <p className="text-xs text-gray-500">{formattedBookingTime}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    ) : isError ? (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-red-500">
                                    Error loading bookings. Please try again.
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                          <tbody>
                        <tr>
                            <td colSpan="6">
                                <BookingsEmptyState />
                            </td>
                        </tr>
                    </tbody>
                    )}
                </table>
            </div>

            {/* Mobile Card Layout */}
            <div className='md:hidden space-y-3'>
                {isLoading ? (
                    <div className='space-y-3'>
                        <div className='bg-gray-200 animate-pulse rounded-lg h-40'></div>
                    </div>
                ) : bookings?.length > 0 ? (
                    bookings?.map((booking) => {
                        const startDate = new Date(booking?.startDate);
                        const endDate = new Date(booking?.endDate);
                        const formattedStart = startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
                        const formattedEnd = endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

                        // Format booking creation timestamp
                        const bookingCreatedDate = new Date(booking?.createdAt);
                        const formattedBookingDate = bookingCreatedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                        const formattedBookingTime = bookingCreatedDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

                        const statusColor = {
                            'paid': 'bg-green-100 text-green-700',
                            'pending': 'bg-yellow-100 text-yellow-700',
                            'cancelled': 'bg-red-100 text-red-700',
                            'delivered': 'bg-blue-100 text-blue-700'
                        };

                        return (
                            <div key={booking?._id} className='bg-white border border-gray-200 rounded-lg p-4 space-y-3'>
                                {/* Product Info */}
                                <div className='flex items-center gap-3 pb-3 border-b'>
                                    <img
                                        src={booking?.productId?.images?.[0]?.url || noimg}
                                        onError={(e) => { e.target.src = noimg; }}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                    <div className='flex-1'>
                                        <p className="font-semibold text-sm">{booking?.productId?.productName || "NA"}</p>
                                        <p className="text-xs text-gray-500">{booking?.quantity} {booking?.unit}</p>
                                    </div>
                                </div>

                                {/* Customer & Duration */}
                                <div className='space-y-2'>
                                    <div>
                                        <p className='text-xs text-gray-600 font-medium'>Customer</p>
                                        <p className='text-sm text-gray-800 font-medium'>{booking?.userId?.username || "NA"}</p>
                                        <p className='text-xs text-gray-500'>{booking?.userId?.email || "NA"}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-600 font-medium'>Duration</p>
                                        <p className='text-sm text-gray-800'>{formattedStart} - {formattedEnd}</p>
                                        <p className='text-xs text-gray-500'>{booking?.totalDays} days</p>
                                    </div>
                                </div>

                                {/* Amount & Status */}
                                <div className='flex items-center justify-between pt-2 border-t'>
                                    <div>
                                        <p className='text-xs text-gray-600 font-medium'>Total Amount</p>
                                        <p className='text-sm font-semibold text-[#006e2f]'>
                                            ₹{Number(booking?.totalAmount).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[booking?.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1) || "Pending"}
                                    </span>
                                </div>

                                {/* Time & Date */}
                                <div className='pt-2 border-t'>
                                    <p className='text-xs text-gray-600 font-medium mb-2'>Booking Time</p>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-sm font-medium text-gray-800'>{formattedBookingDate}</p>
                                        <p className='text-xs text-gray-500'>{formattedBookingTime}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : isError ? (
                    <div className='text-center py-8 text-red-500'>
                        Error loading bookings. Please try again.
                    </div>
                ) : (
                    <div className='flex justify-center items-center py-8'>
                        <BookingsEmptyState />
                    </div>
                )}
            </div>
        </div>
    )
}


export default BookingTable

