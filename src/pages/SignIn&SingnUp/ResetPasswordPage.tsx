/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FieldValues, useForm } from "react-hook-form";
import { useResetpasswordMutation } from "@/redux/features/auth/auth.api";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetpassword, { isLoading }] = useResetpasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleResetPassword = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Confirm sassword does not match", {
        duration: 2000,
        style: { padding: "10px" },
      });
      return;
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const newPassword = data.password;

    try {
      const result = await resetpassword({
        email,
        newPassword,
        token,
      }).unwrap();
      console.log(result);
      reset();
      toast.success("Password updated successfully !", {
        duration: 2000,
        style: { padding: "10px" },
      });
      navigate("/signin");
    } catch (error: any) {
      console.log(error.data.errorSources[0].message);
      toast.error(error.data?.errorSources[0]?.message, {
        duration: 2000,
        style: { padding: "10px" },
      });
    }
  };

  return (
    <>
      <div className="py-5">
        <img className="w-20 mx-auto" src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-center max-w-lg md:max-w-xl mx-auto gap-y-8">
        <div className=" text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-7 text-primary">
            Welcome to madridista sports!
          </h2>
          <h4 className="text-lg md:text-2xl font-semibold  text-primary">
            Submit email and new password
          </h4>
        </div>
        <div>
          <form
            className="px-10 space-y-5"
            onSubmit={handleSubmit(handleResetPassword)}
          >
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
            <div className="relative">
              <input
                type="password"
                id="confirmPassword"
                className="block add-input-field appearance-none  peer"
                placeholder=" "
                {...register("confirmPassword", { required: true })}
              />
              <label htmlFor="confirmPassword" className="floating-label">
                Confirm password
              </label>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                Confirm password is required *
              </span>
            )}
            <div>
              <button className="primary-button w-full">
                {isLoading ? (
                  <ImSpinner9 className="m-auto animate-spin" size={24} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
          <div className="text-center text-sm mt-5">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
