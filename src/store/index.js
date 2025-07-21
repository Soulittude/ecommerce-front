import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import authReducer from "./authSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const store = configureStore({
  reducer: {
    cart: persistReducer(cartPersistConfig, cartReducer),
    order: orderReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
