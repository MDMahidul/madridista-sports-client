/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useSignupMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const SignUpPage = () => {
  const [disabled, setDisabled] = useState(true);
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSingUp = async(data: FieldValues) => {
    const userInfo = {
      user: {
        name: data.name,
        email: data.email,
        contactNo: data.contactNo,
        address: data.address,
        password: data.password,
      },
    };
    try {
      await signup(userInfo).unwrap();
      reset();
      toast.success("Sign Up successfully!", {
        duration: 2000,
        style: { padding: "10px" },
      });
      navigate('/signin');
    } catch (error:any) {
      console.log(error.data.errorSources[0].message);
      toast.error(error.data?.errorSources[0]?.message, {
        duration: 2000,
        style: { padding: "10px" },
      });
    }
  };

  return (
    <div className="pt-5 pb-10">
      <div className="pb-5">
        <img className="w-20 mx-auto" src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-center max-w-lg md:max-w-xl mx-auto gap-y-8">
        <div className=" text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-7 text-primary">
            Welcome to madridista sports!
          </h2>
          <h4 className="text-lg md:text-2xl font-semibold text-primary">
            Sign up to get started
          </h4>
        </div>
        <div>
          <form
            className="px-10 space-y-5"
            onSubmit={handleSubmit(handleSingUp)}
          >
            <div className="relative">
              <input
                type="text"
                id="name"
                className="block add-input-field appearance-none  peer"
                placeholder=" "
                {...register("name", { required: true })}
              />
              <label htmlFor="name" className="floating-label">
                Name
              </label>
            </div>
            {errors.name && (
              <span className="text-xs text-red-500">Name is required *</span>
            )}
            <div className="relative">
              <input
                type="email"
                id="email"
                className="block add-input-field appearance-none  peer"
                placeholder=" "
                {...register("email", { required: true })}
              />
              <label htmlFor="email" className="floating-label">
                Email
              </label>
            </div>
            {errors.email && (
              <span className="text-xs text-red-500">Email is required *</span>
            )}
            <div className="relative">
              <input
                type="text"
                id="contactNo"
                className="block add-input-field appearance-none  peer"
                placeholder=" "
                {...register("contactNo", { required: true })}
              />
              <label htmlFor="contactNo" className="floating-label">
                Contact No.
              </label>
            </div>
            {errors.contactNo && (
              <span className="text-xs text-red-500">
                Contact No. is required *
              </span>
            )}
            <div className="relative">
              <input
                type="text"
                id="address"
                className="block add-input-field appearance-none peer"
                placeholder=" "
                {...register("address", { required: true })}
              />
              <label htmlFor="address" className="floating-label">
                Address
              </label>
            </div>
            {errors.address && (
              <span className="text-xs text-red-500">
                Address is required *
              </span>
            )}
            <div className="relative">
              <input
                type="password"
                id="password"
                className="block add-input-field appearance-none  peer"
                placeholder=" "
                {...register("password", { required: true })}
              />
              <label htmlFor="password" className="floating-label">
                Password
              </label>
            </div>
            {errors.password && (
              <span className="text-xs text-red-500">
                Password is required *
              </span>
            )}
            <div className="">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  onChange={() => setDisabled(!disabled)}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-transparent "
                />
                <label
                  htmlFor="link-checkbox"
                  className="ms-2 text-sm font-medium text-gray-600 "
                >
                  I agree with the terms and conditions.
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full primary-button`}
                disabled={disabled}
              >
                {isLoading ? (
                  <ImSpinner9 className="m-auto animate-spin" size={24} />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className="text-center text-sm mt-5">
            <p>
              Already have an account?{" "}
              <Link className="text-blue-600 font-medium" to="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
