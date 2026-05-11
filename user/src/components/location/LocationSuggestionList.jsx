import { capitalizeWords } from '@/utils/Helpers';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';

const LocationSuggestionList = ({ search, setSelectedLocation, setActiveDialog }) => {
    if (!search?.loading && !search?.suggestions?.length && !search?.hasSearched) {
        return null;
    }
    return (
        <div className="absolute  top-full left-0 mt-3 w-full rounded-2xl border border-gray-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden z-50">
            {/* loading */}
            {search?.loading && (
                <div className="flex items-center justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-[#10b981] border-t-transparent" />
                </div>
            )}
            {/* suggestions */}
            {!search?.loading &&
                search?.suggestions?.length > 0 && (
                    <div className="max-h-[320px] overflow-y-auto custom-scrollbar scroll-smooth">
                        {search?.suggestions?.map((item, index) => (
                            <div
                                key={index}
                                onMouseDown={() => {
                                    search.setQuery(item?.display_name);
                                    search.setShowSuggestions(false);
                                    const locationData = {
                                        city: capitalizeWords(item?.city),
                                        state: capitalizeWords(item?.state),
                                        pincode: item?.pincode,
                                        lat: item?.lat,
                                        lng: item?.lng,
                                    };
                                    setSelectedLocation(locationData);
                                    localStorage.setItem(
                                        "selectedLocation",
                                        JSON.stringify(locationData)
                                    );
                                    setActiveDialog(null);
                                }}
                                className="flex items-start gap-3 px-4 py-4 cursor-pointer transition-all duration-200 hover:bg-[#f8fafc] border-b last:border-none">
                                <div className="mt-1">
                                    <IoLocationOutline
                                        className="text-[#10b981]"
                                        size={22}
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="font-medium text-[0.93rem] text-[#191c1e] truncate">
                                        {item?.display_name}
                                    </span>
                                    <span className="text-[0.8rem] text-gray-500 mt-1">
                                        {capitalizeWords(item?.city)}, {capitalizeWords(item?.state)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            {/* empty state */}
            {!search?.loading && search?.hasSearched && search?.suggestions?.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <IoLocationOutline
                        className="text-gray-300 mb-2"
                        size={40}
                    />
                    <p className="text-[0.95rem] font-medium text-gray-700">
                        No locations found
                    </p>
                    <span className="text-[0.82rem] text-gray-400 mt-1">
                        Try searching with a different keyword
                    </span>
                </div>
            )}
        </div>
    );
}
export default LocationSuggestionList;
