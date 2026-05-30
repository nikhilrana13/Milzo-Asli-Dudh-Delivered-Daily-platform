import { useDialog } from '@/context/DialogContext';
import React from 'react';
import SelectedAddressCard from './SelectedAddressCard';
import { IoClose } from 'react-icons/io5';
import SubscriptionPricing from './SubscriptionPricing';

const SubscriptionMobile = ({setShowMobileSummary,selectedAddress,selectedDeliveryTimings,setSelectedDeliveryTimings,minTime,maxTime,selectProductData,selectedPriceOption,startDate,setStartDate,endDate,setEndDate,selectedCampaign,onHandleShowOffers,handleCreateSubscriptionBooking,dailyAmount,totalDays,subtotalAmount,discountAmount,finalAmount,todayDate,loading}) => {
    const {setActiveDialog} = useDialog()
  return (
    <div className="fixed inset-0 z-[70] bg-black/40 pb-28 lg:hidden">
                    {/* backdrop */}
                    <div
                        onClick={() => setShowMobileSummary(false)}
                        className="absolute inset-0"
                    />
                    {/* sheet */}
                    <div className="absolute bottom-0 left-0 right-0 max-h-[92vh] overflow-y-auto rounded-t-[32px] bg-white p-6 animate-slide-up custom-scrollbar pb-28">
                        {/* handle */}
                        <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-gray-300" />
                        {/* heading */}
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-[#191c1e]">
                                Subscription Summary
                            </h2>
                            <button
                                onClick={() => setShowMobileSummary(false)}
                                className="text-2xl text-gray-400"
                            >
                                <IoClose />
                            </button>
                        </div>
                        {/* address */}
                        <div className="mb-7">
                            <div className="mb-3 flex items-center justify-between">
                                <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                    Delivery Address
                                </label>
                                <button
                                    onClick={() => setActiveDialog("location")}
                                    className="text-[#16a34a] text-xs font-semibold"
                                >
                                    Change
                                </button>
                            </div>
                            <SelectedAddressCard selectedAddress={selectedAddress} />
                        </div>
                        {/* slot */}
                        <div className="mb-7">
                            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-3 block">
                                Preferred Slot
                            </label>
                            <div className="bg-[#f3f4f6] p-4 rounded-2xl space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedDeliveryTimings({
                                                slot: "morning",
                                                time: "07:00",
                                            })
                                        }
                                        className={`py-3 rounded-xl text-sm font-semibold transition-all ${selectedDeliveryTimings.slot === "morning"
                                            ? "bg-[#16a34a] text-white"
                                            : "bg-white border text-gray-600"
                                            }`}
                                    >
                                        Morning
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedDeliveryTimings({
                                                slot: "evening",
                                                time: "17:00",
                                            })
                                        }
                                        className={`py-3 rounded-xl text-sm font-semibold transition-all ${selectedDeliveryTimings.slot === "evening"
                                            ? "bg-[#16a34a] text-white"
                                            : "bg-white border text-gray-600"
                                            }`}
                                    >
                                        Evening
                                    </button>
                                </div>
                                <input
                                    type="time"
                                    min={minTime}
                                    max={maxTime}
                                    value={selectedDeliveryTimings.time}
                                    onChange={(e) =>
                                        setSelectedDeliveryTimings((prev) => ({
                                            ...prev,
                                            time: e.target.value,
                                        }))
                                    }
                                    className="w-full rounded-xl border bg-white px-4 py-3 outline-none"
                                />
                            </div>
                        </div>
                         {/* selected products */}
                    <div className="mb-7">
                        <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-3 block">
                            Selected Product
                        </label>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between bg-[#fafafa] border border-[#f1f1f1] rounded-2xl px-4 py-3">
                                <span className="text-sm text-[#191c1e]">
                                    {selectProductData?.product?.productName}
                                </span>
                                <span className="text-sm font-bold text-[#191c1e]">
                                    ₹{selectedPriceOption?.sellingPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                        {/* dates */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <input
                                type="date"
                                value={startDate}
                                min={todayDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-2xl border bg-[#f7f7f7] p-3 text-sm"
                            />
                            <input
                                type="date"
                                value={endDate}
                                min={startDate || todayDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-2xl border bg-[#f7f7f7] p-3 text-sm"
                            />
                        </div>
                        {/* apply offers */}
                        <div
                            onClick={() => onHandleShowOffers()}
                            className={`relative overflow-hidden rounded-3xl border p-5 cursor-pointer transition-all ${selectedCampaign ? "border-[#16a34a] bg-[#f0fdf4]" : "border-[#eef0f2] bg-white"}`}>
                            {/* glow */}
                            {selectedCampaign && (
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#16a34a] to-[#22c55e]" />
                            )}
                            <div className="flex items-center justify-between gap-4">
                                {/* left */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
                                        Available Offers
                                    </p>
                                    <h4 className="mt-2 text-lg font-black text-[#191c1e]">
                                        {selectedCampaign
                                            ? "Offer Applied Successfully"
                                            : "Apply Coupon"}
                                    </h4>
                                    <p className="mt-1 text-sm text-[#16a34a] font-semibold">
                                        {selectedCampaign
                                            ? "Extra savings added to your subscription"
                                            : "Save more on this order"}
                                    </p>
                                </div>
                                {/* right */}
                                <div className={`rounded-2xl px-4 py-2 text-sm font-bold ${selectedCampaign ? "bg-[#16a34a] text-white"
                                    : "border border-[#16a34a] text-[#16a34a]"}`}
                                >
                                    {selectedCampaign ? "Applied" : "View All"}
                                </div>
                            </div>
                        </div>
                        {/* price breakdown */}
                        <SubscriptionPricing dailyAmount={dailyAmount} totalDays={totalDays} quantity={selectProductData?.quantity} subtotalAmount={subtotalAmount} discountAmount={discountAmount} finalAmount={finalAmount} />

                        {/* button */}
                        <button
                            onClick={handleCreateSubscriptionBooking}
                            disabled={loading}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white
                    font-bold text-lg shadow-xl shadow-[#22c55e]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                         {loading ? "Please Wait...":" Proceed to Subscribe"}
                        </button>
                        <p className="text-[10px] text-center text-gray-500 mt-4 font-semibold uppercase tracking-[0.18em]">
                            No long term commitment. Pause anytime.
                        </p>
                    </div>
                </div>
  );
}

export default SubscriptionMobile;
