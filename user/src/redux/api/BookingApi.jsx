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
     }),
})

export const { useGetBookingDetailsQuery } = BookingApi
