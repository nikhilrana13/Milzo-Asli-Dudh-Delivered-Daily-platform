import React from "react";
import { useSelector } from "react-redux";
import { MdErrorOutline, MdRefresh, MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { LuLogOut } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

const KycRejectedUi = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const {handleLogout} = useLogout()

  const rejectedReason = user?.rejectedReason;

  return (
    <div className="w-full flex items-center justify-center py-5 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-red-200 p-8 sm:p-10 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center shadow-lg">
            <MdErrorOutline className="text-white text-3xl" />
          </div>
        </div>
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
          KYC Rejected
        </h2>
        {/* Subtext */}
        <p className="text-[#5c5f60] mt-3 text-sm sm:text-base leading-relaxed">
          Unfortunately, your KYC verification could not be approved. Please
          review the reason below and resubmit your details.
        </p>
        {/* Reason Box */}
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-left">
          <p className="text-sm font-semibold text-red-600 mb-1">
            Reason:
          </p>
          <p className="text-sm text-red-500">
            {rejectedReason && rejectedReason.trim() !== ""
              ? rejectedReason
              : "Your submitted documents did not meet our verification requirements. Please re-upload clear and valid documents."}
          </p>
        </div>
        {/* Divider */}
        <div className="my-6 h-px bg-[#bccbb9]/20"></div>
        {/* Steps */}
        <div className="text-left space-y-3 mb-4">
          <p className="text-sm text-[#3d4a3d]">
            🔁 Re-upload correct documents
          </p>
          <p className="text-sm text-[#3d4a3d]">
            📝 Double-check all entered details
          </p>
        </div>
        <p className="text-start text-gray-500 py-3">
             To resubmit your KYC, please log out and log in again. You will be redirected to the KYC form.
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Reapply */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-bold rounded-xl shadow-lg"
          >
            Logout
            <LuLogOut />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default KycRejectedUi;