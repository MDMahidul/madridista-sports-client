/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useDeleteProductMutation } from "@/redux/features/products/products.api";
import { toast } from "sonner";
import { useState } from "react";

type TDeleteProp = {
  id: string;
};

const DeleteProductModal = ({ id }: TDeleteProp) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    try {
      deleteProduct(id);
      setIsOpen(false);
      toast.success("Product deleted successfully!");
    } catch (err: any) {
      toast.error(err.data?.message || err.message || err);
    }
  };
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button>
            <TrashIcon className="size-6 hover:text-primary transition-all duration-200 hover:scale-110" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-primary text-center font-bold py-5 mb-5">
              Do you want to delete this product?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-between">
            <DialogClose asChild>
              <button
                className="bg-secondary px-4 md:px-8 py-1.5 md:py-2 text-white text-sm font-semibold rounded-md hover:bg-yellow-400 transform transition-all duration-200 hover:scale-105"
                type="submit"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={() => handleSubmit()}
              className="bg-tertiary px-4 md:px-8 py-1.5 md:py-2 text-white text-sm font-semibold rounded-md hover:bg-red-700 transform transition-all duration-200 hover:scale-105"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteProductModal;
