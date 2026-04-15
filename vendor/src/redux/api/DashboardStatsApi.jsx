import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const DashboardStatsApi = createApi({
    reducerPath:"DashboardStatsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BACKEND_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem("token");
            if(token){
                headers.set("Authorization",`Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getDashboardStats:builder.query({
            query:()=> "/api/vendor/dashboard/stats",
        })
    })
});

export const {useGetDashboardStatsQuery} = DashboardStatsApi