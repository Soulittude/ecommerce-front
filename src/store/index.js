// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/*
  configureStore() from Redux Toolkit:
  - Automatically sets up the Redux store with good defaults:
    • combineReducers (using the `reducer` object you pass)
    • Redux DevTools integration
    • Default middleware including thunk for async logic
*/
const store = configureStore({
  reducer: {
    // Assign our cart slice reducer under the key 'cart'
    cart: cartReducer,
    // In the future, you can add more slices here, e.g.:
    // user: userReducer,
    // products: productsReducer,
  },
  // You can customize middleware or devTools options here if needed:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customLogger),
  // devTools: process.env.NODE_ENV !== 'production',
});

// Export the configured store for use in main.jsx
export default store;
