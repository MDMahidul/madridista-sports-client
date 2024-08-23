import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: ({ token, orderData }) => {
        console.log(token);
        return {
          url: "/order/add-order",
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: orderData,
        };
      },
      invalidatesTags: ["cartItem", "order"],
    }),
    getUserOrder: builder.query({
      query: ({ token }) => ({
        url: "/order/get-user-order",
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["order","cartItem"],
    }),
  }),
});

export const { useAddOrderMutation,useGetUserOrderQuery } = orderApi;
