import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Morning Harvest",
    desc: "Our farmers begin the harvest at 4 AM, ensuring the milk is at its peak nutrient density and temperature.",
  },
  {
    id: "02",
    title: "Purity Verification",
    desc: "Immediate on-farm testing for somatic cell count and fat content ensures only the highest grade product is bottled.",
  },
  {
    id: "03",
    title: "Chilled Transit",
    desc: "Our electric fleet keeps products at a precise 2°C, delivering straight to your smart-chiller or doorstep.",
  },
];

const FarmToFridge = () => {
  return (
    <section className="py-12 sm:py-20  px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center">
          {/* LEFT SIDE (STEPS) */}
          <div className="order-2 lg:order-1">
            <div className="space-y-10 sm:space-y-14 lg:space-y-16">

              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 sm:gap-8 group"
                >

                  {/* Number Circle */}
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#006e2f]/20 flex items-center justify-center font-bold text-[#006e2f] group-hover:bg-[#006e2f] group-hover:text-white transition-all">
                    {step.id}
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#191c1e] mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                </motion.div>
              ))}

            </div>
          </div>

          {/* RIGHT SIDE (TEXT + IMAGE) */}
          <div className="order-1 lg:order-2">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-[700] text-[#191c1e] leading-tight mb-6 sm:mb-8"
            >
              Farm to Fridge <br />
              <span className="text-[#006e2f]">in 6 Hours.</span>
            </motion.h2>
            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-[#3d4a3d] mb-8 sm:mb-10 lg:mb-12">
              We've re-engineered the supply chain to prioritize speed,
              temperature stability, and transparency. No processing plants,
              no distribution centers, no delays.
            </p>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRBMRtebkBek_8eEWQ1ACe6CpSVKR9dbX1NaLcaVFa4ZfHc8IaV1FI41ftqCmz-kOKCVoEoxZ0s4DiRRIID8KD8ZxdIxqFe4i6EIeBiMR0IJvWFlkVhw5KGcHEi8Ybm_PgBZcsu1VpFIwqYh14EXx3ekf94jdrqbvL5avaUCil8Mi1GjjsrHIlOgfLDpkvLzqQ1lbNI4sLewftUPY8fbPyj-PdKZpDw3Eh8_zws38BSE6Rs26YR77PuBFPFlASDpyMAake_VxdGTc"
                alt="Delivery process"
                className="w-full aspect-video object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default FarmToFridge;