import React from "react";
import { MdAccessTime, MdInfoOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";

const KycPendingUi = () => {
   const {handleLogout} = useLogout()

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
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
            <MdAccessTime className="text-white text-3xl" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
          KYC Under Review ⏳
        </h2>

        {/* Subtext */}
        <p className="text-[#5c5f60] mt-3 text-sm sm:text-base leading-relaxed">
          Your documents have been submitted successfully and are currently
          being reviewed by our team. This usually takes{" "}
          <span className="font-semibold text-[#006e2f]">24–48 hours</span>.
        </p>

        {/* Info Box */}
        <div className="mt-6 p-4 rounded-xl bg-[#f3f4f6] flex items-start gap-3 text-left">
          <MdInfoOutline className="text-[#006e2f] text-xl mt-0.5" />
          <p className="text-sm text-[#3d4a3d] leading-relaxed">
            Please ensure your submitted details are correct. You’ll be notified
            once verification is complete.
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-[#bccbb9]/20"></div>

        {/* Status points */}
        <div className="text-left space-y-3 mb-8">
          <p className="text-sm text-[#3d4a3d]">
            🔍 Verification in progress
          </p>
          <p className="text-sm text-[#3d4a3d]">
            📄 Documents under review
          </p>
          <p className="text-sm text-[#3d4a3d]">
            📩 You will receive an update soon
          </p>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-bold rounded-xl shadow-lg"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default KycPendingUi;