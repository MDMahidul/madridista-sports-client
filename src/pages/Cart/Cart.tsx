/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2Icon } from "lucide-react";
import Container from "@/components/Container/Container";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import SectionHeader from "@/components/Headers/SectionsHeader";
import { Link } from "react-router-dom";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import { Helmet } from "react-helmet-async";
import {
  useClearCartItemMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartMutation,
} from "@/redux/features/cart/cart.api";
import Loader from "@/components/Loader/Loader";
import LoadingError from "../Error/LoadingError";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import DeleteModal from "@/components/Modals/DeleteModal";

const CartPage = () => {
  const token = useAppSelector(useCurrentToken);
  const [removeCartItem] = useRemoveCartItemMutation();
  const [clearCartItem] = useClearCartItemMutation();
  const [updateCart] = useUpdateCartMutation();

  const { data:cartData, isError, isLoading } = useGetCartQuery({ token: token },{skip: !token});
  if (isLoading) {
    return <Loader height="h-[80vh]" />;
  }
  if (isError || !cartData) {
    <LoadingError />;
  }
  const cartItems = cartData?.data?.items || [];

  const decreaseQuantity = async (id: string) => {
    const updateItem = {
      productId: id,
      quantity: -1,
    };
    try {
      await updateCart({ updateItem, token }).unwrap();
    } catch (error) {
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
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong !", {
        duration: 2000,
      });
    }
  };

  //calculate total price for a single item
  const calculateItemPrice = (price: number, quantity: number) => {
    return price * quantity;
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

  // remove item from cart
  const handleRemoveItem = async (productId: string) => {
    try {
      await removeCartItem({ productId, token }).unwrap();
      toast.success("Item removed from cart successfully !", {
        duration: 2000,
      });
    } catch (error) {
      toast.error((error as any)?.data?.message ||"Something went wrong!", { duration: 2000 });
    }
  };

  // delete whole cart
  const handleclearCart = async () => {
      await clearCartItem({ token }).unwrap();
  };

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>Cart Items</title>
      </Helmet>
      <Container>
        <SectionHeader heading="Shopping Cart" />
        {cartItems?.length === 0 ? (
          <FadeInUpAnimation>
            <div className="text-center ">
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
              <div className=" w-full sm:w-4/5  md:pe-5  overflow-y-auto">
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
                </div>
                <div className="mt-10 flex justify-end">
                  <Link className="primary-button me-10" to="/all-products">
                    Continue Shopping
                  </Link>
                  <DeleteModal
                    onDelete={() => handleclearCart()}
                    entityName="cart items"
                    buttonName="Clear Cart"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3 border rounded-md px-10 sticky top-28">
                <p className="text-2xl font-bold text-gray-600 text-center py-8">
                  Order summary
                </p>
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
                <div className="my-8 ">
                  <Link
                    to="/checkout"
                    className="bg-primary text-white py-3 px-6 rounded-md hover:bg-blue-900 hover:shadow-xl"
                  >
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

export default CartPage;
