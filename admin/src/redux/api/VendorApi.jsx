import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const VendorApi = createApi({
    reducerPath:"VendorApi",
    baseQuery:baseQueryWithAuth,
    tagTypes:["VendorApi"],
    endpoints:(builder)=>({
        // find Vendors
        GetAllVendors:builder.query({
            query:({page,limit,kycStatus})=>({
               url:"/api/admin/allvendors",
               method:"GET",
               params:{
                page:page, 
                limit:limit,
                kycStatus:kycStatus
               }
            }),
            providesTags:["VendorApi"]
        })
    })
})


export const {useGetAllVendorsQuery} = VendorApi 