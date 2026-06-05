import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const VendorApi = createApi({
    reducerPath:"VendorApi",
    baseQuery:baseQueryWithAuth,
    tagTypes:["VendorApi"],
    endpoints:(builder)=>({
        // find Vendors
        GetAllVendors:builder.query({
            query:()=> "/api/admin/allvendors",
            providesTags:["VendorApi"]
        })
    })
})


export const {useGetAllVendorsQuery} = VendorApi 