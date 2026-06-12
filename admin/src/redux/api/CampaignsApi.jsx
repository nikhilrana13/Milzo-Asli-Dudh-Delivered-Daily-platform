import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const CampaignsApi = createApi({
    reducerPath:"CampaignsApi",
    baseQuery:baseQueryWithAuth,
    tagTypes:["CampaignsApi"],
    endpoints:(builder)=>({
        // get all campaigns
        GetAllCampaigns:builder.query({
                 query:()=>"/api/admin/all-campaigns",
                 providesTags:["CampaignsApi"]
        }),
        // toggle campaign status 
        ToggleCampaignStatus:builder.mutation({
            query:(id)=>({
                url:`/api/admin/campaign/toggle/${id}`,
                method:"PATCH"
            }),
            invalidatesTags:["CampaignsApi"]
        }),
        // Create a Campaign 
        CreateACampaign:builder.mutation({
            query:(payload)=>({
                url:`/api/admin/create-campaign`,
                method:"POST",
                body: payload
            }),
            invalidatesTags:["CampaignsApi"]
        })
    })
})

export const {useGetAllCampaignsQuery,useToggleCampaignStatusMutation,useCreateACampaignMutation} = CampaignsApi