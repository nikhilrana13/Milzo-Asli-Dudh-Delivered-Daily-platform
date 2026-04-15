import { motion } from "framer-motion";
import { MdWavingHand } from "react-icons/md";

const WelcomeHeader = ({ name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#006e2f] via-[#22c55e] to-[#4ade80] text-white shadow-lg"
    >
      {/* Glow background */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold flex items-center gap-2">
            Welcome back, {name || "User"}
            <MdWavingHand className="text-yellow-300 text-2xl animate-pulse" />
          </h1>
          <p className="text-sm sm:text-base text-white/80 mt-1">
            Here’s what’s happening with your dairy today 🥛
          </p>
        </div>
        <div className="text-xs sm:text-sm bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full font-medium">
          Milzo Vendor Dashboard
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeHeader;