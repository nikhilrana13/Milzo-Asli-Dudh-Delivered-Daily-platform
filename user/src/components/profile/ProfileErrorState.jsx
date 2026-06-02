import React from 'react';
import { MdRefresh, MdWifiOff } from "react-icons/md";

const ProfileErrorState = ({ onRetry }) => {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-[32px] border border-red-100 bg-white p-8 shadow-[0_20px_60px_rgba(239,68,68,0.08)]">

                {/* Icon */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                    <MdWifiOff
                        size={48}
                        className="text-red-500"
                    />
                </div>
                {/* Title */}
                <h2 className="mt-6 text-center text-2xl font-bold text-[#0f172a]">
                    Unable to Load Profile
                </h2>
                {/* Description */}
                <p className="mt-3 text-center text-sm text-gray-500 leading-relaxed">
                    Something went wrong while fetching your profile details.
                    Please check your internet connection and try again.
                </p>
                {/* Retry Button */}
                <button
                    onClick={onRetry}
                    className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#047857] to-[#10b981] font-semibold text-white shadow-lg shadow-green-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                    <MdRefresh size={20} />
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default ProfileErrorState;