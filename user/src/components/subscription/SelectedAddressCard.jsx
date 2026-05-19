import React from 'react';
import { MdHome } from 'react-icons/md';
import { useSelector } from 'react-redux';

const SelectedAddressCard = ({ selectedAddress }) => {
    const user = useSelector((state)=>state.Auth.user)
    return (
        <div className="rounded-3xl border border-[#eef0f2] bg-gradient-to-br from-white to-[#f8fafc] p-4 shadow-sm">
            <div className="flex items-start gap-4">
                {/* icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#16a34a] to-[#22c55e] shadow-lg shadow-[#22c55e]/20">
                    <MdHome className="text-xl text-white" />
                </div>
                {/* content */}
                <div className="min-w-0 flex-1">
                    {/* user not logged in */}
                    {!user ? (
                        <div className="rounded-2xl border border-dashed border-[#d1d5db] bg-[#fafafa] p-4">
                            <h4 className="text-sm font-bold text-[#191c1e] mb-1">
                                Login Required
                            </h4>
                            <p className="text-sm leading-6 text-gray-500">
                                Please login to view your saved delivery addresses.
                            </p>
                        </div>
                    ) : selectedAddress ? (
                        <>
                            {/* top */}
                            <div className="mb-1 flex items-center gap-2">
                                <h4 className="text-sm font-bold text-[#191c1e]">
                                    {selectedAddress?.label}
                                </h4>
                                <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#166534]">
                                    Default
                                </span>
                            </div>
                            {/* address */}
                            <p className="text-sm leading-6 text-gray-500">
                                {selectedAddress?.addressLine || selectedAddress?.address},{" "}
                                {selectedAddress?.city},{" "}
                                {selectedAddress?.state} -{" "}
                                {selectedAddress?.pincode}
                            </p>
                        </>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-[#d1d5db] bg-[#fafafa] p-4">
                            <h4 className="text-sm font-bold text-[#191c1e] mb-1">
                                No Address Found
                            </h4>
                            <p className="text-sm leading-6 text-gray-500">
                                Please add a delivery address and select it by clicking the{" "}
                                <span className="font-semibold text-[#16a34a]">
                                    Change
                                </span>{" "}
                                button above.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SelectedAddressCard;
