import { useGetUserSavedAddressesQuery } from "@/redux/api/UsersavedAddressesApi";
import React, { useState } from "react";
import SelectedAddressCard from "./SelectedAddressCard";
import { useDialog } from "@/context/DialogContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import ShowUserOffers from "./ShowUserOffers";
import { api } from "@/services/api";

const SubscriptionSummary = ({ selectProductData, selectedPriceOption }) => {
    const user = useSelector((state) => state.Auth.user);
    const [selectedDeliveryTimings, setSelectedDeliveryTimings] = useState({
        slot: "morning",
        time: "07:00",
    });
    const todayDate = new Date().toISOString().split("T")[0];
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const selectedAddressId = localStorage.getItem("selectedAddressId");
    const addressQuery = useGetUserSavedAddressesQuery(undefined, {
        skip: !user,
    });
    const userSavedaddresses = addressQuery?.data?.data?.addresses || [];
    const selectedAddress = userSavedaddresses.find(
        (address) => address?._id === selectedAddressId,
    );
    const { setActiveDialog } = useDialog();
    // time validation
    const minTime =
        selectedDeliveryTimings.slot === "morning" ? "06:00" : "16:00";
    const maxTime =
        selectedDeliveryTimings.slot === "morning" ? "10:00" : "20:00";
    const isValidTime =
        selectedDeliveryTimings.time >= minTime &&
        selectedDeliveryTimings.time <= maxTime;
    // find total price
    const dailyAmount = selectedPriceOption?.sellingPrice || 0
    const totalDays =
        startDate && endDate
            ? Math.ceil(
                (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
            ) + 1
            : 0;
    const totalAmount = dailyAmount * totalDays * (selectProductData?.quantity || 1);
    const [showMobileSummary, setShowMobileSummary] = useState(false);
    const [showOffers, setShowOffers] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [offerPricing, setOfferPricing] = useState(null)
    const isMobile = window.innerWidth < 1024;
    useLockBodyScroll(isMobile && showMobileSummary);
    const discountAmount = Number(offerPricing?.discountAmount || 0);
    const finalAmount = Number(offerPricing?.finalAmount || totalAmount);
    const subtotalAmount = Number(offerPricing?.totalAmount || totalAmount);


    const handleShowOffers = () => {
        if (!user) {
            return toast.info("Please login to continue")
        }
        if (!selectedAddressId) {
            return toast.error("Please select delivery address first")
        }
        if (!startDate) {
            return toast.error("Please select start date first")
        }
        if (!endDate) {
            return toast.error("Please select end date first")
        }
        if (endDate < startDate) {
            return toast.error("End date cannot be before start date")
        }
        setShowOffers(true)
    }
    // handle apply offer
    const handleApplyOffer = async (campaignId) => {
        if (!user) {
            toast.info("Please login to continue");
            return;
        }
        // validation
        if (!selectedAddressId) {
            return toast.error("Please select delivery address");
        }
        if (!startDate) {
            return toast.error("Please select start date");
        }
        if (!endDate) {
            return toast.error("Please select end date");
        }
        if (endDate < startDate) {
            return toast.error("End date cannot be before start date");
        }
        // remove offer
        if (selectedCampaign === campaignId) {
            setSelectedCampaign(null)
            setOfferPricing(null)
            toast.info("Offer removed")
            return
        }
        try {
            const response = await api.post("/api/user/apply-offer", {
                productId: selectProductData?.product?._id,
                vendorId: selectProductData?.product?.vendorId,
                quantity: selectProductData?.quantity,
                pricePerDay: selectedPriceOption?.sellingPrice,
                startDate: startDate,
                endDate: endDate,
                campaignId: campaignId ?? selectedCampaign,
            });
            // console.log("response", response);
            const pricingData = response?.data;
            // console.log("pricingData", pricingData);
            setSelectedCampaign(campaignId);
            setOfferPricing({
                ...pricingData,
            });
            toast.success(response?.message);
            setShowOffers(false);
        } catch (error) {
            console.error("Failed to applying offer", error);
            setSelectedCampaign(null)
            setOfferPricing(null)
            return toast.error(error?.response?.data?.message || 'Internal server error')
        }
    };
    // handle create subscription booking
    const handleCreateSubscriptionBooking = async () => {
        if (!user) {
            toast.info("Please login to continue");
            return;
        }
        // validation
        if (!selectedAddressId) {
            return toast.error("Please select delivery address");
        }
        if (!startDate) {
            return toast.error("Please select start date");
        }
        if (!endDate) {
            return toast.error("Please select end date");
        }
        if (endDate < startDate) {
            return toast.error("End date cannot be before start date");
        }
        if (!isValidTime) {
            return toast.error(
                selectedDeliveryTimings.slot === "morning"
                    ? "Morning delivery allowed only between 6 AM - 10 AM"
                    : "Evening delivery allowed only between 4 PM - 8 PM",
            );
        }
        const payload = {
            productId: selectProductData?.product?._id,
            vendorId: selectProductData?.product?.vendorId,
            quantity: selectProductData?.quantity,
            selectedPriceOptionId: selectedPriceOption?._id,
            startDate: startDate,
            endDate: endDate,
            deliveryTimings: [selectedDeliveryTimings],
            deliveryAddress: selectedAddress,
            campaignId: selectedCampaign,
        };
        // for(let key in payload){
        //     console.log(key,payload[key])
        // }
        try {
        } catch (error) { }
    };
    return (
        <>
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
                        onClick={() => handleShowOffers()}
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
                    <div className="border-t border-[#eef0f2] pt-6 space-y-4 mb-8">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Daily Amount</span>
                            <span>₹{dailyAmount}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Total Days</span>
                            <span>{totalDays} Days</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Quantity</span>
                            <span>{selectProductData?.quantity}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Subtotal</span>
                            <span>₹{subtotalAmount}</span>
                        </div>
                        {
                            discountAmount > 0 && (
                                <div className="flex items-center justify-between text-sm text-[#16a34a] font-semibold">
                                    <span>Offer Discount</span>
                                    <span>-₹{discountAmount}</span>
                                </div>
                            )
                        }
                        <div className="flex items-center justify-between pt-3 border-t border-dashed">
                            <span className="text-xl font-black text-[#191c1e]">
                                Final Total
                            </span>
                            <span className="text-3xl font-black text-[#16a34a]">
                                ₹{finalAmount}
                            </span>
                        </div>
                    </div>
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
            {/* mobile bottom bar */}
            <div
                className="fixed bottom-16 left-0 right-0 z-[60] border-t border-[#eef0f2] bg-white/95 backdrop-blur-xl p-4 lg:hidden"
            >
                <div className="flex items-center justify-between gap-4">
                    {/* total */}
                    <div>
                        <p className="text-xs font-medium text-gray-500">
                            Subscription Total
                        </p>
                        <h3 className="text-2xl font-black text-[#191c1e]">
                            ₹{finalAmount}
                        </h3>
                    </div>
                    {/* open sheet */}
                    <button
                        onClick={() => setShowMobileSummary(true)}
                        className="rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#22c55e]/20"
                    >
                        Continue
                    </button>
                </div>
            </div>
            {/* apply offers dialog */}
            {showOffers && (
                <ShowUserOffers
                    setShowOffers={setShowOffers}
                    selectedCampaign={selectedCampaign}
                    onApplyOffer={handleApplyOffer}
                />
            )}
            {/* mobile subscription sheet */}
            {showMobileSummary && (
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
                            onClick={() => handleShowOffers()}
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
                        <div className="border-t border-[#eef0f2] pt-6 space-y-4 mb-8">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Daily Amount</span>
                                <span>₹{dailyAmount}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Total Days</span>
                                <span>{totalDays} Days</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Quantity</span>
                                <span>{selectProductData?.quantity}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>Subtotal</span>
                                <span>₹{subtotalAmount}</span>
                            </div>
                            {
                                discountAmount > 0 && (
                                    <div className="flex items-center justify-between text-sm text-[#16a34a] font-semibold">
                                        <span>Offer Discount</span>
                                        <span>-₹{discountAmount}</span>
                                    </div>
                                )
                            }

                            <div className="flex items-center justify-between pt-3 border-t border-dashed">
                                <span className="text-xl font-black text-[#191c1e]">
                                    Final Total
                                </span>
                                <span className="text-3xl font-black text-[#16a34a]">
                                    ₹{
                                        finalAmount
                                    }
                                </span>
                            </div>
                        </div>
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
                </div>

            )}
        </>
    );
};

export default SubscriptionSummary;
