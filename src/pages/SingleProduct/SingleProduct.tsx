import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import Container from "@/components/Container/Container";
import { useGetSingleProductQuery } from "@/redux/api/baseApi";
import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Rating } from "@smastrom/react-rating";
import {
  ArrowLeftRight,
  ChevronRight,
  Loader,
  Lock,
  Phone,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

const SingleProduct = () => {
  // call the reducers
  const dispatch = useAppDispatch();
 // const { carts } = useAppSelector((state) => state.carts);
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const { id } = useParams<{ id: string }>();

  const { data, isError, isLoading } = useGetSingleProductQuery(id, {
    pollingInterval: 30000,
  });

  if (isLoading) {
    return <Loader height={"h-[80vh]"} />;
  }

  if (isError || !data) {
    return (
      <Container>
        <div className="pt-12 md:pt-24">
          <p className="mt-20 py-40 text-center text-xl font-semibold text-primary">
            Something went wrong!
          </p>
        </div>
      </Container>
    );
  }

  const { data: product } = data;
  console.log(data);

  const handleAddToCart = () => {
    if (!data) {
      return;
    }
    try {
      const { _id, name, price, imageLink, quantity: pQuantity } = product;

      const desireQuantity = Math.min(quantity, pQuantity);

      // check quantity
      if (quantity > pQuantity) {
        toast.error("Not enough product available.", { duration: 2000 });
        return;
      }
      // Dispatch addToCart action
      dispatch(
        addToCart({
          product: {
            _id,
            name,
            price,
            imageLink,
            pQuantity: pQuantity,
            dQuantity: desireQuantity,
          },
        })
      );
      toast.success("Product added to cart successfully.", { duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong!.", { duration: 2000 });
    }
  };

  return (
    <div className="pt-28 md:pt-28">
      <Container>
        <SlideInFromLeft>
          <div className="flex items-center mb-10">
            <Link to="/all-products" className="text-primary font-semibold">
              Product
            </Link>
            <ChevronRight className="size-[20px] text-primary" />
            <Link
              to={`/all-products/${product.category}`}
              className="capitalize text-primary font-semibold"
            >
              {product.category}
            </Link>
            <ChevronRight className="size-[20px] text-primary" />
            <p className="text-primary font-semibold">{product.name}</p>
          </div>
        </SlideInFromLeft>
        <div>
          {product ? (
            <FadeInUpAnimation>
              <div className="flex flex-col md:flex-row gap-5 md:gap-0">
                <div className="md:w-1/2   flex  lg:flex-col-reverse xl:flex-row gap-3">
                  <div>
                    <img
                      className="w-[450px] md:w-[500px] lg:w-[500px] xl:w-[700px]"
                      src={product.imageLink}
                      alt=""
                    />
                  </div>
                </div>
                <div className="md:w-1/2  flex flex-col md:mx-8 lg:mx-14 xl:mx-15">
                  <h1 className="text-xl md:text-2xl lg:text-3xl xl:4xl font-medium md:font-bold text-gray-700 dark:text-white">
                    {product.name}
                  </h1>
                  <div className="flex items-center my-2 ">
                    <Rating
                      style={{ maxWidth: 120 }}
                      value={product.ratings || 0}
                      readOnly
                    />
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {product.ratings}
                    </span>
                  </div>

                  <table className="max-w-xs text-left">
                    <tbody>
                      <tr className="">
                        <td className="font-semibold text-gray-700">Brand:</td>
                        <td className="capitalize font-semibold text-gray-500 dark:text-white">
                          {product.brand}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="font-semibold text-gray-700">
                          Category:
                        </td>
                        <td className="capitalize font-semibold text-gray-500 dark:text-white">
                          {product.category}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="font-semibold text-gray-700">
                          Available:
                        </td>
                        <td className="capitalize font-semibold text-gray-500 dark:text-white">
                          {product.quantity}
                        </td>
                      </tr>
                      <tr className="">
                        <td className=" font-semibold text-gray-700">
                          Status:
                        </td>
                        <td className="capitalize font-semibold flex items-center gap-2 dark:text-white">
                          <p
                            className={
                              product.quantity > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {product.quantity > 0 ? "In Stock" : "Out Of Stock"}
                          </p>
                        </td>
                      </tr>
                      <tr className="">
                        <td className="font-semibold text-gray-700">
                          Shipping:
                        </td>
                        <td className="capitalize font-semibold text-gray-500 dark:text-white">
                          Full Free
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex items-end gap-8  my-2 lg:my-4 xl:my-8 ">
                    <p className="text-red-500 dark:text-white text-lg md:text-3xl font-semibold md:font-bold">
                      ${product.price}
                    </p>
                    {product.off > 0 && (
                      <p className="text-gray-400 dark:text-white text-lg font-medium md:font-semibold">
                        {product.off}% off
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="dark:text-white">{product.description}</p>
                  </div>
                  <div>
                    <p className="text-lg md:text-xl font-semibold mt-3 lg:mt-5 text-gray-600 dark:text-white">
                      Select Quantity
                    </p>
                    <div className="flex gap-4 md:gap-5 my-4 lg:my-6">
                      <button
                        onClick={decreaseQuantity}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-12 text-center border border-gray-300 rounded"
                      />
                      <button
                        onClick={increaseQuantity}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleAddToCart}
                      className={`${"primary-button w-full flex justify-center items-center gap-x-2"}`}
                      disabled={product?.quantity === 0}
                    >
                      <ShoppingCart /> ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </FadeInUpAnimation>
          ) : (
            <div>Product not found</div>
          )}
        </div>
        <FadeInUpAnimation>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-20">
            <div className="border shadow px-4 py-8 flex flex-col items-center">
              <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
                <Lock className="text-white size-10" />
              </div>
              <p className="font-medium text-lg text-center">
                100% Secured Payment
              </p>
            </div>
            <div className="border shadow px-4 py-8 flex flex-col items-center">
              <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
                <Phone className="text-white size-10" />
              </div>
              <p className="font-medium text-lg text-center">
                24/7 Customer Service
              </p>
            </div>
            <div className="border shadow px-4 py-8 flex flex-col items-center">
              <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
                <ArrowLeftRight className="text-white size-10" />
              </div>
              <p className="font-medium text-lg text-center">
                7 Days Refund/Replacemnt
              </p>
            </div>
            <div className="border shadow px-4 py-8 flex flex-col items-center">
              <div className="bg-tertiary p-4 rounded-full mb-3 flex items-center justify-center">
                <ShieldCheck className="text-white size-10" />
              </div>
              <p className="font-medium text-lg text-center">
                100% Authenticity Guaranteed
              </p>
            </div>
          </div>
        </FadeInUpAnimation>
      </Container>
    </div>
  );
};

export default SingleProduct;
