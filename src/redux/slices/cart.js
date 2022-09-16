import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    changeProductInCart(state, action) {
      state.cartItems.forEach((i) => {
        if (i.id === action.payload.id) {
          i.count = action.payload.count;
        }
      });
    },
    getProductFromCartById(state, action) {
      console.log("get product from cart by id");
      console.log(action.payload);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeProductInCart,
  getProductFromCartById,
} = cartSlice.actions;
export default cartSlice.reducer;