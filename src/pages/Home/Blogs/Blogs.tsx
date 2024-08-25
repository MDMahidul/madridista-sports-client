/* eslint-disable @typescript-eslint/no-unused-vars */
import BlogCard from "@/components/Cards/BlogCard";
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";
import Loader from "@/components/Loader/Loader";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blog.api";
import { useState } from "react";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import { TBlog } from "@/types/types";
import LoadingError from "@/pages/Error/LoadingError";
import { Link } from "react-router-dom";
import { TQueryParams } from "@/types/global";

const Blogs = () => {
  const [params] = useState<TQueryParams[]>([]);
  const {
    data: blogData,
    isLoading,
    isError,
  } = useGetAllBlogsQuery(
    [ { name: "limit", value: 3 }, ...params],
    {
      pollingInterval: 30000,
    }
  );

  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }

  if (isError || !blogData) {
    <LoadingError />;
  }

  

  return (
    <div className="md-5 md:mb-10">
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
          <div className="text-center">
            <Link to={"/blogs"}>
              <button className="seceondary-button mt-10">Explore More</button>
            </Link>
          </div>
        </FadeInUpAnimation>
      </Container>
    </div>
  );
};

export default Blogs;
