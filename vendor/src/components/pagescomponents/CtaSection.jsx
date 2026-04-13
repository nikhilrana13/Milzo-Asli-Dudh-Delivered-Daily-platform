import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#006e2f] rounded-2xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden"
      >
        
        {/* glow effects */}
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        {/* Content*/}
        <div className="relative z-10">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8">
            Ready to modernize your dairy?
          </h2>

          <p className="text-sm sm:text-base lg:text-lg opacity-90 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
            Join 150+ partners who have increased their profit margins by an
            average of 22% within their first six months on Milzo.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#006e2f] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg lg:text-xl shadow-xl"
            >
              Get Started Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-bold text-base sm:text-lg lg:text-xl hover:bg-white/20 transition"
            >
              Schedule a Demo
            </motion.button>
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default CTASection;