import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";



export const GetVendorProducts = createApi({
    reducerPath: "GetVendorProducts",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers;
        }
    }),
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