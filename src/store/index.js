import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/*
  configureStore():
  - Accepts a `reducer` object mapping slice names to their reducers.
  - Bundles those reducers with `combineReducers`.
  - Enables Redux DevTools by default (for non-production).
  - Adds default middleware (e.g., thunk for async logic).
*/
const store = configureStore({
  reducer: {
    cart: cartReducer,
    // future slices: user: userReducer, products: productsReducer, etc.
  },
  // Optional customizations:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;
