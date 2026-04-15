import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const RevenueOverviewApi = createApi({
    reducerPath:"RevenueOverviewApi",
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
        getRevenueOverview:builder.query({
            query:()=> "/api/vendor/dashboard/revenue-overview",
        })
    })
});

export const {useGetRevenueOverviewQuery} = RevenueOverviewApi