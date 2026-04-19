import React from 'react';
import { MdVerified, MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const KycApprovedUi = () => {
    const navigate = useNavigate()
  return (
     <div className="w-full flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#bccbb9]/20 p-8 sm:p-10 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-[#006e2f] to-[#22c55e] flex items-center justify-center shadow-lg">
            <MdVerified className="text-white text-3xl" />
          </div>
        </div>
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
          KYC Approved
        </h2>
        {/* Subtext */}
        <p className="text-[#5c5f60] mt-3 text-sm sm:text-base leading-relaxed">
          Your verification has been successfully completed. You are now a
          trusted vendor on{" "}
          <span className="text-[#006e2f] font-semibold">Milzo</span>.
        </p>
        {/* Divider */}
        <div className="my-6 h-px bg-[#bccbb9]/20"></div>
        {/* Benefits */}
        <div className="text-left space-y-3 mb-8">
          <p className="text-sm text-[#3d4a3d]">
             Your products will now be visible to customers
          </p>
          <p className="text-sm text-[#3d4a3d]">
             Start receiving orders instantly
          </p>
          <p className="text-sm text-[#3d4a3d]">
            Access full vendor dashboard & analytics
          </p>
        </div>
        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/vendor/dashboard")}
          className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-bold rounded-xl shadow-lg"
        >
          Go to Dashboard
          <MdArrowForward />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default KycApprovedUi;
