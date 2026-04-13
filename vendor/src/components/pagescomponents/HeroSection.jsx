import React from 'react';
import {motion} from "framer-motion"
import { TbArrowZigZag } from 'react-icons/tb';
import milzoheroimg from "/milzohero.webp"
import user1 from "/user1.webp"
import user2 from "/user2.webp"
import user3 from "/user3.webp"



const Avatorsimg = [
    {id:0,img:user1},
    {id:1,img:user2},
    {id:2,img:user3}
]

const HeroSection = () => {
  return (
  <section className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 mb-20 lg:mb-28 grid lg:grid-cols-2 gap-12 items-center">
      {/* left content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6 sm:space-y-8 text-center lg:text-left"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#ffe083] text-[#231b00] text-xs font-bold tracking-wider uppercase">
          Partner Opportunity
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#191c1e] tracking-tight leading-tight">
          Grow Your Dairy <br />
          <span className="text-[#006e2f]">Business</span> with Milzo
        </h1>
        <p className="text-base sm:text-lg text-[#5c5f60] leading-relaxed max-w-xl mx-auto lg:mx-0">
          More orders. Zero manual work. Reach nearby homes daily and grow your dairy business—effortlessly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#006e2f] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg"
          >
            Get Started Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#e7e8ea] text-[#006e2f] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-[#e1e2e4]"
          >
            View Pricing
          </motion.button>
        </div>
        {/* Avators */}
        <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
          <div className="flex -space-x-3">
            {Avatorsimg.map((img) => (
              <motion.img
                key={img.id}
                src={img.img}
                alt=""
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#f8f9fb]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: img.id * 0.1 }}
              />
            ))}
          </div>
          <p className="text-xs sm:text-sm text-[#5c5f60] font-medium">
            <span className="text-[#006e2f] font-bold">500+</span> Local vendors
            already scaling
          </p>
        </div>
      </motion.div>
      {/* right image */}
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative perspective-[1200px]"
          >
            {/* 3D card*/}
            <motion.div
              whileHover={{
                rotateY: 6,
                rotateX: 4,
                scale: 1.03,
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="rounded-[24px] overflow-hidden shadow-2xl bg-white transform-gpu"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={milzoheroimg}
                alt="Milzo Dairy Products"
                className="w-full h-[300px] sm:h-[400px] lg:h-[520px] object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#006e2f]/20 via-transparent to-[#ffe083]/20 pointer-events-none" />
            </motion.div>
            {/* floating glow*/}
            <div className="absolute -z-10 top-10 left-10 w-40 h-40 bg-[#006e2f]/20 blur-3xl rounded-full" />
            <div className="absolute -z-10 bottom-10 right-10 w-40 h-40 bg-[#ffe083]/30 blur-3xl rounded-full" />
      
            {/* floating card  */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -left-2 sm:-left-6 backdrop-blur-md bg-white/70 p-4 sm:p-6 rounded-xl shadow-xl max-w-[220px] sm:max-w-xs border border-white/20"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#735c00] uppercase tracking-widest">
                  Real-time Growth
                </span>
                <span className="text-[#006e2f] text-lg">
                    <TbArrowZigZag />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#191c1e]">
                +24%
              </div>
              <p className="text-[10px] sm:text-xs text-[#5c5f60]">
                Monthly subscription increase for <br />
                <strong>Green Valley Farms</strong>
              </p>
            </motion.div>
          </motion.div>
    </section>
  );
}

export default HeroSection;
