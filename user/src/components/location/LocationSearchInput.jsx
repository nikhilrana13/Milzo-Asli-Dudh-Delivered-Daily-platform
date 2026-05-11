import React from 'react';
import { IoSearch } from 'react-icons/io5';

const LocationSearchInput = ({ search }) => {
    return (
        <>
            {/* search icon */}
            <IoSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[1.1rem]"
            />
            {/* input */}
            <input
                type="text"
                placeholder="Search for area, street name..."
                value={search?.query}
                onChange={(e) => search?.setQuery(e.target.value)}
                onFocus={() => search?.setShowSuggestions(true)}
                onBlur={() =>
                    setTimeout(() => search?.setShowSuggestions(false), 200)
                }
                className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 py-3.5 text-[0.95rem]shadow-sm outline-none transition-all duration-200 focus:border-[#10b981] focus:ring-4 focus:ring-emerald-100 "
            />
        </>
    );
}

export default LocationSearchInput;
