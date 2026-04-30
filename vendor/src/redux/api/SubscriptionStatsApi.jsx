import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const SubscriptionStatsApi = createApi({
    reducerPath: "SubscriptionStatsApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getSubscriptionStats: builder.query({
            query: () => "/api/vendor/subscriptions/stats",
        })
    })
})

export const {useGetSubscriptionStatsQuery} = SubscriptionStatsApi 

