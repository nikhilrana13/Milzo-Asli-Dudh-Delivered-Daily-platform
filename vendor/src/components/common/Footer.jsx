import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fb] w-full rounded-t-2xl mt-16 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center py-10 sm:py-12 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto text-center"
      >
        <div className="text-lg sm:text-xl font-bold text-[#191c1e] mb-6 sm:mb-8">
          Milzo
        </div>

        {/* links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          
          {[
            "Privacy Policy",
            "Terms of Service",
            "Vendor Agreement",
            "Contact Us",
          ].map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-xs sm:text-sm text-[#5c5f60] hover:text-[#006e2f] transition-colors"
            >
              {item}
            </a>
          ))}

        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-[#5c5f60]">
          © {new Date().getFullYear()} Milzo Dairy Marketplace. All rights reserved.
        </p>

      </motion.div>

    </footer>
  );
};

export default Footer;