import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useForm } from "react-hook-form";

const AddProductModal = () => {
    const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors },  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

    const handleOpenChange = (open) => {
      setIsOpen(open);
      if (!open) {
        reset();
      }
    };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="primary-button">
          Add Product
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              <label htmlFor="product_name" className="add-product-label">
                Product Title
              </label>
              <input
                type="text"
                id="product_title"
                className="add-input-field"
                placeholder="Product Title"
                {...register("product_title", { required: true })}
              />
              {errors.product_title && (
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
                <label htmlFor="offer_price" className="add-product-label">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="add-input-field"
                  placeholder="Quantity "
                  {...register("quantity", { required: true })}
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
                  type="text"
                  id="price"
                  className="add-input-field"
                  placeholder="price $"
                  {...register("price", { required: true })}
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
                  type="text"
                  id="off_percentage"
                  className="add-input-field"
                  placeholder="off percentage %"
                  {...register("off_percentage", { required: true })}
                />
                {errors.off_percentage && (
                  <span className=" text-xs text-red-500">
                    Please select off percentage *
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 ">
              <div>
                <label htmlFor="category" className="add-product-label">
                  Category
                </label>
                <select
                  className="add-input-field"
                  defaultValue=""
                  name="category"
                  {...register("category", { required: true })}
                >
                  <option value=""> Select </option>
                  <option value="football"> Football </option>
                  <option value="cricket"> Cricket </option>
                  <option value="tennis"> Tennis </option>
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
                  placeholder="Ratings"
                  {...register("ratings", { required: true })}
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
                id="image_link"
                className="add-input-field"
                placeholder="image link"
                {...register("image_link", { required: true })}
              />
              {errors.image_link && (
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
                rows="2"
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
            <button className="w-full primary-button" type="submit">Save changes</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
