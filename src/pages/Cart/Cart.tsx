import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import Container from "@/components/Container/Container";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearCart,
  removeCartItem,
  selectCartItems,
  updateCart,
} from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import SectionHeader from "@/components/Headers/SectionsHeader";
import { Link } from "react-router-dom";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const dispatch = useAppDispatch();

  // handle quantity
  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    cartItems.forEach((item) => {
      initialQuantities[item._id as string] = item.dQuantity;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
    dispatch(updateCart({ id, quantity: newQuantity }));
  };

  const decreaseQuantity = (id: string) => {
    const currentQuantity= quantities[id] || 1;
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const increaseQuantity = (id: string) => {
    const currentItem = cartItems.find((item) => item._id === id);
    const pQuantity = currentItem!.pQuantity;
    const currentQuantity = quantities[id] || 1;
    if (currentQuantity >= pQuantity) {
      toast.error("This exceed the available quantity!");
      return;
    }
    updateQuantity(id, currentQuantity + 1);
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
            const quantity = quantities[itemId] ?? 1;
            const itemPrice = calculateItemPrice(item.price, quantity);
            totalPrice += itemPrice;
        } else {
            console.error('Item without _id:', item);
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
  const handleRemoveItem = (id: string) => {
    try {
      dispatch(removeCartItem(id));
      toast.success("Item removed from cart!", { duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong!", { duration: 2000 });
    }
  };

  // delete whole cart
  const handleRemoveCart = () => {
    try {
      dispatch(clearCart());
      toast.success("Cart removed successfully!", { duration: 2000 });
    } catch (error) {
      toast.error("Something went wrong!", { duration: 2000 });
    }
  };

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>Cart Items</title>
      </Helmet>
      <Container>
        <SectionHeader heading="Shopping Cart" />
        {cartItems.length === 0 ? (
          <div className="text-center ">
            <p className="text-lg  text-gray-500 font-semibold mb-10">
              Your cart is empty.
            </p>
            <Link to="/all-products" className="primary-button">
              Shop Now
            </Link>
          </div>
        ) : (
          <FadeInUpAnimation>
            {" "}
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 ">
              <div className="md:w-4/5 bg-white md:pe-5">
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="md:flex justify-between items-center border-b pb-3 mb-3"
                    >
                      <div className="py-2  flex items-center gap-3">
                        <img
                          className="w-20"
                          src={item.imageLink}
                          alt={item.name}
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-500">Price: ${item.price}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center md:gap-x-10">
                        <div className="py-2 ">${item.price}</div>
                        <div className="py-2 ">
                          <div className="flex gap-4 md:gap-5 justify-center items-center">
                            <button
                              onClick={() =>
                                decreaseQuantity(item._id as string)
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={
                                quantities[item._id as string] || item.dQuantity
                              }
                              readOnly
                              className="w-12 text-center border border-gray-300 rounded"
                            />
                            <button
                              onClick={() =>
                                increaseQuantity(item._id as string)
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
                            item.price,
                            quantities[item._id as string] || item.dQuantity
                          )}
                        </div>
                        <div className="py-2 ">
                          <button
                            onClick={() => handleRemoveItem(item._id as string)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2Icon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-10">
                  <Link className="primary-button me-10" to="/all-products">
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => handleRemoveCart()}
                    className="seceondary-button"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/3 border rounded-md px-10">
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
                    className="bg-primary text-white py-3 px-6 rounded-md shadow-md hover:bg-primary-dark"
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
