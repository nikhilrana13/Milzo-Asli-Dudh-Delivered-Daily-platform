import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const GetVendorBookings = createApi({
    reducerPath: "GetVendorBookings",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        // get vendor Bookings
        GetVendorBookings: builder.query({
            query: ({ page = 1, limit = 5,status}) => {
                const params = new URLSearchParams({
                    page,
                    limit,
                    ...(status && { status}),
                })
                return `/api/bookings/vendor?${params.toString()}`
            },
        }),
    })
})

export const {useGetVendorBookingsQuery} = GetVendorBookings