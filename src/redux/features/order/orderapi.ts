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
  }),
});

export const { useAddOrderMutation } = orderApi;
