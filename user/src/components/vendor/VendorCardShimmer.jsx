import React from "react"
import { motion } from "framer-motion"

const VendorCardShimmer = () => {

   return (
      <motion.div
         initial={{ opacity: 0.6 }}
         animate={{ opacity: 1 }}
         transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
         }}
         className="group overflow-hidden rounded-3xl border border-[#eef0f2] bg-white shadow-sm"
      >
         {/* image shimmer */}
         <div className="relative h-60 overflow-hidden bg-[#f3f4f6]">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#f3f4f6] via-[#e5e7eb] to-[#f3f4f6]" />
            {/* verified badge shimmer */}
            <div className="absolute left-4 top-4 h-8 w-24 rounded-full bg-white/70 backdrop-blur-md" />
            {/* rating shimmer */}
            <div className="absolute bottom-4 right-4 h-8 w-16 rounded-full bg-white/80" />
         </div>
         {/* content */}
         <div className="p-5 sm:p-6">
            {/* heading */}
            <div className="mb-3 flex items-start justify-between gap-3">
               <div className="h-6 w-44 animate-pulse rounded-xl bg-[#e5e7eb]" />
               <div className="h-4 w-20 animate-pulse rounded-lg bg-[#f3f4f6]" />
            </div>
            {/* description */}
            <div className="mb-6 space-y-2">
               <div className="h-4 w-full animate-pulse rounded-lg bg-[#f3f4f6]" />
               <div className="h-4 w-2/3 animate-pulse rounded-lg bg-[#f3f4f6]" />
            </div>
            {/* button shimmer */}
            <div className="h-14 w-full animate-pulse rounded-2xl bg-[#f3f4f6]" />
         </div>
      </motion.div>
   )
}

export default VendorCardShimmer