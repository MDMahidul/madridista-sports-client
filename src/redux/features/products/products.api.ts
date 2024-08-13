/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global";

const productsApi = baseApi.injectEndpoints({
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
          params: params,
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
  useGetSingleProductQuery,
  useAddOrderMutation,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
