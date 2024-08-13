import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/users/user-signup",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation } = authApi;
