import { createSlice } from "@reduxjs/toolkit";

type TOrderPlaced = {
  orderPlaced: boolean;
};

const initialState: TOrderPlaced = {
  orderPlaced: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder: (state) => {
      state.orderPlaced = true;
    },
    resetOrderStatus: (state) => {
      state.orderPlaced = false;
    },
  },
});

export const { placeOrder, resetOrderStatus } = orderSlice.actions;

export default orderSlice.reducer;


