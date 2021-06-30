import { createSlice } from "@reduxjs/toolkit";
import Product from "../models/Product";

const initialState: Array<Product> = [];

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      let index = state.findIndex((i) => i.id === action.payload.id);
      state.splice(index, 1);
    },
    resetCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { addProductToCart, removeProductFromCart, resetCart } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
