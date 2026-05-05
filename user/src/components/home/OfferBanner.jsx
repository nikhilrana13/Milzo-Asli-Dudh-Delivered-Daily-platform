import React from "react";
import { motion } from "framer-motion";
import { MdLocalOffer } from "react-icons/md";

const OfferBanner = ({
  title = "New User Offer 60% OFF",
  discountValue = 60,
  maxDiscount = 500,
  minOrderAmount = 1000,
  applicableDays = 30,
  onClaim,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#006e2f] via-[#008a44] to-[#00b35c] shadow-xl"
      >
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-lg">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-3">
            <MdLocalOffer />
            Limited Time Offer
          </div>
          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight mb-2">
            {title}
          </h3>
          {/* Sub info */}
          <p className="text-white/90 text-sm sm:text-base">
            Save up to <span className="font-bold">₹{maxDiscount}</span> on your
            first subscription. Minimum order ₹{minOrderAmount}.
          </p>
          <p className="text-white/70 text-xs sm:text-sm mt-1">
            Valid for {applicableDays} days • First subscription only
          </p>
        </div>
        {/* RIGHT CTA */}
        <div className="relative z-10 w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClaim}
            className="w-full md:w-auto bg-white text-[#006e2f] px-6 sm:px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Claim Offer
          </motion.button>
        </div>
        {/* BIG % BACKGROUND ICON */}
        <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-center opacity-10">
          <span className="text-[100px] sm:text-[140px] font-black text-white">
            {discountValue}%
          </span>
        </div>

      </motion.div>
    </div>
  );
};

export default OfferBanner;