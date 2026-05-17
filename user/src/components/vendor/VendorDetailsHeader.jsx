import { capitalizeWords } from "@/utils/Helpers";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdStar, MdVerified } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import fallbackimage from "../../assets/hero.png"

import "swiper/css";
import "swiper/css/effect-fade";

const VendorDetailsHeader = ({ vendorDetails }) => {

    const media = [
        ...(vendorDetails?.dairyImages || []).map((img) => ({
            type: "image",
            url: img.url,
        })),

        ...(vendorDetails?.dairyVideos || []).map((video) => ({
            type: "video",
            url: video.url,
        })),
    ];

    return (
        <section className="max-w-7xl mx-auto relative mb-12 h-[280px] md:h-[360px] w-full overflow-hidden rounded-[28px] shadow-sm border  border-white/10">
            {/* fallback */}
            {media?.length === 0 && (
                <img
                    src={fallbackimage}
                    alt="dairy"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
            {/* media */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#111] via-[#1f1f1f] to-[#111]">
                {media?.length <= 1 ? (
                    media?.[0]?.type === "video" ? (
                        <video
                            src={media?.[0]?.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="h-full w-full object-cover md:object-contain"
                        />
                    ) : (
                        <img
                            src={media?.[0]?.url}
                            alt={vendorDetails?.displayName}
                            fetchPriority="high"
                            loading="eager"
                            className="h-full w-full object-cover md:object-contain"
                        />
                    )
                ) : (
                    <Swiper
                        modules={[Autoplay, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        loop
                        className="h-full w-full [&_.swiper]:h-full [&_.swiper-wrapper]:h-full [&_.swiper-slide]:h-full"
                    >
                        {media.map((item, index) => (
                            <SwiperSlide key={index}>
                                {item.type === "video" ? (
                                    <video
                                        src={item.url}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="h-full w-full object-cover md:object-contain"
                                    />
                                ) : (

                                    <img
                                        src={item.url}
                                        alt={`media-${index}`}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover md:object-contain"
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
            {/* overlay */}
            {media?.length > 0 && (
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
            )}
            {/* content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 md:p-12">
                <div>
                    {/* badges */}
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                        {vendorDetails?.kycStatus === "approved" && (
                            <span className="flex items-center gap-1 rounded-full bg-[#dcfce7]/95 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#166534] backdrop-blur-md">
                                <MdVerified className="text-sm" />
                                KYC Approved
                            </span>
                        )}
                        {vendorDetails?.rating > 0 && (
                            <div className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                                <MdStar className="text-[#facc15]" />
                                {vendorDetails?.rating} Rating
                            </div>
                        )}
                    </div>
                    {/* title */}
                    <h1 className="mb-3 text-[1.8rem] font-black tracking-tight text-white sm:text-5xl md:text-6xl">
                        {capitalizeWords(
                            vendorDetails?.displayName || "Milk Dairy"
                        )}
                    </h1>
                    {/* location */}
                    <div className="flex items-center gap-2 text-white/90">
                        <FaLocationDot className="text-[#86efac]" />
                        <span className="text-sm font-medium sm:text-base">
                            {capitalizeWords(vendorDetails?.city || "NA")}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VendorDetailsHeader;