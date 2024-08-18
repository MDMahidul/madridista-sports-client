import { baseApi } from "@/redux/api/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: ({ token, items }) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: { items },
      }),
      invalidatesTags: ["cartItem"],
    }),
    updateCart: builder.mutation({
      query: ( {updateItem ,token}) => {
        return {
          url: "/cart/update-cart",
          method: "PATCH",
          headers: {
            Authorization: `${token}`,
          },
          body: updateItem ,
        };
      },
      invalidatesTags: ["cartItem"],
    }),
    removeCartItem: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/cart/remove-cart",
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
        body: { productId },
      }),
      invalidatesTags: ["cartItem"],
    }),
   clearCartItem: builder.mutation({
      query: ({ token }) => ({
        url: "/cart/clear-cart",
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        }
      }),
      invalidatesTags: ["cartItem"],
    }),
    getCart: builder.query({
      query: ({ token }) => ({
        url: "/cart/get-cart",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["cartItem"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
  useRemoveCartItemMutation,useClearCartItemMutation
} = cartApi;
