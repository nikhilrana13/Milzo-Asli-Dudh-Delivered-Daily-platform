import React, { useState } from 'react';
import { motion } from "framer-motion"
import { MdArrowForward} from 'react-icons/md';
import heroimg from "/milzoheroimg.webp"


const HeroSection = () => {
    const [loaded, setLoaded] = useState(false)
    return (
        <section className="relative py-8 overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006e2f]/10 text-[#006e2f] text-xs font-bold uppercase tracking-widest mb-6 sm:mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#006e2f]" />
                        Direct From Source
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold  leading-[1.1] text-[#191c1e] tracking-tight mb-6 sm:mb-8">
                        Real Dairy, <br />
                        <span className="text-[#006e2f]">Every Morning.</span>
                    </h1>

                    {/* Description */}
                    <p className="text-[0.9rem] sm:text-[1.1rem] text-[#3d4a3d] leading-relaxed max-w-lg mb-8 sm:mb-10">
                        Fresh, verified milk and organic dairy products delivered from
                        local premium farms straight to your doorstep before the sun rises.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#006e2f] to-[#009e4f] px-6 sm:px-10 py-3 sm:py-5 rounded-full text-base sm:text-lg font-bold  text-white shadow-lg flex justify-center items-center gap-2"
                        >
                            Get Started <MdArrowForward />
                        </motion.button>

                        <button className="bg-[#e7e8ea] px-6 sm:px-10 py-3 sm:py-5 rounded-full text-base sm:text-lg font-bold text-[#191c1e] hover:bg-[#dfe1e4] transition">
                            Browse Vendors
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT IMAGE */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative lg:h-[500px] xl:h-[600px] rounded-[24px] overflow-hidden"
                >

                    {!loaded && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300" />
                    )}
                    <img
                        src={heroimg}
                        alt="Fresh dairy on farm"
                        onLoad={()=>setLoaded(true)}
                        className={`w-full h-full object-cover object-bottom transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </motion.div>

            </div>
        </section>
    );
}

export default HeroSection;
