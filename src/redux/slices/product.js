import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "@thunks/getProducts";
import { getCountRowsInProduct } from "@thunks/getCountRowsInProduct";
import { getPaginatedProducts } from "@thunks/getPaginatedProducts";
import { getProductById } from "@thunks/getProductById";

const initialState = {
  products: {},
  productsCount: 0,
  preloader: true,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    // getProducts
    [getProducts.pending]: (state) => {
      console.log("Pending getProducts...");
      state.preloader = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      console.log("Fulfilled getProducts...");
      state.products = action.payload;
      state.preloader = false;
    },
    [getProducts.rejected]: () => {
      console.log("Rejected getProducts...");
    },

    // getCountRowsInProduct
    [getCountRowsInProduct.pending]: () => {
      console.log("Pending getCountRowsInProduct...");
    },
    [getCountRowsInProduct.fulfilled]: (state, action) => {
      console.log("Fulfilled getCountRowsInProduct...");
      state.productsCount = action.payload.productsCount;
    },
    [getCountRowsInProduct.rejected]: () => {
      console.log("Rejected getCountRowsInProduct...");
    },

    // getPaginatedProducts
    [getPaginatedProducts.pending]: () => {
      console.log("Pending getPaginatedProducts...");
    },
    [getPaginatedProducts.fulfilled]: (state, action) => {
      console.log("Fulfilled getPaginatedProducts...");
      state.products = action.payload;
    },
    [getPaginatedProducts.rejected]: () => {
      console.log("Rejected getPaginatedProducts...");
    },

    // getProductById
    [getProductById.pending]: () => {
      console.log("Pending getProductById...");
    },
    [getProductById.fulfilled]: (state, action) => {
      console.log("Fulfilled getProductById...");
      state.products = action.payload;
    },
    [getProductById.rejected]: () => {
      console.log("Rejected getProductById...");
    },
  },
});

export default productSlice.reducer;