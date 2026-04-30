import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";



export const GetVendorProducts = createApi({
    reducerPath: "GetVendorProducts",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["products"],
    endpoints: (builder) => ({
        // get products
        GetVendorProducts: builder.query({
            query: ({ page = 1, limit = 5 }) => `/api/products/vendor?page=${page}&limit=${limit}`,
            providesTags: ["products"]
        }),
        // delete products 
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["products"]
        }),
        // update product
        updateProductStatus: builder.mutation({
            query: ({ id, isAvailable }) => ({
                url: `/api/products/status-update/${id}`,
                method: "PATCH",
                body: { isAvailable },
            }),
            invalidatesTags: ["products"],
        }),
    })
})

export const { useGetVendorProductsQuery,useDeleteProductMutation,useUpdateProductStatusMutation} = GetVendorProducts