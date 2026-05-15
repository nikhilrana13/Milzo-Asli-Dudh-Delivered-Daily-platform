import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useDialog } from "@/context/DialogContext"
import { useUserLocation } from "@/context/LocationContext"
import { motion } from "framer-motion"




const LocationProtectedRoute = ({ children }) => {
    const { selectedLocation } = useUserLocation()
    const { activeDialog, setActiveDialog } = useDialog()

    useEffect(() => {
        let timer

        if (!selectedLocation?.city && !activeDialog) {
            timer = setTimeout(() => {
                setActiveDialog("location")
            }, 1800)
        }
        return () => clearTimeout(timer)
    }, [selectedLocation, activeDialog, setActiveDialog])

    if (!selectedLocation?.city) {
        return (
            <div className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f0fdf4]">
                {/* glow background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.15, 0.3, 0.15]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-[#22c55e] blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute bottom-[-140px] right-[-140px] h-[340px] w-[340px] rounded-full bg-[#16a34a] blur-3xl"
                    />
                </div>

                {/* road */}
                <div className="absolute bottom-24 left-0 h-[3px] w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                {/* floating milk drops */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            y: 40,
                            opacity: 0
                        }}
                        animate={{
                            y: [-10, -40],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.4
                        }}
                        className="absolute bottom-40 left-1/2 h-3 w-3 rounded-full bg-[#bbf7d0] blur-[1px]"
                        style={{
                            marginLeft: `${i * 28 - 70}px`
                        }}
                    />
                ))}
                {/* center content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

                    {/* animated logo */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative flex items-center justify-center"
                    >

                        <div className="absolute h-28 w-28 rounded-full bg-[#dcfce7] blur-2xl" />

                        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/60 bg-white/70 text-5xl shadow-[0_10px_40px_rgba(34,197,94,0.15)] backdrop-blur-xl">
                            🐄
                        </div>

                    </motion.div>

                    {/* heading */}
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.2
                        }}
                        className="mt-10 text-3xl font-black tracking-tight text-[#191c1e] sm:text-5xl"
                    >
                        Finding Nearby Dairies
                    </motion.h1>

                    {/* sub text */}
                    <motion.p
                        initial={{
                            opacity: 0,
                            y: 10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.35
                        }}
                        className="mt-4 max-w-md text-sm leading-relaxed text-gray-500 sm:text-base"
                    >
                        We’re preparing fresh local deliveries around your area for a faster experience.
                    </motion.p>
                    {/* loading dots */}
                    <div className="mt-8 flex items-center gap-2">

                        {[0, 1, 2].map((dot) => (
                            <motion.div
                                key={dot}
                                animate={{
                                    y: [0, -8, 0]
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: dot * 0.15
                                }}
                                className="h-3 w-3 rounded-full bg-[#22c55e]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return children
}

export default LocationProtectedRoute