import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";



export const GetVendorProducts = createApi({
    reducerPath:"GetVendorProducts",
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
        GetVendorProducts:builder.query({
            query:({page = 1,limit = 5})=> `/api/products/vendor?page=${page}&limit=${limit}`,
        })
    })
})

export const {useGetVendorProductsQuery} = GetVendorProducts