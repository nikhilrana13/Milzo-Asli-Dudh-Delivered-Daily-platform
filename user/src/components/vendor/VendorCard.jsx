import React from "react";
import { motion } from "framer-motion";
import { MdVerified, MdStar } from "react-icons/md";
import { capitalizeWords, formatDistance } from "@/utils/Helpers";
import VendorImageSlider from "./VendorImageSlider";


const VendorCard = ({ onViewProducts, vendor }) => {

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="group bg-white rounded-3xl overflow-hidden border border-[#eef0f2] shadow-sm
            hover:shadow-2xl hover:shadow-black/5 transition-all duration-300">
            {/* image */}
            <div className="relative">
                <VendorImageSlider
                    images={vendor?.dairyImages}
                    vendorName={vendor?.displayName}
                />
                {/* verified badge */}
                {vendor?.isKycApproved && (
                    <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#15803d] text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5 shadow-md">
                            <MdVerified className="text-sm" />
                            Verified
                        </span>
                    </div>
                )}
                {/* rating */}
                {vendor?.rating > 0 && (
                    <div className="absolute bottom-4 right-4 z-20">
                        <span className="bg-white text-[#191c1e] px-3 py-1.5 rounded-full font-bold text-sm flex items-center gap-1 shadow-lg">
                            <MdStar className="text-[#facc15]" />
                            {vendor?.rating}
                        </span>
                    </div>
                )}
            </div>
            {/* content */}
            <div className="p-5 sm:p-6">
                {/* heading */}
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#191c1e] line-clamp-1">
                        {capitalizeWords(vendor?.displayName || "NA")}
                    </h3>
                    {vendor?.distance != null && (
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                            {formatDistance(vendor?.distance)}
                        </span>
                    )}
                </div>
                <div className="mb-5 flex items-center gap-2 text-sm text-gray-500">
                    {vendor?.totalReviews > 0 && (
                        <span>
                            {vendor?.totalReviews} Reviews
                        </span>
                    )}
                    {vendor?.totalReviews > 0 &&
                        vendor?.description && (
                            <span>•</span>
                        )}
                    {vendor?.description && (
                        <span className="line-clamp-1">
                            {vendor?.description}
                        </span>
                    )}
                    {!vendor?.totalReviews &&
                        !vendor?.description && (
                            <span>
                                Fresh dairy products available
                            </span>
                        )}
                </div>
                {/* button */}
                <button onClick={onViewProducts} className="w-full py-3.5 rounded-2xl bg-[#f3f4f6] text-[#15803d] font-semibold hover:bg-[#16a34a] hover:text-white transition-all duration-300"
                >
                    View Products
                </button>
            </div>
        </motion.div>
    );
};

export default VendorCard;