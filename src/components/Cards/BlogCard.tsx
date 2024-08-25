import { TBlog } from "@/types/types";
import { formatDate } from "@/utils/formatDate";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

type TBlogCardProp={
    blog:TBlog;
}

const BlogCard = ({ blog }: TBlogCardProp) => {
  return (
    <Link to={`/blogs/${blog._id}`}>
      <div className="max-w-sm mx-auto bg-white rounded-lg hover:shadow-md overflow-hidden border">
        <img
          className="w-full h-48 object-cover"
          src={blog.imageLink}
          alt="Hero dog"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-sm">
              {formatDate(blog.createdAt)}
            </p>
            <span className="bg-green-200 text-green-800 text-xs font-semibold rounded-full px-2.5 py-1">
              {blog.category}
            </span>
          </div>
          <h3 className="mt-2 text-xl font-semibold text-primary">
            {blog.blogTitle}
          </h3>
          <p className="mt-2 text-gray-600 text-sm">
            {blog.description.length > 80
              ? `${blog.description.slice(0, 80)}...`
              : blog.description}
          </p>
          <div className="mt-4 flex justify-between">
            <p className="text-gray-500 text-sm font-semibold">
              By {blog.authorName}
            </p>
            <button
              className="text-sm text-tertiary font-semibold flex items-center capitalize group"
            >
              read more
              <FaArrowRight className="ms-1 group-hover:translate-x-1 transition-transform duration-200"/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;