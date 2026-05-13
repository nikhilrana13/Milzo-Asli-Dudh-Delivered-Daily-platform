import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";




export const UserSavedAddressesApi = createApi({
    reducerPath:"UserSavedAddressesApi",
    baseQuery:baseQueryWithAuth,
    tagTypes:["SavedAddresses"],
    endpoints:(builder)=>({
        // get user addresses
        getUserSavedAddresses:builder.query({
            query:()=> '/api/user/all-address',
            providesTags:["SavedAddresses"]
        }),
        // add new address 
        addNewAddress:builder.mutation({
             query:(formdata)=>({
                url:"/api/user/add-address",
                method:"PUT",
                body:{
                    newaddress:formdata
                }
             }),
             invalidatesTags:["SavedAddresses"]
        }),
        // delete address 
        deleteAddress:builder.mutation({
           query:(id)=>({
            url:"/api/user/address-delete",
            method:"DELETE",
            body:{
                addressId:id
            }
           }),
           invalidatesTags:["SavedAddresses"]
        }),
        // update address 
        updateAddress:builder.mutation({
            query:({addressId,formdata})=>({
                url:"/api/user/update-address",
                method:"PUT",
                body:{
                    addressId,
                    ...formdata
                }
            }),
             invalidatesTags:["SavedAddresses"]
        })
    }),
})

export const {useGetUserSavedAddressesQuery,useAddNewAddressMutation,useDeleteAddressMutation,useUpdateAddressMutation} = UserSavedAddressesApi