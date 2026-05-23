import React from 'react';
import SelectedAddressCard from './SelectedAddressCard';
import SubscriptionPricing from './SubscriptionPricing';
import { useDialog } from '@/context/DialogContext';

const SubscriptionDesktop = ({selectedAddress,selectedDeliveryTimings,setSelectedDeliveryTimings,minTime,maxTime,selectProductData,selectedPriceOption,startDate,setStartDate,endDate,setEndDate,selectedCampaign,onHandleShowOffers,handleCreateSubscriptionBooking,dailyAmount,totalDays,subtotalAmount,discountAmount,finalAmount,todayDate}) => {
    const {setActiveDialog} = useDialog()
  return (
    <aside className="sticky lg:block hidden top-28 self-start">
                <div className="bg-white w-full md:w-[400px] p-6 sm:p-8 rounded-3xl border border-[#eef0f2] shadow-[0_12px_32px_rgba(25,28,30,0.04)] max-h-[calc(100vh-120px)] overflow-y-auto  custom-scrollbar">
                    {/* heading */}
                    <h2 className="text-2xl font-bold text-[#191c1e] mb-8">
                        Subscription Summary
                    </h2>
                    {/* address */}
                    <div className="mb-7">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                Delivery Address
                            </label>
                            <button
                                onClick={() => setActiveDialog("location")}
                                className="text-[#16a34a] text-xs font-semibold hover:underline"
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
                            {/* slot buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedDeliveryTimings((prev) => ({
                                            ...prev,
                                            slot: "morning",
                                            time: "07:00",
                                        }))
                                    }
                                    className={`py-3 rounded-xl text-sm font-semibold transition-all ${selectedDeliveryTimings.slot === "morning"
                                        ? "bg-[#16a34a] text-white"
                                        : "bg-white text-gray-600 border"
                                        }`}
                                >
                                    Morning
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedDeliveryTimings((prev) => ({
                                            ...prev,
                                            slot: "evening",
                                            time: "17:00",
                                        }))
                                    }
                                    className={`py-3 rounded-xl text-sm font-semibold transition-all ${selectedDeliveryTimings.slot === "evening"
                                        ? "bg-[#16a34a] text-white"
                                        : "bg-white text-gray-600 border"
                                        }`}
                                >
                                    Evening
                                </button>
                            </div>
                            {/* time input */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 mb-2 block">
                                    Delivery Time
                                </label>
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
                                    className="w-full px-4 py-3 bg-white rounded-xl outline-none border focus:ring-2 focus:ring-[#16a34a]/20"
                                />
                            </div>
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
                    <div className="grid grid-cols-2 gap-7 mb-8">
                        {/* start date */}
                        <div>
                            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2 block">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                min={todayDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="rounded-2xl border bg-[#f7f7f7] p-3 text-sm text-gray-500"
                            />
                        </div>

                        {/* end date */}
                        <div>
                            <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-2 block">
                                End Date
                            </label>
                            <input
                                type="date"
                                min={startDate || todayDate}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="rounded-2xl border bg-[#f7f7f7] p-3 text-sm text-gray-500"
                            />
                        </div>
                    </div>
                    {/* offers  */}
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
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] text-white
                    font-bold text-lg shadow-xl shadow-[#22c55e]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Proceed to Subscribe
                    </button>
                    <p className="text-[10px] text-center text-gray-500 mt-4 font-semibold uppercase tracking-[0.18em]">
                        No long term commitment. Pause anytime.
                    </p>
                </div>
            </aside>
  );
}

export default SubscriptionDesktop;
