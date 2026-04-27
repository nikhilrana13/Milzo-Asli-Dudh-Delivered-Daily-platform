import { useUpdateBookingStatusMutation } from '@/redux/api/GetVendorSubscriptionsApi';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';

const UpdateBookingStatusModel = ({ onClose,id}) => {
    const [selectedStatus,setSelectedStatus] = useState("")
    const [updateBooking,{isLoading}] = useUpdateBookingStatusMutation()

    const handleInput = (input)=>{
        setSelectedStatus(input)
    }

    const HandleUpdateStatus = async()=>{
        try {
             const res = await updateBooking({id,status:selectedStatus}).unwrap()
             toast.success(res?.message)
             onClose()
        } catch (error) {
            console.error("Failed to update Booking status", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-[#bccbb9]/30 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h3 className="text-lg font-semibold text-[#191c1e]">
                        Update Booking Status
                    </h3>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-md hover:bg-gray-100 transition"
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="px-5 py-4 flex flex-col gap-4">

                    <p className="text-sm text-[#5c5f60]">
                        Change the current booking status for this subscription.
                    </p>

                    {/* Status buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleInput("confirmed")} className={`py-2 rounded-lg text-sm font-medium  transition ${selectedStatus === "confirmed" ? "bg-green-600 text-white":"bg-green-100 text-green-700 hover:bg-green-200"}`}>
                            Confirm
                        </button>
                        <button onClick={() => handleInput("cancelled")}  className={`py-2 rounded-lg text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition ${selectedStatus === "cancelled" ? "bg-red-600 text-white" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>
                            Cancelled
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Close
                    </button>

                    <button onClick={HandleUpdateStatus} disabled={!selectedStatus || isLoading} className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-medium shadow hover:shadow-md transition">
                        {isLoading ? "Updating..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookingStatusModel;
