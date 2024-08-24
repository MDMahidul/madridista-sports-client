/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useUpdateBlogMutation,
} from "@/redux/features/blog/blog.api";
import useUserProfile from "@/hooks/useUserProfile";
import { TBlog } from "@/types/types";

type TUpdateBlogProp = {
  blog: TBlog;
};

const UpdateBlogModal = ({ blog }: TUpdateBlogProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, userProfile } = useUserProfile();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateBlog] = useUpdateBlogMutation();

  const onSubmit = async (data: FieldValues) => {
    
    try {
      await updateBlog({ data, token, id: blog._id }).unwrap();
      toast.success("Blog updated Successfully!", { duration: 2000 });
      setIsOpen(false);
      reset();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || err, { duration: 2000 });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button>
          <PencilSquareIcon className="size-6 hover:text-primary transition-all duration-200 hover:scale-110 text-gray-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-center font-bold">
            Update Blog
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              <label htmlFor="blogTitle" className="add-product-label">
                Blog Title
              </label>
              <input
                type="text"
                id="blogTitle"
                className="add-input-field"
                defaultValue={blog.blogTitle}
                placeholder="Product Title"
                {...register("blogTitle", { required: true })}
              />
              {errors.blogTitle && (
                <span className="text-xs text-red-500">
                  Blog Title is required *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="category" className="add-product-label">
                Category
              </label>
              <select
                className="add-input-field"
                defaultValue={blog.category}
                {...register("category", { required: true })}
              >
                <option value=""> Select </option>
                <option value="Diet"> Diet </option>
                <option value="Health-Care"> Health Care </option>
                <option value="Sports"> Sports </option>
                <option value="Exercise">Exercise </option>
                <option value="Tools">Tools </option>
                <option value="Fitness">Fitness </option>
                <option value="Lifestyle">Lifestyle </option>
              </select>
              {errors.category && (
                <span className=" text-xs text-red-500">
                  Please select any category *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="authorName" className="add-product-label">
                Author Name
              </label>
              <input
                type="text"
                id="authorName"
                className="add-input-field"
                defaultValue={userProfile?.data?.name}
                placeholder="Author Name"
                {...register("authorName", {
                  required: true,
                })}
              />
              {errors.authorName && (
                <span className="text-xs text-red-500">
                  Author name is required *
                </span>
              )}
            </div>
          </div>
          <div className="mb-5 ">
            <div>
              <label htmlFor="ratings" className="add-product-label">
                Image Link
              </label>
              <input
                type="url"
                id="imageLink"
                className="add-input-field"
                defaultValue={blog.imageLink}
                placeholder="image link"
                {...register("imageLink", { required: true })}
              />
              {errors.imageLink && (
                <span className="text-xs text-red-500">
                  Image link is required *
                </span>
              )}
            </div>
            <div>
              <label htmlFor="description" className="add-product-label">
                Description
              </label>
              <textarea
                id="description"
                className="add-input-field"
                placeholder="Write Class Description..."
                defaultValue={blog.description}
                rows={2}
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-xs text-red-500">
                  Description is required *
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="w-full primary-button" type="submit">
              Add Blog
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBlogModal;
