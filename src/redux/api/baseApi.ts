import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ category, name } = {}) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (name) params.append("name", name);

        return {
          url: `/all-products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/get-product/${id}`,
      }),
      providesTags: ["products"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/add-product",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        method: "PUT",
        url: `/update-product/${id}`,
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/delete-product/${id}`,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
} = baseApi;
