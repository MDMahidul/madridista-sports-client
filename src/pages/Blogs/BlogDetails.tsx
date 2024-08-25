import Loader from "@/components/Loader/Loader";
import { useGetSingleBlogQuery } from "@/redux/features/blog/blog.api";
import { useParams } from "react-router-dom";
import LoadingError from "../Error/LoadingError";
import { Helmet } from "react-helmet-async";
import Container from "@/components/Container/Container";
import { formatDate } from "@/utils/formatDate";

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: blogData,
    isError,
    isLoading,
  } = useGetSingleBlogQuery(id, {
    pollingInterval: 30000,
  });
  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }
  if (isError || !blogData) {
    <LoadingError />;
  }
  const { blogTitle,imageLink,authorName,createdAt,category,description } = blogData.data;
  return (
    <div className="pt-28 md:pt-28 mb-20">
      <Helmet>
        <title>{blogTitle}</title>
      </Helmet>
      <Container>
        <div className="sm:max-w-4xl mx-auto shadow p-2 sm:p-10 ">
          <img
            className="sm:w-9/12 mx-auto sm:h-[48vh] object-cover"
            src={imageLink}
            alt=""
          />
          <div className="sm:mt-10">
            <div className="flex justify-between items-center flex-wrap">
              <p className="text-lg sm:text-xl font-semibold py-3 text-primary">
                {blogTitle}
              </p>
              <span className="bg-green-200 text-green-800 text-xs font-semibold rounded-full px-2.5 py-1">
                {category}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm font-semibold">
                By {authorName}
              </p>
              <p className="text-gray-500 text-sm font-semibold">
                {formatDate(createdAt)}
              </p>
            </div>
            <div className="my-5"><p>{description}</p></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
