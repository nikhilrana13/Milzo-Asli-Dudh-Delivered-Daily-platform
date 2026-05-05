import React from "react";
import { motion } from "framer-motion";
import { MdAgriculture, MdBiotech, MdSchedule } from "react-icons/md";

const features = [
  {
    icon: MdAgriculture,
    title: "Direct from Farm",
    desc: "By removing the middleman, we ensure that 100% of the value returns to local farmers while keeping product fresher.",
  },
  {
    icon: MdBiotech,
    title: "Lab Tested",
    desc: "Every single batch is tested for purity and nutrient density. Access full reports via QR codes on every bottle.",
  },
  {
    icon: MdSchedule,
    title: "Smart Subscriptions",
    desc: "Intuitive delivery cycles that adapt to your consumption patterns. Pause, skip, or modify in seconds.",
  },
];

const PuritySection = () => {
  return (
    <section className="py-12 sm:py-20  rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] mx-3 sm:mx-4">

      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl  font-[700] text-[#191c1e] mb-3 sm:mb-4">
            Purity in Every Drop
          </h2>

          <p className="text-[#3d4a3d] text-sm sm:text-[1.1rem]">
            A new standard for digital dairy tracking and farm-fresh logistics.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="group relative p-6 sm:p-8 lg:p-10 rounded-2xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-md hover:shadow-xl transition-all"
              >

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#006e2f]/10 to-transparent" />

                {/* Icon */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 bg-[#006e2f]/10 rounded-2xl flex items-center justify-center text-[#006e2f] mb-6 sm:mb-8 group-hover:scale-110 transition">
                  <Icon className="text-2xl sm:text-3xl" />
                </div>

                {/* Title */}
                <h3 className="relative z-10 text-lg sm:text-xl lg:text-2xl font-bold text-[#191c1e] mb-3 sm:mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
                  {item.desc}
                </p>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default PuritySection;