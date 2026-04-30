import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";


export const RevenueOverviewApi = createApi({
    reducerPath:"RevenueOverviewApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        getRevenueOverview:builder.query({
            query:()=> "/api/vendor/dashboard/revenue-overview",
        })
    })
});

export const {useGetRevenueOverviewQuery} = RevenueOverviewApi