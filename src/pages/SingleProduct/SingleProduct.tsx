/* eslint-disable @typescript-eslint/no-explicit-any */
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import SlideInFromLeft from "@/components/Animations/SlideInFromLeft";
import Container from "@/components/Container/Container";
import { useGetSingleProductQuery } from "@/redux/features/products/products.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Rating } from "@smastrom/react-rating";
import { ShoppingCart } from "lucide-react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import RelatedProduct from "./RelatedProduct";
import BreadcrumbComponent from "@/components/Breadcrumb/Breadcrumb";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import LoadingError from "../Error/LoadingError";
import {
  addWishList,
  removeWishList,
  SelectedWishList,
} from "@/redux/features/wishList/wishListslice";
import Loader from "@/components/Loader/Loader";
import ServiceQuality from "@/components/Cards/ServiceQuality";

const SingleProduct = () => {
  const [addToCart] = useAddToCartMutation();
  const token = useAppSelector(useCurrentToken);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const wishListItems = useAppSelector(SelectedWishList);

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
    return <Loader height="h-[80vh]" />;
  }
  if (isError || !data) {
    <LoadingError />;
  }

  const { data: product } = data;
  //console.log(data);

  const isInWishList = wishListItems.some((item) => item._id === product._id);
  const handleWishList = () => {
    try {
      if (isInWishList) {
        dispatch(removeWishList({ productId: product._id! }));
        toast.success("Product removed from wishlist!", { duration: 2000 });
      } else {
        dispatch(
          addWishList({
            product: {
              _id: product._id,
              name: product.name,
              price: product.price,
              imageLink: product.imageLink,
              quantity: product.quantity,
            },
          })
        );
        toast.success("Product added to wishlist !", { duration: 2000 });
      }
    } catch (error) {
      toast.error("Something went wrong !", { duration: 2000 });
    }
  };

  const handleAddToCart = async () => {
    /* check if there is any user or product*/
    if (!token) {
      toast.error("Please sign in first !", { duration: 2000 });
      return;
    } else if (!data) {
      return;
    }

    try {
      const { _id, quantity: pQuantity } = product;
      const desireQuantity = Math.min(quantity, pQuantity);

      // check quantity
      if (quantity > pQuantity) {
        toast.error("Not enough product available !", { duration: 2000 });
        return;
      }

      const cartData = {
        items: [{ product: _id, quantity: desireQuantity }],
      };

      await addToCart({
        token: token,
        items: cartData.items,
      }).unwrap();

      toast.success("Product added to cart successfully.", {
        duration: 2000,
      });
    } catch (error) {
      toast.error((error as any)?.data?.message, { duration: 2000 });
    }
  };

  const breadCrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/all-products" },
    {
      label: `${product.category}`,
      href: `/all-products?category=${product.category}`,
    },
    {
      label: `${product.name}`,
      isCurrentPage: true,
    },
  ];

  return (
    <>
      <div className="pt-28 md:pt-28">
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Container>
          <SlideInFromLeft>
            <BreadcrumbComponent items={breadCrumbItems} />
          </SlideInFromLeft>
          <div>
            {product ? (
              <FadeInUpAnimation>
                <div className="flex flex-col md:flex-row gap-5 md:gap-0">
                  <div className="relative md:w-1/2   flex  lg:flex-col-reverse xl:flex-row gap-3">
                    <div>
                      <img
                        className="w-[450px] md:w-[500px] lg:w-[500px] xl:w-[700px]"
                        src={product.imageLink}
                        alt=""
                      />
                    </div>
                    <div
                      className={`absolute top-3.5 right-4   hover:text-tertiary transition-all duration-200
             text-2xl ${isInWishList ? "text-tertiary" : "text-gray-400"} `}
                    >
                      <button onClick={() => handleWishList()}>
                        {isInWishList ? <FaHeart /> : <FaRegHeart />}
                      </button>
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
                          <td className="font-semibold text-gray-700">
                            Brand:
                          </td>
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
                              {product.quantity > 0
                                ? "In Stock"
                                : "Out Of Stock"}
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
                    <div className="flex items-end gap-8  my-2 lg:my-4  ">
                      <p className="text-red-500 dark:text-white text-lg md:text-3xl font-semibold md:font-bold">
                        ${product.price}
                      </p>
                      {product.off > 0 && (
                        <p className="text-gray-400 dark:text-white text-lg font-medium md:font-semibold">
                          <span className="text-gray-400 font-medium text-base md:text-lg line-through me-2">
                            $
                            {product.price +
                              Math.round(product.price * (product.off / 100))}
                          </span>
                          {/* {product.off}% off */}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="dark:text-white">{product.description}</p>
                    </div>
                    <div>
                      <p className="text-lg md:text-xl font-semibold mt-3 text-gray-600 dark:text-white">
                        Select Quantity
                      </p>
                      <div className="flex gap-4 md:gap-5 my-4 lg:my-5">
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
          <ServiceQuality />
        </Container>
      </div>
      <RelatedProduct category={product.category} limit={3} />
    </>
  );
};

export default SingleProduct;
