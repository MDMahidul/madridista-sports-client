import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TWishList = {
  _id?: string;
  name: string;
  price: number;
  imageLink: string;
  quantity:number;
};

type TInitialState = {
  items: TWishList[];
};
const initialState: TInitialState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addWishList: (state, action: PayloadAction<{ product: TWishList }>) => {
      const { product } = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);
      // check if product already exist or not
      if (!existingItem) {
        state.items.push({ ...product });
      }
    },
    removeWishList: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload.productId
      );
    },
    clearWishList: (state) => {
        state.items = []
    },
  },
});

export const { addWishList, removeWishList, clearWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;

export const SelectedWishList = (state:RootState)=>state.wishList.items;
