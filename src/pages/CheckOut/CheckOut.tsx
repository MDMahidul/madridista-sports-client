/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/Container/Container";
import SectionHeader from "@/components/Headers/SectionsHeader";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ArrowLeftRight, Lock, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { TruckIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import FadeInUpAnimation from "@/components/Animations/FadeInUpAnimation";
import { Helmet } from "react-helmet-async";
import { useAddOrderMutation } from "@/redux/features/products/products.api";
import { clearCart, selectCartItems } from "@/redux/features/cart/cartSlice";

const CheckOut = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const cartItems = useAppSelector(selectCartItems);
  const [quantities] = useState<{ [key: string]: number }>({});
  const dispatch = useAppDispatch();

  // call baseapi function
  const [addOrder] = useAddOrderMutation();

  // Function to calculate total price for a single item
  const calculateItemPrice = (price: number, quantity: number): number => {
    return price * quantity;
  };

  // Function to calculate total price for all items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      const itemId = item._id;
      if (itemId) {
        const quantity = quantities[itemId] ?? 1;
        const itemPrice = calculateItemPrice(item.price, quantity);
        totalPrice += itemPrice;
      } else {
        console.error("Item without _id:", item);
      }
    }
    return totalPrice;
  };

  // Function to calculate total VAT
  const calculateTotalVAT = () => {
    const totalPrice = calculateTotalPrice();
    const vatRate = 0.15; // 15% VAT
    return totalPrice * vatRate;
  };

  // Function to calculate total price with VAT
  const calculateTotalPriceWithVAT = () => {
    const totalPrice = calculateTotalPrice();
    const vatRate = 0.15; // 15% VAT
    return totalPrice * (1 + vatRate);
  };

  const onSubmit = (data: FieldValues) => {
    const order = {
      customerName: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      cartItems: cartItems.map(
        ({ _id, name, price, dQuantity, imageLink }) => ({
          _id,
          name,
          price,
          quantity: dQuantity,
          imageLink,
        })
      ),
    };
    console.log(order);
    try {
      addOrder(order);
      toast.success("Your order has been placed successfully", {
        duration: 2000,
      });
      dispatch(clearCart());
      reset();
      navigate("/order-confirmation");
    } catch (error: any) {
      toast.error(error, {
        duration: 2000,
      });
    }
  };

  return (
    <div className="pt-10 md:pt-16">
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Container>
        <SectionHeader heading="Checkout Page" />
        <FadeInUpAnimation>
          <div className="flex justify-around flex-col md:flex-row">
            <div className="md:w-1/2">
              <div className="flex justify-center items-center bg-primary text-white p-4 gap-3 text-xl font-semibold mb-7">
                <TruckIcon className="size-8" /> Shipping Address
              </div>
              <form>
                <div>
                  <label htmlFor="name" className="add-product-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="add-input-field"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500">
                      Name is required *
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="add-product-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="add-input-field"
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      Email is required *
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="add-product-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="add-input-field"
                    placeholder="Enter your phone number"
                    {...register("phone", {
                      required: true,
                    })}
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-500">
                      Phone number is required *
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="address" className="add-product-label">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="add-input-field"
                    placeholder="Enter your address"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <span className="text-xs text-red-500">
                      Address is required *
                    </span>
                  )}
                </div>
                <div className="flex justify-between my-8">
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-blue-800 px-4 md:px-8 py-1.5 md:py-3 text-white text-sm md:text-[15px] font-semibold rounded-md hover:bg-primary transform transition-all duration-200 hover:scale-105 md:w-52"
                  >
                    Cash On Delivery
                  </button>
                  <button className="bg-tertiary px-4 md:px-8 py-1.5 md:py-3 text-white text-sm md:text-[15px] font-semibold rounded-md hover:bg-red-600 transform transition-all duration-200 hover:scale-105 md:w-52">
                    <span className="flex justify-center items-center gap-2">
                      <CircleDollarSign className="size-4" /> Stripe
                    </span>
                  </button>
                </div>
              </form>
            </div>

            <div className="md:w-1/3">
              <div className="w-full border rounded-md px-10">
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
                <div className="flex justify-center items-center gap-4 py-8">
                  <input
                    type="text"
                    className="add-input-field"
                    placeholder="Discount code"
                  />
                  <button className="primary-button">Apply</button>
                </div>
                <p className="text-center text-gray-600 pt-4 pb-8">
                  Choose payment method to checkout
                </p>
              </div>
            </div>
          </div>{" "}
        </FadeInUpAnimation>
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

export default CheckOut;
