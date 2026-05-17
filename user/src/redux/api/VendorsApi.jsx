import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const VendorsApi = createApi({
    reducerPath: "VendorsApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["VendorsApi"],
    endpoints: (builder) => ({
        // find vendors based on user location coords
        FetchNearByVendors: builder.query({
            query: ({ lat, lng, toprated, maxDistance,page,limit}) => ({
                url: "/api/vendors/find",
                method: "GET",
                params: {
                    lat,
                    lng,
                    ...(toprated && {
                        toprated
                    }),
                    ...(maxDistance && {
                        maxDistance
                    }),
                    page,
                    limit,
                },
               
            }),
             providesTags: ["VendorsApi"]
        }),
        // fetch vendor details 
        FetchVendorDetails:builder.query({
            query:(id)=>({
                url:`/api/vendor/${id}`,
                method:"GET",
                
                
            }),
            providesTags:["VendorsApi"]
        })
    }),
})


export const { useFetchNearByVendorsQuery,useFetchVendorDetailsQuery} = VendorsApi