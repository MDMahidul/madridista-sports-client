/* eslint-disable @typescript-eslint/no-unused-vars */
import BlogCard from "@/components/Cards/BlogCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import Loader from "@/components/Loader/Loader";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blog.api";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import LoadingError from "../Error/LoadingError";
import { TQueryParams } from "@/types/global";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import { TBlog } from "@/types/types";

const Blogs = () => {
  const [params] = useState<TQueryParams[]>([]);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <Container>
        <SectionHeader heading="Blogs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5 md:gap-y-10 mx-auto">
          {blogData.data.map((blog: TBlog, itemIndex: number) => (
            <FadeInUpAnimation custom={itemIndex} key={blog._id}>
              <BlogCard blog={blog} />
            </FadeInUpAnimation>
          ))}
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

export default Blogs;
