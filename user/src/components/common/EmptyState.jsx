import React from 'react';
import {motion} from "framer-motion"
import { useDialog } from '@/context/DialogContext';

const EmptyState = ({isError}) => {
    const {setActiveDialog} = useDialog()
    return (
        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center justify-center px-6 text-center">
            {/* animated illustration */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
            >
                {/* glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.35, 0.2]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity
                    }}
                    className="absolute inset-0 rounded-full bg-[#22c55e] blur-3xl"
                />
                {/* floating milk bottle */}
                <motion.div
                    animate={{
                        y: [0, -12, 0],
                        rotate: [0, -3, 3, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/60 bg-white shadow-[0_20px_60px_rgba(34,197,94,0.12)] backdrop-blur-xl sm:h-44 sm:w-44"
                >

                    <div className="text-7xl sm:text-8xl">
                        🥛
                    </div>

                </motion.div>
                {/* floating particles */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}
                    className="absolute -right-2 top-4 h-4 w-4 rounded-full bg-[#86efac]"
                />
                <motion.div
                    animate={{
                        y: [0, -14, 0],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity
                    }}
                    className="absolute -left-4 bottom-6 h-3 w-3 rounded-full bg-[#bbf7d0]"
                />
            </motion.div>
            {/* title */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-10 text-3xl font-black tracking-tight text-[#191c1e] sm:text-4xl"
            >
                {isError
                    ? "Unable to Fetch Vendors"
                    : "No Nearby Dairies Found"}

            </motion.h2>
            {/* description */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base"
            >

                {isError
                    ? "Something went wrong while fetching nearby dairies. Please check your connection or try again in a moment."
                    : "We couldn’t find any dairy vendors near your selected location. Try changing your location or increasing the delivery range."}

            </motion.p>
            {/* actions */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
                {/* retry button */}
                {isError && (
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-6 py-3 font-semibold text-white shadow-lg shadow-[#22c55e]/20 transition-all duration-300 hover:scale-[1.02]"
                    >
                        Try Again
                    </button>
                )}
                {/* change location */}
                <button
                    onClick={() => setActiveDialog("location")}
                    className="rounded-2xl border border-[#dcfce7] bg-[#f0fdf4] px-6 py-3 font-semibold text-[#15803d] transition-all duration-300 hover:bg-[#dcfce7]"
                >
                    Change Location
                </button>
            </motion.div>

        </div>
    );
}

export default EmptyState;
