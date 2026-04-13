import React from 'react';
import { MdGrass, MdLock, MdMail, MdVerifiedUser } from 'react-icons/md';
import {motion} from "framer-motion"

const Login = ({setStep}) => {
  return (
    <>
    {/* Brand */}
      <div className="mb-8 sm:mb-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#006e2f]/10 mb-4 sm:mb-6">
          <MdGrass className="text-[#006e2f] text-3xl sm:text-4xl" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#191c1e] mb-1">
          Milzo
        </h1>
        <p className="text-[#5c5f60] font-medium text-xs sm:text-sm uppercase tracking-widest">
          Vendor Portal
        </p>
      </div>
      {/* Form */}
      <form className="w-full space-y-5 sm:space-y-6">
        {/* Email */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs font-semibold text-[#3d4a3d] ml-1">
            Email Address
          </label>
          <div className="relative group">
            <MdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c] group-focus-within:text-[#006e2f] transition-colors" />
            <input
              type="email"
              placeholder="jane@creamery.com"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#e7e8ea] rounded-lg focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all placeholder:text-[#6d7b6c] outline-none"
            />
          </div>
        </div>
        {/* Password */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-semibold text-[#3d4a3d]">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-bold text-[#006e2f] hover:text-[#22c55e] transition-colors"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative group">
            <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c] group-focus-within:text-[#006e2f] transition-colors" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#e7e8ea] rounded-lg focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all placeholder:text-[#6d7b6c] outline-none"
            />
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#4ae176] text-white font-bold rounded-lg shadow-lg shadow-[#006e2f]/10 transition-all"
        >
          Vendor Login
        </motion.button>
      </form>
      <div className="mt-8 pt-6 sm:pt-8 border-t border-[#bccbb9]/10 w-full text-center">
        <p className="text-[#5c5f60] text-xs sm:text-sm">
          New to the Milzo?
          <button
            type='button'
            onClick={()=>setStep(2)}
            className="ml-1 font-bold text-[#191c1e] hover:text-[#006e2f] transition-colors"
          >
            Create an Account
          </button>
        </p>
      </div>
      <div className="mt-6 sm:mt-8 flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#f3f4f6] rounded-full">
        <MdVerifiedUser className="text-[#735c00] text-sm" />
        <span className="text-[10px] font-bold text-[#735c00] uppercase tracking-wider">
          Secure Vendor Access
        </span>
      </div>
    </>
  );
}

export default Login;
