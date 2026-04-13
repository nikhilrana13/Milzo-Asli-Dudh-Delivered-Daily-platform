import React from 'react';
import { motion } from "framer-motion";
import CountUp  from "react-countup";

const stats = [
  {
    end: 10000,
    suffix: "+",
    label: "Daily Liters Delivered",
  },
  {
    end: 150,
    suffix: "+",
    label: "Partner Farms",
  },
  {
    end: 4.9,
    suffix: "/5",
    decimals: 1,
    label: "Vendor Satisfaction",
  },
];


const StatsSection = () => {
  return (
    <section className="bg-[#ffffff] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 text-center">
          
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="space-y-2"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#006e2f]">
                <CountUp.default
                  start={0}
                  end={stat.end}
                  duration={2}
                  decimals={stat.decimals || 0}
                  separator=","
                />
                {stat.suffix}
              </p>
              <p className="text-sm sm:text-base text-[#3d4a3d] font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default StatsSection;
