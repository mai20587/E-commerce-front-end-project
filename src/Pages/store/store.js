 import { configureStore } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
 
 import cartReducer from "../Slices/cartSlices.js";

export const store = configureStore({
  reducer: {
         cart: cartReducer,
  },
});