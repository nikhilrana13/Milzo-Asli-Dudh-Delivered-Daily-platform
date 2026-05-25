import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";

export const SubscriptionsApi = createApi({
    reducerPath: "SubscriptionsApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["SubscriptionsApi"],
    endpoints: (builder) => ({
        // find user subscriptions
        getMySubscriptions: builder.query({
            query: ({ page, limit }) => ({
                url: "/api/subscriptions/my",
                params: { page, limit },
            }),
            providesTags: ["SubscriptionsApi"],
        }),
    }),
});

export const { useGetMySubscriptionsQuery } = SubscriptionsApi;

