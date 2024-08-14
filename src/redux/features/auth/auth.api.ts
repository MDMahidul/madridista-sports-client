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
    forgetpassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: email,
      }),
    }),
    resetpassword: builder.mutation({
      query: ({ email, newPassword, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: { email, newPassword },
      }),
    }),
  }),
});

export const { useSigninMutation, useSignupMutation,useForgetpasswordMutation,useResetpasswordMutation } = authApi;
