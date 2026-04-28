import React from 'react';

const SubsFilterbar = ({ setSelectedPaymentStatus,setSelectedBookingStatus}) => {
  return (
     <div className="p-4 bg-white flex flex-wrap gap-5 justify-start">
        <select onChange={(e)=>setSelectedPaymentStatus(e.target.value)} className="bg-[#F2F3F5]  text-black text-sm px-3 py-2 rounded-xl">
          <option value="">Payment Status</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
       <select onChange={(e)=>setSelectedBookingStatus(e.target.value)} className="bg-[#F2F3F5] text-black text-sm px-3 py-2 rounded-xl">
          <option value="">Booking Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
    </div>
  );
}

export default SubsFilterbar;
