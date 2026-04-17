import React from 'react';
import BusinessInformation from './kycSteps/BusinessInformation';
import KycDocuments from './kycSteps/KycDocuments';
import BankDetails from './kycSteps/BankDetails';
import MediaLogistics from './kycSteps/MediaLogistics';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { motion } from "framer-motion"

const Kyc = () => {
  return (
    <div className='w-full p-5 flex flex-col gap-5 '>
      <div className="space-y-4 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#191c1e] tracking-tight leading-tight"
        >
          Grow your dairy business with{" "}
          <span className="text-[#006e2f] italic">
            Milzo
          </span>
        </h1>
        <p className="text-base sm:text-lg text-[#3d4a3d] max-w-2xl leading-relaxed">
          Complete your profile to join our network of premium organic milk producers.
          We prioritize quality and transparency.
        </p>
      </div>
      {/* steps */}
      <div className='flex flex-col p-5 border '>
        <form className='space-y-6'>
          <BusinessInformation />
          <KycDocuments />
          <BankDetails />
          <MediaLogistics />
          <div className="flex justify-end pt-6 sm:pt-8   border-t border-[#bccbb9]/20">
            {/* Next Button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              type='submit'
              className="flex items-center gap-2 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#22c55e] text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
            >
              Next: Verification
              <MdArrowForward />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Kyc;
