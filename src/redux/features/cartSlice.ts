import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TCartData = {
  _id: string;
  name: string;
  price: number;
  imageLink: string;
  quantity: number;
};

type TInitialState = {
  items: TCartData[],
};
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartData>) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      // check if product already exist or not
      if (existingItem) {
         existingItem.quantity += quantity;
        
      } else {
        // Item not in cart already
        state.items.push({...product,quantity})
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

// Selector to get the cart items
export const selectCartItems = (state: RootState) => state.carts.items;

// Selector to get the number of items in the cart
export const selectCartItemCount = (state: RootState) => state.carts.items.length;