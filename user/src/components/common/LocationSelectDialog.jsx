import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { useSelector } from 'react-redux';
import SavedAddressBox from '../location/SavedAddressBox';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import { useGetUserSavedAddressesQuery} from '@/redux/api/UsersavedAddressesApi';




const LocationSelectDialog = ({ onClose }) => {
    const user = useSelector((state) => state.Auth.user)
    useLockBodyScroll(true)
    const addressQuery = useGetUserSavedAddressesQuery()
    const savedaddresses = addressQuery?.data?.data?.addresses
    console.log("data",savedaddresses)

    return (
        <>
            {/* backdrop */}
            <div
                onClick={onClose}
                className="fixed inset-0 z-[99998] bg-black/20 backdrop-blur-[2px]"
            />
            {/* dialog */}
            <div  onClick={(e) => e.stopPropagation()} className="fixed top-[72px] right-6 lg:right-30 z-[99999] w-full max-w-md rounded-3xl border bg-white shadow-2xl overflow-y-auto h-[500px] custom-scrollbar">
                {/* header */}
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-[#191c1e]">
                        Select Location
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Choose your delivery location
                    </p>
                </div>
                {/* content */}
                <div className="p-6 space-y-5">
                    {/* search input */}
                    <div className="relative">
                        <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search area, city..."
                            className="w-full rounded-2xl border bg-[#f7f7f7] pl-11 pr-4 py-3 outline-none focus:border-[#10b981] focus:bg-white transition-all"
                        />
                    </div>
                    {/* current location */}
                    <button className="w-full flex items-center gap-3 rounded-2xl border p-4 hover:bg-[#f8fafc] transition-all">
                        <div className="h-11 w-11 rounded-full bg-[#dcfce7] flex items-center justify-center">
                            <MdMyLocation className="text-[#16a34a] text-xl" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-[#191c1e]">
                                Use current location
                            </p>
                            <p className="text-sm text-gray-500">
                                Detect your live location
                            </p>
                        </div>
                    </button>
                    {/* saved addresses */}
                    {user && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Saved Addresses
                                </h3>

                                <button className="text-sm font-medium text-[#16a34a]">
                                    Add New
                                </button>
                            </div>
                            {/* address card */}
                            <SavedAddressBox />
                             <SavedAddressBox />
                            <SavedAddressBox />
                        </div>
                    )}
                    {/* login hint */}
                    {!user && (
                        <div className="rounded-2xl bg-[#f0fdf4] p-4 border border-[#dcfce7]">
                            <p className="text-sm text-[#166534]">
                                Login to save addresses for faster checkout ⚡
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default LocationSelectDialog;
