import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCartData = {
  _id?: string;
  name: string;
  price: number;
  imageLink: string;
  pQuantity: number;
  dQuantity: number;
};

type TInitialState = {
  items: TCartData[];
};
const initialState: TInitialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{product: TCartData}>) => {
      const { product } = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      // check if product already exist or not
      if (existingItem) {
        existingItem.dQuantity += product.dQuantity;
      } else {
        // Item not in cart already
        state.items.push({ ...product });
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === id);

      if (existingItem) {
        existingItem.dQuantity = quantity;
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateCart, removeCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// Selector to get the cart items
export const selectCartItems = (state: RootState) => state.carts.items;

// Selector to get the number of items in the cart
export const selectCartItemCount = (state: RootState) =>
  state.carts.items.length;
