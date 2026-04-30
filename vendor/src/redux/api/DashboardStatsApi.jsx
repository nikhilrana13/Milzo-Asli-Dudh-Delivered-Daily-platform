import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const DashboardStatsApi = createApi({
    reducerPath:"DashboardStatsApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        getDashboardStats:builder.query({
            query:()=> "/api/vendor/dashboard/stats",
        })
    })
});

export const {useGetDashboardStatsQuery} = DashboardStatsApi