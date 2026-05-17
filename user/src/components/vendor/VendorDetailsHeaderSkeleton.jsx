import React from "react";

const VendorDetailsHeaderSkeleton = () => {
    return (
        <section className="max-w-7xl mx-auto relative mb-12 h-[280px] md:h-[360px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#111]">
            {/* background shimmer */}
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111]" />
            {/* fake media shimmer */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full md:w-[70%] animate-pulse bg-[#1f1f1f]" />
            </div>
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            {/* content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
                {/* badges */}
                <div className="mb-4 flex items-center gap-3">
                    <div className="h-8 w-32 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-8 w-24 rounded-full bg-white/10 animate-pulse" />
                </div>
                {/* title */}
                <div className="space-y-3">
                    <div className="h-10 w-[220px] rounded-lg bg-white/10 animate-pulse sm:w-[320px]" />
                    <div className="h-10 w-[180px] rounded-lg bg-white/10 animate-pulse sm:w-[260px]" />
                </div>
                {/* location */}
                <div className="mt-5 flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-white/10 animate-pulse" />
                    <div className="h-5 w-32 rounded bg-white/10 animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default VendorDetailsHeaderSkeleton;