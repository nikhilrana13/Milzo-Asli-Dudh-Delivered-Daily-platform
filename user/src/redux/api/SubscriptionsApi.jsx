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
        // pause and active subscription 
        UpdatePauseAndActiveSubs:builder.mutation({
            query:({id,status})=>({
                url:`/api/subscriptions/${id}/pause-or-active`,
                method:"PATCH",
                body:{
                    status
                }
            }),
             invalidatesTags:["SubscriptionsApi"]
        })
    }),
});

export const { useGetMySubscriptionsQuery,useUpdatePauseAndActiveSubsMutation} = SubscriptionsApi;

