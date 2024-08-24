/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FieldValues, useForm } from "react-hook-form";
import { useUpdateProductMutation } from "@/redux/features/products/products.api";
import { toast } from "sonner";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TProduct } from "@/types/types";

type TUpdateModalProp = {
  product: TProduct;
};

const UpdateProductModal = ({ product }: TUpdateModalProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = product._id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateProduct] = useUpdateProductMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      await updateProduct({ data, id });
      toast.success("Product Updated Successfully!");
      setIsOpen(false);
      reset();
    } catch (err: any) {
      toast.error(err.data?.message || err.message || err);
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
          <PencilSquareIcon className="size-6 hover:text-primary transition-all duration-200 hover:scale-110" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-center font-bold">
            Update Product
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              <label htmlFor="product_name" className="add-product-label">
                Product Title
              </label>
              <input
                type="text"
                id="name"
                className="add-input-field"
                defaultValue={product.name}
                placeholder="Product Title"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-xs text-red-500">
                  Title is required *
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
              <div>
                <label htmlFor="price" className="add-product-label">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  className="add-input-field"
                  defaultValue={product.brand}
                  placeholder="product brand $"
                  {...register("brand", { required: true })}
                />
                {errors.brand && (
                  <span className=" text-xs text-red-500">
                    Please select product brand *
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="quantity" className="add-product-label">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="add-input-field"
                  defaultValue={product.quantity}
                  placeholder="Quantity "
                  {...register("quantity", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                {errors.quantity && (
                  <span className=" text-xs text-red-500">
                    Please select product Quantity
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
              <div>
                <label htmlFor="price" className="add-product-label">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="add-input-field"
                  defaultValue={product.price}
                  placeholder="price $"
                  {...register("price", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                {errors.price && (
                  <span className=" text-xs text-red-500">
                    Please select product price *
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="offer_price" className="add-product-label">
                  Off Percentage
                </label>
                <input
                  type="number"
                  id="off"
                  className="add-input-field"
                  defaultValue={product.off}
                  placeholder="off percentage %"
                  {...register("off", {
                    required: false,
                    valueAsNumber: true,
                  })}
                />
                {/* {errors.off && (
                  <span className=" text-xs text-red-500">
                    Please select off percentage *
                  </span>
                )} */}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
              <div>
                <label htmlFor="category" className="add-product-label">
                  Category
                </label>
                <select
                  className="add-input-field"
                  defaultValue={product.category}
                  {...register("category", { required: true })}
                >
                  <option value=""> Select </option>
                  <option value="football"> Football </option>
                  <option value="cricket"> Cricket </option>
                  <option value="tennis"> Tennis </option>
                  <option value="golf"> Golf </option>
                  <option value="basketball">Basketball </option>
                </select>
                {errors.category && (
                  <span className=" text-xs text-red-500">
                    Please select any category *
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="ratings" className="add-product-label">
                  Ratings
                </label>
                <input
                  type="text"
                  id="ratings"
                  className="add-input-field"
                  defaultValue={product.ratings}
                  placeholder="Ratings"
                  {...register("ratings", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                {errors.ratings && (
                  <span className="text-xs text-red-500">
                    Ratings is required *
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mb-5 grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
            <div>
              <label htmlFor="ratings" className="add-product-label">
                Image Link
              </label>
              <input
                type="url"
                id="imageLink"
                className="add-input-field"
                defaultValue={product.imageLink}
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
                placeholder="Write product des..."
                defaultValue={product.description}
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
              Save changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductModal;
