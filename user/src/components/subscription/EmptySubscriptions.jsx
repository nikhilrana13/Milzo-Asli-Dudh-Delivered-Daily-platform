import { useNavigate } from "react-router-dom"

const EmptySubscriptions = () => {
    const navigate = useNavigate()
    return (
            <div
                className="w-full max-w-xl  rounded-[2rem] border border-[#eef2f7]
                bg-gradient-to-br from-white to-[#f8fafc]
                p-8 sm:p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
            >
                {/* icon */}
                <div
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center
                    rounded-full bg-[#ecfdf3] shadow-inner"
                >
                    <span className="text-4xl">🥛</span>
                </div>

                {/* heading */}
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#191c1e]">
                    No Active Subscriptions
                </h2>

                {/* subtitle */}
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-500 max-w-md mx-auto">
                    Fresh farm deliveries are waiting for you. Subscribe to premium
                    dairy products and get them delivered to your doorstep every
                    morning.
                </p>

                {/* features */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <span
                        className="rounded-full bg-[#f0fdf4] px-4 py-2
                        text-xs font-semibold text-[#15803d]"
                    >
                        Farm Fresh
                    </span>

                    <span
                        className="rounded-full bg-[#eff6ff] px-4 py-2
                        text-xs font-semibold text-[#2563eb]"
                    >
                        Daily Delivery
                    </span>

                    <span
                        className="rounded-full bg-[#fefce8] px-4 py-2
                        text-xs font-semibold text-[#ca8a04]"
                    >
                        Premium Quality
                    </span>
                </div>
                {/* button */}
                <button
                    onClick={()=>navigate("/vendors")}
                    className="mt-10 inline-flex items-center justify-center
                    rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e]
                    px-8 py-4 text-sm sm:text-base font-semibold text-white
                    shadow-lg shadow-[#22c55e]/20
                    transition-all duration-300 hover:scale-[1.02]
                    active:scale-[0.98]"
                >
                    Explore Vendors
                </button>
                {/* bottom text */}
                <p className="mt-4 text-[11px] uppercase tracking-widest text-gray-400">
                    Pure Dairy • Trusted Farms • Smart Subscriptions
                </p>
            </div>
    )
}

export default EmptySubscriptions