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
import { useState } from "react";
import { toast } from "sonner";

type TDeleteModalProps = {
  entityName: string;
  onDelete: () => Promise<void>;
  onClose?: () => void;
  buttonName?: string;
};

const DeleteModal = ({
  entityName,
  onDelete,
  onClose,
  buttonName,
}: TDeleteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete();
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
      toast.success("Removed successfully !", { duration: 2000 });
    } catch (err: any) {
      console.error(err);
      toast.error("Something went wrong !", { duration: 2000 });
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {buttonName ? (
            <button className="seceondary-button">{buttonName}</button>
          ) : (
            <button>
              <TrashIcon className="size-6 text-red-500 hover:text-red-600 transition-all duration-200 hover:scale-105" />
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-primary text-center font-bold py-5 mb-5">
              Do you want to remove this {entityName}?
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-between">
            <DialogClose asChild>
              <button
                className="bg-primary px-4 md:px-8 py-1.5 md:py-2 text-white text-sm font-semibold rounded-md hover:bg-blue-900 transform transition-all duration-200 hover:shadow-lg"
                type="submit"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={handleDelete}
              className="bg-tertiary px-4 md:px-8 py-1.5 md:py-2 text-white text-sm font-semibold rounded-md hover:bg-red-700 transform transition-all duration-200 hover:shadow-lg"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
