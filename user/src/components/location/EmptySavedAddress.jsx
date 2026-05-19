import React from 'react';
import { MdAdd, MdLocationOn } from 'react-icons/md';

const EmptySavedAddress = ({openAddDialog}) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#d6e4d8] bg-gradient-to-b from-[#f8fbf8] via-white to-white px-6 py-14 text-center shadow-sm">
            {/* icon */}
            <div className="relative mb-6">
                {/* glow */}
                <div className="absolute inset-0 rounded-full bg-[#22c55e]/10 blur-2xl" />
                {/* circle */}
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#d7f5df] bg-[#ecfdf3] shadow-sm">
                    <MdLocationOn className="text-4xl text-[#16a34a]" />
                </div>
            </div>
            {/* title */}
            <h3 className="text-xl font-semibold tracking-tight text-[#191c1e]">
                No Saved Addresses
            </h3>
            {/* description */}
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#6b7280]">
                Add your home or work address to enjoy faster checkout and seamless early morning deliveries with Milzo.
            </p>
            {/* action button */}
            <button 
                onClick={openAddDialog}
                type="button"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#006e2f] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#22c55e]/20 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
                <MdAdd className="text-lg" />
                Add New Address
            </button>
            {/* small bottom text */}
            <p className="mt-4 text-xs text-[#9ca3af]">
                Your saved addresses appear here
            </p>
        </div>
    );
}

export default EmptySavedAddress;
