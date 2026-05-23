import { api } from "@/services/api";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import OfferCardShimmer from "./OfferCardShimmer";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

const ShowUserOffers = ({ setShowOffers, selectedCampaign,onApplyOffer}) => {
    const [LoadOffers, setLoadOffers] = useState(false);
    const [allOffers, setAllOffers] = useState([]);
    useLockBodyScroll(true)


    // fetch all offers
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoadOffers(true);
                const response = await api.get("/api/user/offers");
                if (response) {
                    const campaigns = response?.data?.campaigns || [];
                    setAllOffers(campaigns);
                }
            } catch (error) {
                console.error("Failed to get campaigns", error);
            } finally {
                setLoadOffers(false);
            }
        };
        fetchOffers();
    }, []);
    // console.log("campaigns", allOffers);
    
    return (
        <div className="fixed inset-0 z-[105] bg-black/40">
            {/* backdrop */}
            <div onClick={() => setShowOffers(false)} className="absolute inset-0" />
            {/* modal */}
            <div className="absolute bottom-0 left-0 right-0 lg:top-1/2 lg:left-1/2 lg:bottom-auto lg:w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2 rounded-t-[32px] lg:rounded-[32px] bg-white p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                {/* heading */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-[#191c1e]">
                        Available Offers
                    </h2>
                    <button
                        onClick={() => setShowOffers(false)}
                        className="text-2xl text-gray-400"
                    >
                        <IoClose />
                    </button>
                </div>
                {/* offers list */}
                {
                    LoadOffers ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => {
                                return (
                                    <OfferCardShimmer key={i} />
                                )
                            })}
                        </div>
                    ) : allOffers?.length > 0 ? (
                        <div className="space-y-4">
                            {allOffers?.map((campaign) => {
                                return (
                                    <div
                                        key={campaign?._id}
                                        className={`relative overflow-hidden rounded-3xl border bg-white p-5 transition-all ${selectedCampaign === campaign?._id
                                            ? "border-[#16a34a] shadow-[0_8px_30px_rgba(34,197,94,0.12)]"
                                            : "border-[#eef0f2]"
                                            }`}
                                    >
                                        {/* top green glow */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#16a34a] to-[#22c55e]" />
                                        <div className="flex items-start justify-between gap-4">
                                            {/* left */}
                                            <div className="flex-1 min-w-0">
                                                {/* badge */}
                                                <div className="inline-flex items-center rounded-full bg-[#f0fdf4] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#16a34a] mb-3">
                                                    Limited Offer
                                                </div>
                                                {/* title */}
                                                <h3 className="text-lg font-black text-[#191c1e]">
                                                    {campaign?.title}
                                                </h3>
                                                {/* discount */}
                                                <p className="mt-1 text-sm font-semibold text-[#16a34a]">
                                                    {campaign?.discountType === "percentage"
                                                        ? `${campaign?.discountValue}% OFF`
                                                        : `₹${campaign?.discountValue} OFF`}
                                                </p>
                                                {/* minimum */}
                                                {campaign?.minOrderAmount > 0 && (
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Valid on orders above ₹{campaign?.minOrderAmount}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {/* button */}
                                        <button
                                            onClick={()=>onApplyOffer(campaign?._id)}
                                            className={`min-w-[90px] rounded-2xl mt-8 px-4 py-2 text-sm font-bold transition-all
                                   ${selectedCampaign === campaign?._id ? "bg-[#16a34a] text-white"
                                                    : "border border-[#16a34a] text-[#16a34a]"}`}
                                        >
                                            {selectedCampaign === campaign?._id ? "Applied" : "Apply"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-[32px] border border-dashed border-[#dcfce7] bg-gradient-to-b from-[#f0fdf4] to-white px-6 py-14 text-center">
                            {/* icon */}
                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#dcfce7] shadow-inner">
                                <span className="text-4xl">
                                    🎁
                                </span>
                            </div>
                            {/* heading */}
                            <h3 className="text-2xl font-black text-[#191c1e]">
                                No Offers Available
                            </h3>
                            {/* desc */}
                            <p className="mt-3 max-w-[320px] text-sm leading-6 text-gray-500">
                                There are no active campaigns available for this subscription right now.
                                Please check back later for exciting discounts and exclusive offers.
                            </p>
                            {/* tag */}
                            <div className="mt-6 rounded-full bg-[#16a34a]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#16a34a]">
                                More Offers Coming Soon
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default ShowUserOffers;
