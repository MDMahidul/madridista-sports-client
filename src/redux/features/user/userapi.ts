/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /*  getAllProducts: builder.query({
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
    }), */
    getUserProfie: builder.query({
      query: (token) => ({
        method: "GET",
        url: `/users/profile`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      providesTags: ["user"],
    }),
    updateUserProfile: builder.mutation({
      query: ({ data, token }) => ({
        method: "PUT",
        url: `/users/update-user-profile`,
        headers: {
          Authorization: `${token}`,
        },
        body: {user:data},
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {useGetUserProfieQuery,useUpdateUserProfileMutation
} = userApi;
