// Redux
import { configureStore } from "@reduxjs/toolkit";
import cartItemReducer from "./cartItemsSlice";

export default configureStore({
  reducer: {
    cartItems: cartItemReducer
  },
});
