import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdClose, MdError } from "react-icons/md";
import { motion } from "framer-motion";
import { useGetBookingDetailsQuery } from '@/redux/api/BookingApi';

const PaymentFailed = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");

    const BookingQuery = useGetBookingDetailsQuery(bookingId, { skip: !bookingId });
    const booking = BookingQuery?.data?.data?.booking;

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
        <div className="min-h-screen bg-gradient-to-b from-[#fef2f2] via-white to-white flex items-center justify-center p-4">
            <div className="relative px-3 py-3 w-full max-w-lg sm:max-w-xl md:max-w-2xl rounded-2xl bg-white border border-red-100 shadow-[0_20px_80px_rgba(239,68,68,0.12)] overflow-hidden">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-red-500/20 blur-3xl" />
                <button
                    onClick={() => navigate("/")}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
                >
                    <MdClose size={18} />
                </button>
                <div className="flex justify-center items-center mt-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 12,
                        }}
                    >
                        <div className="flex h-20 w-20 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-red-100 shadow-[0_0_40px_rgba(239,68,68,0.25)]">
                            <MdError
                                size={72}
                                className="text-red-500"
                            />
                        </div>
                    </motion.div>
                </div>
                <h1 className="mt-6 px-3 text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a]">
                    Payment Failed 😔
                </h1>

                <p className="mx-auto px-3 mt-3 max-w-md text-center text-gray-500 text-[0.8rem]">
                    We couldn't complete your payment.
                    Don't worry, no amount will be charged
                    unless the payment is successfully processed.
                </p>
                <p className="mt-2 text-center text-[0.8rem] font-medium text-red-500">
                    Transaction could not be completed
                </p>
                <div className="mt-5 rounded-2xl bg-[#f8fafc] border p-5 sm:p-6">
                    <div className="flex justify-between items-center py-3 border-b">
                        <span className="text-gray-500">
                            Booking ID
                        </span>

                        <span className="font-semibold">
                            #{booking?._id?.slice(-8)}
                        </span>
                    </div>
                    <div className="mt-5 rounded-xl bg-red-50 p-4 text-center">
                        <p className="text-sm font-medium text-red-600">
                            Payment was not completed.
                            Please try again to activate your subscription.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-4 font-semibold text-white shadow-lg"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full rounded-2xl border py-4 font-semibold text-gray-700 bg-white"
                        >
                            Back To Home
                        </button>
                    </div>
                    <div className="mx-6 mb-6 mt-5 rounded-xl bg-amber-50 border border-amber-100 p-4">
                        <p className="text-sm text-amber-700 text-center">
                            Common reasons include insufficient balance,
                            bank verification issues, or payment cancellation.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PaymentFailed;
