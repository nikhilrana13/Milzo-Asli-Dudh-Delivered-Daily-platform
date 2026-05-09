import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const UserSavedAddressesApi = createApi({
    reducerPath:"UserSavedAddressesApi",
    baseQuery:baseQueryWithAuth,
    endpoints:(builder)=>({
        getUserSavedAddresses:builder.query({
            query:()=> '/api/user/all-address'
        })
    })

})

export const {useGetUserSavedAddressesQuery} = UserSavedAddressesApi