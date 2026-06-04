import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const StatsApi = createApi({
    reducerPath:"StatsApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        // get dashboard stats 
        GetDashboardStats:builder.query({
            query:()=> "/api/admin/dashboard/stats",
        })
    })
})

export const {useGetDashboardStatsQuery} = StatsApi