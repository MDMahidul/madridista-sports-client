/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParams } from "@/types/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* interface TGetAllProductsQueryParams {
  category?: string;
  name?: string;
} */

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/product/all-products`,
          method: "GET",
          params:params
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/product/get-product/${id}`,
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/product/add-product",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        method: "PUT",
        url: `/product/update-product/${id}`,
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/product/delete-product/${id}`,
      }),
      invalidatesTags: ["products"],
    }),
    addOrder: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/order/add-order",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useAddOrderMutation,
} = baseApi;
