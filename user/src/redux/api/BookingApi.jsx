import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const BookingApi = createApi({
     reducerPath: "BookingApi",
     baseQuery: baseQueryWithAuth,
     endpoints: (builder) => ({
        // fetch booking details 
        GetBookingDetails: builder.query({
            query: (id) => ({
                url: `/api/booking/${id}`,
                method: "GET",
            }),
        }),
        // get user all bookings 
        GetUserAllBookings:builder.query({
            query:({page,limit}) => ({
                url: "/api/bookings/user",
                params: { page, limit },
            })
        })
     }),
})

export const { useGetBookingDetailsQuery,useGetUserAllBookingsQuery} = BookingApi
