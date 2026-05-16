import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const VendorImageSlider = ({images = [],vendorName = "Vendor Dairy"}) => {
   const [currentImage, setCurrentImage] =useState(0)

   // auto slide
   useEffect(() => {
      if (images?.length <= 1) return
      const interval = setInterval(() => {
         setCurrentImage((prev) =>
            prev === images.length - 1
               ? 0
               : prev + 1
         )
      }, 3000)
      return () => clearInterval(interval)
   }, [images?.length])
   return (
      <div className="relative h-60 overflow-hidden">
         <AnimatePresence mode="wait">
            <motion.img
               key={currentImage}
               src={images?.[currentImage]?.url}
               alt={vendorName}
               initial={{
                  opacity: 0,
                  scale: 1.05
               }}
               animate={{
                  opacity: 1,
                  scale: 1
               }}
               exit={{
                  opacity: 0
               }}
               transition={{
                  duration: 0.7
               }}
               className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"/>
         </AnimatePresence>
         {/* overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
         {/* dots */}
         {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
               {images.map((_, index) => (
                  <button key={index} onClick={() =>
                        setCurrentImage(index)
                     }
                     className={`
                        h-2 rounded-full transition-all duration-300
                        ${
                           currentImage === index
                              ? "w-6 bg-white"
                              : "w-2 bg-white/50"
                        }
                     `}
                  />
               ))}
            </div>
         )}
      </div>
   )
}

export default VendorImageSlider