
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const BookingStatsApi = createApi({
    reducerPath:"BookingStatsApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        getBookingStats:builder.query({
            query:()=> "/api/vendor/bookings/stats",
        })
    })
})

export const {useGetBookingStatsQuery} = BookingStatsApi