import React from "react";
import { motion } from "framer-motion";
import { MdAccountBalanceWallet, MdAddHomeWork, MdDashboardCustomize, MdNearMe } from "react-icons/md";

const features = [
  {
    icon: MdAccountBalanceWallet ,
    title: "Automated Billing",
    desc: "Never chase a payment again with daily settlements. Revenue hits your account before your cows are milked.",
  },
  {
    icon: MdNearMe,
    title: "Route Optimization",
    desc: "Deliver more in less time with AI-powered delivery routes that minimize fuel costs and morning traffic.",
  },
  {
    icon: MdDashboardCustomize ,
    title: "Subscription Management",
    desc: "Manage thousands of daily orders with a single dashboard. Automated pausing and adjustments for customer vacations.",
  },
  {
    icon: MdAddHomeWork ,
    title: "Direct-to-Home",
    desc: "Reach customers directly, bypass middlemen, and retain more of your product’s true value.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-32 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 sm:mb-16 lg:mb-20 max-w-2xl"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#191c1e]">
            Designed for Dairy Growth
          </h2>
          <p className="text-[#3d4a3d] text-sm sm:text-base lg:text-lg leading-relaxed">
            We’ve built the tools you need to transition from traditional supply chains to a modern direct-to-consumer powerhouse.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white p-6 sm:p-8 rounded-xl transition-all duration-300 shadow-sm hover:shadow-[0px_16px_40px_rgba(25,28,30,0.08)] group"
            >
              
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#006e2f]/10 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 transition">
                <span className="text-[#006e2f] text-2xl sm:text-3xl">
                  <feature.icon />
                </span>
              </div>
              {/* title */}
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#191c1e]">
                {feature.title}
              </h3>
              {/* desc */}
              <p className="text-[#3d4a3d] text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;