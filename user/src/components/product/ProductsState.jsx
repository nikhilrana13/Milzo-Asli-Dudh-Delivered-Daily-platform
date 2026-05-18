import React from "react";
import { motion } from "framer-motion";

const ProductsState = ({ isError, onRetry }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`flex min-h-[320px] flex-col items-center justify-center rounded-[32px] border p-8 text-center
            ${
              isError
                ? "border-[#fee2e2] bg-gradient-to-b from-[#fff5f5] to-white"
                : "border-[#eef0f2] bg-gradient-to-b from-[#f8fafc] to-white"
            }
         `}>
      {/* icon */}
      <div className={`mb-5 flex h-24 w-24  items-center justify-center rounded-full text-5xl
               ${isError ? "bg-[#fee2e2]" : "bg-[#f3f4f6]"}`}>
        {isError ? "⚠️" : "🥛"}
      </div>
      {/* heading */}
      <h3 className="text-2xl font-black tracking-tight text-[#191c1e]">
        {isError ? "Failed to load products" : "No Products Available"}
      </h3>
      {/* description */}
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        {isError
          ? "Something went wrong while loading dairy products. Please try again after some time."
          : "This dairy farm has not added products yet. Please check back later for fresh dairy items."}
      </p>
      {/* retry button */}
      {isError && (
        <button onClick={onRetry} className="mt-6 rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-6
            py-3 text-sm font-bold text-white shadow-lg shadow-[#22c55e]/20 transition-all duration-300">
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ProductsState;
