/* eslint-disable @typescript-eslint/no-explicit-any */
// cartUtils.ts

export const calculateItemPrice = (price: number, quantity: number): number => {
  return price * quantity;
};

export const calculateTotalPrice = (cartItems: any[]): number => {
  let totalPrice = 0;
  for (const item of cartItems) {
    const itemId = item._id;
    if (itemId) {
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

export const calculateTotalVAT = (
  totalPrice: number,
  vatRate: number = 0.15
): number => {
  return totalPrice * vatRate;
};

export const calculateTotalPriceWithVAT = (
  totalPrice: number,
  vatRate: number = 0.15
): number => {
  return totalPrice * (1 + vatRate);
};
