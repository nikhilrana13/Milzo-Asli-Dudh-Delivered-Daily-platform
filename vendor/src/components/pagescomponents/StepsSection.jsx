import React from "react";
import { motion } from "framer-motion";
import { MdTimer, MdInventory2, MdBolt } from "react-icons/md";

const steps = [
  {
    number: "1",
    title: "Register",
    desc: "Sign up and upload your KYC documents through our secure portal for rapid verification.",
    icon: MdTimer,
    meta: "Approx. 5 mins",
  },
  {
    number: "2",
    title: "List Products",
    desc: "Add your fresh dairy items to the Milzo marketplace with high-res photos and transparent pricing.",
    icon: MdInventory2,
    meta: "Unlimited SKUs",
  },
  {
    number: "3",
    title: "Start Delivering",
    desc: "Use our vendor app to manage daily morning deliveries. Our tech keeps you on schedule and on track.",
    icon: MdBolt,
    meta: "Go live in 48h",
  },
];

const StepsSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-[#ffffff] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#191c1e]">
            Simple Steps to Onboard
          </h2>

          <div className="w-20 sm:w-24 h-1.5 bg-[#006e2f] mx-auto rounded-full" />
        </div>

        {/* steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* connector line (Desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-[#bccbb9]/40 -translate-y-1/2" />

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="relative bg-[#f8f9fb] p-6 sm:p-8 lg:p-10 rounded-xl shadow-sm z-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0px_16px_40px_rgba(25,28,30,0.08)]"
              >
                
                {/* step number */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#006e2f] from-0% to-[#22c55e] to-100% text-white flex items-center justify-center text-xl sm:text-2xl font-bold mb-6 sm:mb-8 shadow-lg">
                  {step.number}
                </div>
                {/* title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-[#191c1e]">
                  {step.title}
                </h3>

                {/* desc */}
                <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>

                {/* meta info */}
                <div className="mt-6 sm:mt-8 text-[#735c00] font-medium text-xs sm:text-sm flex items-center gap-2">
                  <Icon className="text-sm sm:text-base" />
                  {step.meta}
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default StepsSection;