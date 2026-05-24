const SubscriptionCardShimmer = () => {
    return (
        <div
            className="overflow-hidden rounded-3xl border border-[#eef0f2] bg-white
            shadow-sm animate-pulse"
        >
            {/* image section */}
            <div className="relative h-52 sm:h-64 bg-gray-200">
                {/* top badge */}
                <div className="absolute top-4 right-4 h-8 w-28 rounded-full bg-white/40" />

                {/* bottom content */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                    <div className="flex-1">
                        <div className="h-7 w-44 rounded-lg bg-white/40 mb-3" />
                        <div className="h-4 w-32 rounded bg-white/30 mb-3" />
                        <div className="h-6 w-20 rounded-full bg-white/30" />
                    </div>

                    <div className="rounded-2xl bg-white/40 px-4 py-3 w-24">
                        <div className="h-3 w-14 rounded bg-gray-200 mb-2 mx-auto" />
                        <div className="h-6 w-16 rounded bg-gray-300 mx-auto" />
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="p-4 sm:p-6">
                {/* info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {/* address */}
                    <div className="rounded-2xl border border-[#eef2f7] p-4">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />

                            <div className="flex-1">
                                <div className="h-3 w-24 rounded bg-gray-200 mb-3" />
                                <div className="h-4 w-full rounded bg-gray-200 mb-2" />
                                <div className="h-4 w-3/4 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>

                    {/* slot */}
                    <div className="rounded-2xl border border-[#eef2f7] p-4">
                        <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />

                            <div className="flex-1">
                                <div className="h-3 w-24 rounded bg-gray-200 mb-3" />
                                <div className="h-4 w-32 rounded bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* subscription period */}
                <div
                    className="rounded-2xl border border-[#f1f5f9]
                    p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />

                        <div>
                            <div className="h-3 w-32 rounded bg-gray-200 mb-3" />
                            <div className="h-4 w-48 rounded bg-gray-200" />
                        </div>
                    </div>

                    <div className="sm:text-right">
                        <div className="h-3 w-24 rounded bg-gray-200 mb-3 sm:ml-auto" />
                        <div className="h-7 w-28 rounded bg-gray-300 sm:ml-auto" />
                    </div>
                </div>

                {/* button */}
                <div className="h-14 w-full rounded-2xl bg-gray-200" />
            </div>
        </div>
    )
}

export default SubscriptionCardShimmer