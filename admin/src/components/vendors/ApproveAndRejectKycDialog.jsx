import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useApproveAndRejectVendorMutation } from '@/redux/api/VendorApi';

const ApproveAndRejectKycDialog = ({ onClose, kycDetails, vendorId, vendorCurrentStatus }) => {
    const [rejectedReason, setRejectedReason] = useState("")
    const [ApproveAndRejectVendor, { isLoading }] = useApproveAndRejectVendorMutation()

    const handleClose = () => {
        onClose && onClose()
    }
    const handleApproveAndReject = async (status) => {
        if (!status) {
            return toast.error("Please choose an action")
        }
        if (status === "rejected" && !rejectedReason.trim()) {
            return toast.error("Please enter a rejected reason")
        }
        if (!vendorId) {
            return toast.error("Vendor ID is missing")
        }
        try {
            const res = await ApproveAndRejectVendor({
                vendorId,
                status,
                rejectedReason: status === "rejected" ? rejectedReason.trim() : ""
            }).unwrap()
            toast.success(res?.message)
            onClose()
        } catch (error) {
            console.error("Failed to update vendor KYC", error)
            toast.error(error?.data?.message || "Internal server error")
        }
    }
    return (
        <div className="fixed inset-0 border z-[9999] rounded-md flex justify-center items-center p-4 sm:p-6 ">
            {/* backdrop */}
            <div
                className="fixed inset-0 bg-[#161021]/60 backdrop-blur-sm"
                onClick={() => handleClose()}
            />
            {/* content */}
            <div className='relative w-full h-[500px] overflow-y-auto max-w-xl bg-white border  border-[#006e2f]/10 rounded-lg shadow-2xl overflow-hidden custom-scrollbar'>

                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-[#006e2f]/10 px-5 py-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-[#006e2f]">
                            Vendor KYC Details
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            Review submitted KYC information and documents
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>
                {/* details */}

                <div className="p-5 space-y-5">
                    {/* Aadhar Image */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#006e2f] mb-3">
                            Aadhaar Documents ({kycDetails?.aadharImages?.length || 0})
                        </h4>
                        {kycDetails?.aadharImages?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {kycDetails?.aadharImages?.map((image, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden rounded-xl border border-[#006e2f]/10 bg-[#f8fafc]"
                                    >
                                        <img
                                            src={image}
                                            alt={`Aadhar Document ${index + 1}`}
                                            className="w-full h-64 object-contain cursor-zoom-in hover:scale-105 transition duration-300"
                                            onClick={() => window.open(image, "_blank")}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-40 flex items-center justify-center border rounded-xl text-gray-500">
                                No Aadhaar Documents Uploaded
                            </div>
                        )}
                    </div>
                    {/* Details Card */}
                    <div className="bg-[#f8fafc] border border-[#006e2f]/10 rounded-xl p-4">
                        <h4 className="text-sm font-semibold text-[#006e2f] mb-4">
                            Verification Details
                        </h4>
                        <div className="space-y-4">
                            {/* Aadhaar Number */}
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Aadhaar Number
                                </p>
                                <p className="font-semibold text-gray-800">
                                    {kycDetails?.aadharNumber}
                                </p>
                            </div>
                            {/* Bank Account */}
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    Bank Account Number
                                </p>
                                <p className="font-semibold text-gray-800">
                                    {kycDetails?.bankAccountNumber}
                                </p>
                            </div>
                            {/* IFSC */}
                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                    IFSC Code
                                </p>
                                <p className="font-semibold text-gray-800">
                                    {kycDetails?.ifscCode}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* approve and reject*/}
                    {vendorCurrentStatus === "pending" && (
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Rejected Reason (required only for rejection)
                                </label>
                                <textarea
                                    value={rejectedReason}
                                    onChange={(e) => setRejectedReason(e.target.value)}
                                    rows={3}
                                    placeholder="Enter reason for rejection"
                                    className="mt-2 w-full rounded-xl border border-[#006e2f]/20 p-3 text-sm text-gray-700 focus:border-[#16a34a] focus:ring-[#16a34a]/20"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    disabled={isLoading}
                                    onClick={() => handleApproveAndReject("approved")}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
                                >
                                    {isLoading ? 'wait...' : "Approve Vendor"}
                                </button>
                                <button
                                    disabled={isLoading}
                                    onClick={() => handleApproveAndReject("rejected")}
                                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
                                >
                                    {isLoading ? 'wait...' : "Reject Vendor"}
                                </button>
                            </div>
                        </div>
                    )}
                    {/* vendor status badge */}
                    {(vendorCurrentStatus === "approved" || vendorCurrentStatus === "rejected") && (
                            <div className="flex justify-center">
                                <span
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold
                                ${vendorCurrentStatus === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : vendorCurrentStatus === "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {vendorCurrentStatus?.toUpperCase()}
                                </span>
                            </div>
                        )}
                </div>
            </div>

        </div>
    );
}

export default ApproveAndRejectKycDialog;
