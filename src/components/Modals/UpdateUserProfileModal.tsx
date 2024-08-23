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
import { toast } from "sonner";
import { ImSpinner9 } from "react-icons/im";
import useUserProfile from "@/hooks/useUserProfile";
import { useUpdateUserProfileMutation } from "@/redux/features/user/userapi";

const UpdateUserProfileModal = ({user}:any) => {
      const [isOpen, setIsOpen] = useState(false);
      const token=useUserProfile();
      const {name,email,address,contactNo,pImage}=user.data;
      const {
        register,
        handleSubmit,
        reset,
      } = useForm();
      const [updateUserProfile,{isLoading}] = useUpdateUserProfileMutation();

      const onSubmit = async (data: FieldValues) => {
      
        try {
          await updateUserProfile({ data, token }).unwrap();
          reset();
          toast.success("Profile Data Updated Successfully!");
          setIsOpen(false);
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
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <button className="primary-button w-full mt-4">Update Profile</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-primary text-center font-bold mb-2">
              Update User Profile
            </DialogTitle>
          </DialogHeader>
          <form className="px-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="product_name" className="add-product-label">
                User Name
              </label>
              <input
                type="text"
                id="name"
                className="add-input-field"
                defaultValue={name}
                placeholder="User name"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="add-product-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="add-input-field"
                defaultValue={email}
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <div>
              <label htmlFor="contactNo" className="add-product-label">
                Contact No.
              </label>
              <input
                type="text"
                id="contactNo"
                className="add-input-field"
                defaultValue={contactNo}
                placeholder="contact No"
                {...register("contactNo")}
              />
            </div>
            <div>
              <label htmlFor="address" className="add-product-label">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="add-input-field"
                defaultValue={address}
                placeholder="Address"
                {...register("address")}
              />
            </div>
            <div>
              <label htmlFor="product_name" className="add-product-label">
                Profile Image Link
              </label>
              <input
                type="linkurl"
                id="pImage"
                className="add-input-field"
                defaultValue={pImage}
                placeholder="Image link"
                {...register("pImage")}
              />
            </div>
            <div>
              <button type="submit" className={`w-full primary-button`}>
                {isLoading ? (
                  <ImSpinner9 className="m-auto animate-spin" size={24} />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateUserProfileModal;
