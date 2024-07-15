/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TGetAllProductsQueryParams {
  category?: string;
  name?: string;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://madridista-sports-server.vercel.app/api",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, TGetAllProductsQueryParams>({
      query: ({ category, name } = {}) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (name) params.append("name", name);

        return {
          url: `/product/all-products?${params.toString()}`,
          method: "GET",
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
