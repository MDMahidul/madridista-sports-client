/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { TQueryParams } from "@/types/global";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: `/blog/all-blogs`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/blog/get-blog/${id}`,
      }),
      providesTags: ["blog"],
    }),
    addBlog: builder.mutation({
      query: ({ data, token }) => ({
        method: "POST",
        url: "/blog/add-blog",
        headers: {
          Authorization: `${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ data, token, id }) => ({
        method: "PUT",
        url: `/blog/update-blog/${id}`,
        headers: {
          Authorization: `${token}`,
        },
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteBlog: builder.mutation({
      query: ({ token, id }) => ({
        method: "DELETE",
        url: `/blog/delete-blog/${id}`,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const { useGetAllBlogsQuery, useAddBlogMutation,useGetSingleBlogQuery,useUpdateBlogMutation,useDeleteBlogMutation } = blogApi;
