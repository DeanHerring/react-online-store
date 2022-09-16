import { configureStore } from "@reduxjs/toolkit";

import productSlice from "@slices/product";
import cartSlice from "@slices/cart";

export const store = configureStore({
  reducer: { productSlice, cartSlice },
});
