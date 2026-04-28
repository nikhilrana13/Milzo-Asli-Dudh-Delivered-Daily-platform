import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";





export const BookingStatsApi = createApi({
    reducerPath:"BookingStatsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BACKEND_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem("token");
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getBookingStats:builder.query({
            query:()=> "/api/vendor/bookings/stats",
        })
    })
})

export const {useGetBookingStatsQuery} = BookingStatsApi