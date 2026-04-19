import React, { useState } from 'react';
import { MdGrass, MdLock, MdMail, MdVerifiedUser } from 'react-icons/md';
import { motion } from 'framer-motion'
import { FaUserNinja } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import { api } from '@/utils/api';

const RegisterVendor = ({ setStep }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const formdata = {
      username: data.username,
      email: data.email,
      password: data.password
    }
    try {
      setLoading(true)
      const response = await api.post("/api/auth/vendor-register", formdata)
      if (response) {
        toast.success(response?.message)
        setTimeout(() => {
          setStep(1)
        }, 500);
        
      }
    } catch (error) {
      console.log("failed to register vendor", error)
      toast.error(error?.response?.data?.message || "Internal server error")
    } finally {
      setLoading(false)
    }
  }


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
          Become a Vendor
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5 sm:space-y-6">
        {/* username  */}
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-xs font-semibold text-[#3d4a3d] ml-1">
            Username
          </label>
          <div className="relative group">
            <FaUserNinja className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c] group-focus-within:text-[#006e2f] transition-colors" />
            <input
              type="username"
              name='username'
              placeholder="jane"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#e7e8ea] rounded-lg focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all placeholder:text-[#6d7b6c] outline-none"
              {...register("username", { required: "Username is Required", maxLength: { value: 30, message: "Max 30 characters allowed" } })}
            />
          </div>
          {errors.username && <p className='text-sm text-red-500'>{errors?.username?.message}</p>}
        </div>
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
              {...register("email", {
                required: "Email is Required", pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
            />
          </div>
          {errors.email && <p className='text-sm text-red-500'>{errors?.email?.message}</p>}
        </div>
        {/* Password */}
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-xs font-semibold text-[#3d4a3d]">
              Password
            </label>
          </div>
          <div className="relative group">
            <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c] group-focus-within:text-[#006e2f] transition-colors" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3 sm:py-4 bg-[#e7e8ea] rounded-lg focus:ring-2 focus:ring-[#006e2f]/20 focus:bg-white transition-all placeholder:text-[#6d7b6c] outline-none"
              {...register("password", {
                required: "Password is Required", minLength: {
                  value: 6,
                  message: "Minimum 6 characters required"
                }
              })}
            />
          </div>
          {errors.password && <p className='text-sm text-red-500'>{errors?.password?.message}</p>}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full mx-auto py-3 sm:py-4 bg-gradient-to-r from-[#006e2f] to-[#4ae176] text-white font-bold rounded-lg shadow-lg shadow-[#006e2f]/10 transition-all flex justify-center items-center"
        >
          {
            loading ? (
              <RotatingLines
                visible={true}
                height="24"
                width="24"
                color="#ffffff"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Join Milzo"
            )
          }
        </motion.button>
      </form>
      <div className="mt-8 pt-6 sm:pt-8 border-t border-[#bccbb9]/10 w-full text-center">
        <p className="text-[#5c5f60] text-xs sm:text-sm">
          Already have an account?
          <button
            type='button'
            onClick={() => setStep(1)}
            className="ml-1 font-bold text-[#191c1e] hover:text-[#006e2f] transition-colors"
          >
            Login
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

export default RegisterVendor;
