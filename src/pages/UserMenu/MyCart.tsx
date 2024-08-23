/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2Icon } from "lucide-react";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import useUserProfile from "@/hooks/useUserProfile";
import {
  useClearCartItemMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartMutation,
} from "@/redux/features/cart/cart.api";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LoadingError from "../Error/LoadingError";
import { toast } from "sonner";
import DeleteModal from "@/components/Modals/DeleteModal";

const MyCart = () => {
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCartItem] = useClearCartItemMutation();
  const [updateCart] = useUpdateCartMutation();
  const { token } = useUserProfile();
  const {
    data: cartData,
    isError,
    isLoading,
  } = useGetCartQuery({ token: token }, { skip: !token });
  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }
  if (isError || !cartData) {
    <LoadingError />;
  }
  const cartItems = cartData?.data?.items || [];

  //calculate total price for a single item
  const calculateItemPrice = (price: number, quantity: number) => {
    return price * quantity;
  };

  const decreaseQuantity = async (id: string) => {
    const updateItem = {
      productId: id,
      quantity: -1,
    };
    try {
      await updateCart({ updateItem, token }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong !", {
        duration: 2000,
      });
    }
  };

  const increaseQuantity = async (id: string) => {
    const updateItem = {
      productId: id,
      quantity: 1,
    };
    try {
      await updateCart({ updateItem, token }).unwrap();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong !", {
        duration: 2000,
      });
    }
  };

  // remove item from cart
  const handleRemoveItem = async (productId: string) => {
    try {
      await removeCartItem({ productId, token }).unwrap();
      toast.success("Item removed from cart successfully !", {
        duration: 2000,
      });
    } catch (error) {
      toast.error((error as any)?.data?.message || "Something went wrong!", {
        duration: 2000,
      });
    }
  };

  // delete whole cart
  const handleclearCart = async () => {
    await clearCartItem({ token }).unwrap();
  };

  //calculate total price for all items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      const itemId = item._id;
      if (itemId) {
        //const quantity = quantities[itemId] ?? 1;
        const itemPrice = calculateItemPrice(
          item?.product?.price,
          item?.quantity
        );
        totalPrice += itemPrice;
      } else {
        console.error("Item without _id:", item);
      }
    }
    return totalPrice;
  };

  //calculate total VAT
  const calculateTotalVAT = () => {
    const totalPrice = calculateTotalPrice();
    const vatRate = 0.15; // 15% VAT
    return totalPrice * vatRate;
  };

  //calculate total price with VAT
  const calculateTotalPriceWithVAT = () => {
    const totalPrice = calculateTotalPrice();
    const vatRate = 0.15; // 15% VAT
    return totalPrice * (1 + vatRate);
  };

  return (
    <div className="mt-10 mb-20  sm:mb-40">
      <Helmet>
        <title>My Cart</title>
      </Helmet>
      <Container>
        {cartItems?.length === 0 ? (
          <FadeInUpAnimation>
            <div className="text-center flex justify-center items-center flex-col h-[50vh]">
              <p className="text-lg  text-gray-500 font-semibold mb-10">
                Your cart is empty.
              </p>
              <Link to="/all-products" className="primary-button">
                Shop Now
              </Link>
            </div>
          </FadeInUpAnimation>
        ) : (
          <FadeInUpAnimation>
            <div className="flex flex-col md:flex-row items-start justify-between gap-5 ">
              <div className=" w-full">
                <div>
                  {cartItems?.map((item: any) => (
                    <div
                      key={item.product._id}
                      className="md:flex justify-between items-center border-b pb-3 mb-3"
                    >
                      <div className="py-2 flex items-center gap-3">
                        <img
                          className="w-20"
                          src={item.product.imageLink}
                          alt={item.product.name}
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-500 capitalize text-sm">
                            Status:{" "}
                            {item.product.quantity > 0 ? (
                              <span className="text-green-500 font-medium">
                                in stock
                              </span>
                            ) : (
                              <span className="text-red-500 font-medium">
                                out of stock
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-evenly sm:justify-between items-center md:gap-x-10">
                        <div className="py-2 ">${item.product.price}</div>
                        <div className="py-2 ">
                          <div className="flex gap-4 md:gap-5 justify-center items-center">
                            <button
                              onClick={() =>
                                decreaseQuantity(item.product._id as string)
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-12 text-center border border-gray-300 rounded"
                            />
                            <button
                              onClick={() =>
                                increaseQuantity(item.product._id as string)
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="py-2 ">
                          $
                          {calculateItemPrice(
                            item.product.price,
                            item.quantity
                          )}
                        </div>
                        <div className="py-2 ">
                          <button
                            onClick={() =>
                              handleRemoveItem(item.product._id as string)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2Icon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div className=" flex justify-between gap-10">
                      <div>
                        <p className="text-base font-semibold text-gray-500 mb-2">
                          Original Price:
                        </p>
                        <p className="text-base font-semibold text-gray-500 mb-2">
                          Tax(15%):
                        </p>
                        <p className="text-base font-medium text-gray-500 mb-2">
                          Shipping
                        </p>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Total Price
                        </p>
                      </div>
                      <div>
                        <p className="text-lg text-gray-700 font-semibold mb-1">
                          ${calculateTotalPrice().toFixed(2)}
                        </p>
                        <p className="text-lg text-gray-700 font-semibold mb-1">
                          ${calculateTotalVAT().toFixed(2)}
                        </p>
                        <p className="text-lg text-gray-700 font-semibold mb-1">
                          Free
                        </p>
                        <p className="text-lg text-gray-700 font-semibold mb-1">
                          ${calculateTotalPriceWithVAT().toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-between sm:justify-end sm:items-center flex-wrap gap-1 sm:gap-10">
                  <DeleteModal
                    onDelete={() => handleclearCart()}
                    entityName="cart items"
                    buttonName="Clear Cart"
                  />

                  <Link className="primary-button" to="/all-products">
                    Continue Shopping
                  </Link>
                  <Link to="/checkout" className="primary-button text-center">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </FadeInUpAnimation>
        )}
      </Container>
    </div>
  );
};

export default MyCart;
