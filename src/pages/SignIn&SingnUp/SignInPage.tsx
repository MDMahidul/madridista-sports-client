import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FieldValues, useForm } from "react-hook-form";

const SignInPage = () => {
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();

  const handleSingIn = (data: FieldValues) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <div className="py-5">
        <img className="w-20 mx-auto" src={logo} alt="" />
      </div>
      <div className="flex flex-col justify-center max-w-lg md:max-w-xl mx-auto gap-y-8">
        <div className=" text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-7 text-primary">
            Welcome To Madridista Sports!
          </h2>
          <h4 className="text-lg md:text-2xl font-semibold capitalize text-primary">
            Sign in to your account
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
              <label className="floating-label">Email</label>
            </div>
            {errors.email && (
              <span className="text-xs text-red-500">Email is required *</span>
            )}
            <div className="relative">
              <input
                type="password"
                id="password"
                className="block add-input-field appearance-none  peer"
                placeholder=" "
                {...register("password", { required: true })}
              />
              <label className="floating-label">Password</label>
            </div>{" "}
            {errors.password && (
              <span className="text-xs text-red-500">
                Password is required *
              </span>
            )}
            <div>
              <button className="primary-button w-full">Sign In</button>
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

export default SignInPage;
