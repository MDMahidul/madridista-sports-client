/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FieldValues, useForm } from "react-hook-form";
import { useForgetpasswordMutation } from "@/redux/features/auth/auth.api";
import { ImSpinner9 } from "react-icons/im";
import { toast } from "sonner";

const ForgetPasswordPage = () => {
  const [forgetpassword, { isLoading }] = useForgetpasswordMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSingIn = async (data: FieldValues) => {
    const email = {
      email: data.email,
    };
    try {
      await forgetpassword(email).unwrap();
      reset();
      toast.success("Please check your mail to reset password!", {
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
            Submit email to reset password
          </h4>
        </div>
        <div>
          <form
            className="px-10 space-y-5"
            onSubmit={handleSubmit(handleSingIn)}
          >
            <div className="relative">
              <input
                type="text"
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

export default ForgetPasswordPage;
