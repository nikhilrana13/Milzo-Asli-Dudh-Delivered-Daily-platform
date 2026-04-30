import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth, { baseQuery } from "./BaseQuery";





export const GetVendorSubscriptions = createApi({
    reducerPath: "GetVendorSubscriptions",
    baseQuery: baseQueryWithAuth,
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