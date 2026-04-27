import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";





export const GetVendorSubscriptions = createApi({
    reducerPath: "GetVendorSubscriptions",
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
    tagTypes: ["Subscriptions"],
    endpoints: (builder) => ({
        // get vendor subscription
        GetVendorSubscriptions: builder.query({
            query: ({ page = 1, limit = 5, paymentStatus, bookingStatus }) => {
                const params = new URLSearchParams({
                    page,
                    limit,
                    ...(paymentStatus && { paymentStatus }),
                    ...(bookingStatus && { bookingStatus }),
                })

                return `/api/subscriptions/vendor?${params.toString()}`
            },
            providesTags: ["Subscriptions"]
        }),
        // update subscription status cancel or approve
        updateBookingStatus:builder.mutation({
            query: ({ id, status }) => ({
                url: `/api/subscriptions/${id}/confirm-or-cancel`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Subscriptions"],
        })

    })

})

export const { useGetVendorSubscriptionsQuery,useUpdateBookingStatusMutation} = GetVendorSubscriptions