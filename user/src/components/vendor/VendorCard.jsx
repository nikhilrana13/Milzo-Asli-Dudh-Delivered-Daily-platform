import React from "react";
import { motion } from "framer-motion";
import { MdVerified, MdStar } from "react-icons/md";

const VendorCard = ({vendorName = "Green Valley Dairy",distance = "1.2 km",rating = "4.8",reviews = "350+ reviews",description = "Premium A2 Milk Specialist",tags = ["A2 Milk", "Organic Ghee", "Curd"],image = "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1200&auto=format&fit=crop",verified = true, onViewProducts,}) => {

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="group bg-white rounded-3xl overflow-hidden border border-[#eef0f2] shadow-sm
            hover:shadow-2xl hover:shadow-black/5 transition-all duration-300">
            {/* image */}
            <div className="relative h-60 overflow-hidden">
                <img src={image} alt={vendorName} className="w-full h-full object-cover group-hover:scale-110
                    transition-transform duration-700"/>
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                {/* verified badge */}
                {verified && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md
                            text-[#15803d] text-[11px] font-bold uppercase tracking-wide
                            flex items-center gap-1.5 shadow-md">
                            <MdVerified className="text-sm" />
                            Verified
                        </span>
                    </div>
                )}
                {/* rating */}
                <div className="absolute bottom-4 right-4">
                    <span className="bg-white text-[#191c1e] px-3 py-1.5 rounded-full font-bold text-sm
                        flex items-center gap-1 shadow-lg">
                        <MdStar className="text-[#facc15]" />
                        {rating}
                    </span>
                </div>
            </div>
            {/* content */}
            <div className="p-5 sm:p-6">
                {/* heading */}
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-bold text-[#191c1e] line-clamp-1">
                        {vendorName}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                        {distance}
                    </span>
                </div>

                {/* description */}
                <p className="text-sm text-gray-500 mb-5">
                    {reviews} • {description}
                </p>
                {/* tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tags?.map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-[#f3f4f6] text-[11px]
                            font-semibold text-gray-600">
                            {tag}
                        </span>
                    ))}
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