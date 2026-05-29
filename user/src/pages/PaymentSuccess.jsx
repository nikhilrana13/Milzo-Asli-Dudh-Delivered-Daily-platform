import { useGetBookingDetailsQuery } from '@/redux/api/BookingApi';
import React, { useEffect, useState } from 'react';
import { MdCheckCircle, MdClose } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Confetti from "react-confetti";
import { motion } from "framer-motion"

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const [showConfetti, setShowConfetti] = useState(true);
    const BookingQuery = useGetBookingDetailsQuery(bookingId, { skip: !bookingId });
    const booking = BookingQuery?.data?.data?.booking;

    const handleViewSubscriptions = () => {
        navigate("/subscriptions",{replace:true});
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (BookingQuery?.isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-[#dcfce7] border-t-[#16a34a] animate-spin" />
            </div>
        );
    }

    if (BookingQuery?.isError) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <h2 className="text-lg font-semibold">Unable to load booking</h2>
                    <p className="mt-2 text-sm text-gray-600">There was an issue fetching your booking details.</p>
                    <button
                        onClick={() => BookingQuery.refetch()}
                        className="mt-4 inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-white"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {showConfetti && <Confetti recycle={false} numberOfPieces={250} />}
            <div className="min-h-[100vh] bg-gradient-to-b from-[#f0fdf4] via-white to-white flex items-center justify-center p-4">
                <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl bg-white border border-[#dcfce7] shadow-[0_20px_80px_rgba(22,163,74,0.12)]  overflow-hidden">

                    <div className="absolute -top-16 left-1/2  -translate-x-1/2 h-40 w-40 rounded-full bg-[#22c55e]/20 blur-3xl" aria-hidden />

                    {/* success check */}
                    <div className="flex justify-center mt-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                            className="mx-auto mt-8"
                        >
                            <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#dcfce7] shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                                <MdCheckCircle size={72} className="text-[#16a34a]" aria-hidden />
                            </div>
                        </motion.div>
                    </div>


                    <h1 className="mt-6 px-3 text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a]">Payment Successful 🎉</h1>

                    <p className="mx-auto px-3 mt-3 max-w-md text-center text-gray-500 text-sm sm:text-base">
                        Your subscription has been activated successfully. We'll start delivering on your selected schedule.
                    </p>

                    <div className="m-6 mt-8 rounded-2xl bg-[#f8fafc] border p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b gap-2">
                            <span className="text-gray-500">Booking ID</span>
                            <span className="font-semibold text-sm sm:text-base">#{booking?._id?.slice(-8) ?? '—'}</span>
                        </div>

                        <div className="mt-5 rounded-lg bg-[#ecfdf5] p-3 text-center">
                            <p className="text-sm font-medium text-[#15803d]">Subscription Activated Successfully</p>
                        </div>

                        <div className=" grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <button
                                onClick={handleViewSubscriptions}
                                className="w-full rounded-2xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] py-3 sm:py-4 font-semibold text-white shadow"
                                aria-label="View My Subscription"
                            >
                                View My Subscription
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full rounded-2xl border py-3 sm:py-4 font-semibold text-gray-700 bg-white"
                                aria-label="Continue Shopping"
                            >
                                Back to Home
                            </button>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
                            aria-label="Close"
                        >
                            <MdClose size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentSuccess;
