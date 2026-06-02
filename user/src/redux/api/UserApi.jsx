import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const UserApi = createApi({
    reducerPath:"UserApi",
    baseQuery:baseQueryWithAuth,
    tagTypes: ["UserApi"],
    endpoints:(builder)=>({
        // get user profile 
        GetUserProfile:builder.query({
            query:()=>"/api/user/myprofile",
            providesTags:["UserApi"]
        }),
        // update user profile
        UpdateUserProfile:builder.mutation({
            query:(formData)=>({
               url:"/api/user/update-profile",
               method:"PUT",
               body:formData
            }),
             invalidatesTags:["UserApi"]
        })
    })
})

export const {useGetUserProfileQuery,useUpdateUserProfileMutation} = UserApi