import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";




export const GetVendorBookings = createApi({
    reducerPath: "GetVendorBookings",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers;
        }
    }),
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