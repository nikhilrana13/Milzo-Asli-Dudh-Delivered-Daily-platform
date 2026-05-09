import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiOutlineMapPin } from 'react-icons/hi2';

const SavedAddressBox = () => {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div className="w-full flex items-start justify-between gap-3 rounded-2xl border p-4 hover:bg-[#f8fafc] transition-all">
            {/* left */}
            <div className="flex items-start gap-3">

                <div className="h-10 w-10 rounded-full bg-[#f3f4f6] flex items-center justify-center shrink-0">
                    <HiOutlineMapPin className="text-lg text-gray-700" />
                </div>

                <div className="text-left">
                    <p className="font-medium text-[#191c1e]">
                        Home
                    </p>

                    <p className="text-sm text-gray-500 line-clamp-2">
                        Sector 15, Gurgaon, Haryana
                    </p>
                </div>
            </div>
            {/* right */}
            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(!openMenu)
                    }}
                    className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
                >
                    <BsThreeDotsVertical className="text-gray-600" />
                </button>
                {/* dropdown */}
                {openMenu && (
                    <div className="absolute right-0 top-10 w-32 rounded-xl border bg-white shadow-lg overflow-hidden z-20">
                        <button className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50">
                            Edit
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SavedAddressBox;
