import { useGetUserSavedAddressesQuery } from "@/redux/api/UsersavedAddressesApi";
import React, { useMemo, useState } from "react";
import { useDialog } from "@/context/DialogContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import ShowUserOffers from "./ShowUserOffers";
import { api } from "@/services/api";
import SubscriptionDesktop from "./SubscriptionDesktop";
import MobileBottomBar from "./MobileBottomBar";
import SubscriptionMobile from "./SubscriptionMobile";

const SubscriptionSummary = ({ selectProductData, selectedPriceOption }) => {
    const [loading,setLoading] = useState(false)
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
    // time validation
    const minTime =
        selectedDeliveryTimings.slot === "morning" ? "06:00" : "16:00";
    const maxTime =
        selectedDeliveryTimings.slot === "morning" ? "10:00" : "20:00";
    const isValidTime =
        selectedDeliveryTimings.time >= minTime &&
        selectedDeliveryTimings.time <= maxTime;
    // find total price
    const pricing = useMemo(() => {
        const dailyAmount = selectedPriceOption?.sellingPrice || 0
        const totalDays = startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1 : 0
        const totalAmount = dailyAmount * totalDays * (selectProductData?.quantity || 1)
        return { dailyAmount, totalDays, totalAmount }
    }, [startDate, endDate, selectedPriceOption, selectProductData
    ])
    const [showMobileSummary, setShowMobileSummary] = useState(false);
    const [showOffers, setShowOffers] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [offerPricing, setOfferPricing] = useState(null)
    const isMobile = window.innerWidth < 1024;
    useLockBodyScroll(isMobile && showMobileSummary);
    const discountAmount = Number(offerPricing?.discountAmount || 0);
    const finalAmount = Number(offerPricing?.finalAmount || pricing?.totalAmount);
    const subtotalAmount = Number(offerPricing?.totalAmount || pricing?.totalAmount);

    // validation
    const validateSubscription = () => {
        if (!user) {
            toast.info("Please login to continue");
            return false;
        }
        if (!selectedAddressId) {
            toast.error("Please select delivery address");
            return false;
        }
        if (!startDate) {
            toast.error("Please select start date");
            return false;
        }
        if (!endDate) {
            toast.error("Please select end date");
            return false;
        }
        if (endDate < startDate) {
            toast.error("End date cannot be before start date");
            return false;
        }
        return true
    }
    // show offers
    const handleShowOffers = () => {
        if (!validateSubscription()) return
        setShowOffers(true)
    }
    // handle apply offer
    const handleApplyOffer = async (campaignId) => {
        if (!validateSubscription()) return;
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
        if (!validateSubscription()) return;
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
        for(let key in payload){
            console.log(key,payload[key])
        }
        try {
           setLoading(true)
            const response = await api.post("/api/booking/create-booking",payload) 
            if(response){
                toast.success(response?.data?.message)
                const url = response?.data?.url
                if(url){
                window.location.href = url;
                }
            }
        } catch (error) {
            console.error("failed to create subscription",error)
            return toast.error(error?.response?.data?.message || 'Internal server error')
        }finally{
          setLoading(false)
        }
    };

    const subscriptionProps = {
        selectedAddress,
        selectedDeliveryTimings,
        setSelectedDeliveryTimings,
        minTime,
        maxTime,
        selectProductData,
        selectedPriceOption,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedCampaign,
        onHandleShowOffers: handleShowOffers,
        handleCreateSubscriptionBooking,
        loading,
        dailyAmount: pricing?.dailyAmount,
        totalDays: pricing?.totalDays,
        subtotalAmount,
        discountAmount,
        finalAmount,
        todayDate,
    };

    return (
        <>
            {/* for desktop */}
            <SubscriptionDesktop {...subscriptionProps} />
            {/* mobile bottom bar */}
            <MobileBottomBar finalAmount={finalAmount} setShowMobileSummary={setShowMobileSummary} />
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
                <SubscriptionMobile setShowMobileSummary={setShowMobileSummary} {...subscriptionProps}  />
            )}
        </>
    );
};

export default SubscriptionSummary;
