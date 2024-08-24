/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import SlideInFromRight from "@/components/Animations/SlideInFromRight";
import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import AddBlogModal from "@/components/Modals/AddBlogModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import LoadingError from "@/pages/Error/LoadingError";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/features/blog/blog.api";
import { TQueryParams } from "@/types/global";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import UpdateBlogModal from "@/components/Modals/UpdateBlogModal";
import useUserProfile from "@/hooks/useUserProfile";

const ManageBlogs = () => {
  const token = useUserProfile();
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [deleteBlog] = useDeleteBlogMutation();
  const [page, setPage] = useState(1);
  const {
    data: blogData,
    isLoading,
    isError,
  } = useGetAllBlogsQuery([{ name: "page", value: page }, ...params], {
    pollingInterval: 30000,
  });

  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }

  if (isError || !blogData) {
    <LoadingError />;
  }

  const handleDeleteblog = async (id: string) => {
    await deleteBlog({ token, id });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="my-5 ">
      <Container>
        <div className="my-5 flex justify-between items-center border-b border-secondary pb-2">
          <SlideInFromLeft>
            <p className="font-semibold text-xl text-primary">Manage Blogs:</p>
          </SlideInFromLeft>
          <SlideInFromRight>
            <AddBlogModal />
          </SlideInFromRight>
        </div>
        <div>
          <div className="overflow-x-auto sm:rounded-lg">
            <FadeInUpAnimation>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SL</TableHead>
                    <TableHead>Blog</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogData.data.map((blog: any, itemIndex: number) => (
                    <TableRow key={itemIndex}>
                      <TableCell>{itemIndex + 1}.</TableCell>
                      <TableCell>
                        <div className="sm:flex items-center gap-2">
                          <img className="w-10" src={blog.imageLink} alt="" />
                          <p className="text-sm sm:text-base sm:font-semibold">
                            {blog.blogTitle.length > 20
                              ? `${blog.blogTitle.slice(0, 20)}...`
                              : blog.blogTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            ({formatDate(blog.createdAt)})
                          </p>
                        </div>
                        <p className="text-sm text-primary sm:font-medium capitalize  sm:ms-12">
                          By {blog.authorName}
                        </p>
                      </TableCell>
                      <TableCell>{blog.category}</TableCell>
                      <TableCell>
                        <div className="flex gap-4 justify-center items-center">
                          <UpdateBlogModal blog={blog} />
                          <DeleteModal
                            entityName="Blog"
                            onDelete={() => handleDeleteblog(blog._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </FadeInUpAnimation>
          </div>
        </div>
        <FadeInUpAnimation>
          <div className="my-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {Array.from({ length: blogData.meta.totalPage }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => handlePageChange(page + 1)}
                    className={
                      page === blogData.meta.totalPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </FadeInUpAnimation>
      </Container>
    </div>
  );
};

export default ManageBlogs;
