import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const SubscriptionStatsApi = createApi({
    reducerPath: "SubscriptionStatsApi",
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
        getSubscriptionStats: builder.query({
            query: () => "/api/vendor/subscriptions/stats",
        })
    })
})

export const {useGetSubscriptionStatsQuery} = SubscriptionStatsApi 

