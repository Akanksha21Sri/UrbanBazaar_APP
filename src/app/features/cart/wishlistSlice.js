// src/app/features/wishlist/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const storedWishlist =
  localStorage.getItem("wishlist") !== null
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [];

const initialState = {
  wishlist: storedWishlist,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlist.find((item) => item.id === product.id);

      if (exists) {
        // remove from wishlist
        state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
      } else {
        // add to wishlist
        state.wishlist.push(product);
      }
    },
  },
});

export const wishlistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("wishlist/")) {
    const wishlist = store.getState().wishlist.wishlist;
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  return result;
};

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
