import React from 'react';
import { MdMyLocation } from 'react-icons/md';

const CurrentLocationButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="w-full flex items-center gap-3 rounded-2xl border p-4 hover:bg-[#f8fafc] transition-all">
            <div className="h-11 w-11 rounded-full bg-[#dcfce7] flex items-center justify-center"> <MdMyLocation className="text-[#16a34a] text-xl" /> </div>
            <div className="text-left">
                <p className="font-medium text-[#191c1e]"> Use current location </p>
                <p className="text-sm text-gray-500"> Detect your live location </p>
            </div>
        </button>
    );
}

export default CurrentLocationButton;
