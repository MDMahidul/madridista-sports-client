import { baseApi } from "@/redux/api/baseApi";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: ({ token, items }) => ({
        url: "/wishlist/add-to-wishlist",
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: { items },
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: builder.query({
      query: ({ token }) => ({
        url: "/wishlist/get-wishlist",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["wishlist"],
    }),
    removeWishlistItem: builder.mutation({
      query: ({ token, productId }) => ({
        url: "/wishlist/remove-wishlist",
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
        body: { productId },
      }),
      invalidatesTags: ["wishlist"],
    }),
    clearWishlist: builder.mutation({
      query: ({ token }) => ({
        url: "/wishlist/clear-wishlist",
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

  export const {useAddToWishlistMutation,useGetWishlistQuery,useRemoveWishlistItemMutation,useClearWishlistMutation}=wishlistApi;