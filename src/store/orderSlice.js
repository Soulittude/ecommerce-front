import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder as createOrderApi } from "../api/orders";
import { clearCart } from "./cartSlice";

// Async thunk for checkout
export const checkout = createAsyncThunk(
  "order/checkout",
  async (orderData, thunkAPI) => {
    try {
      const response = await createOrderApi(orderData);
      // Clear cart after successful order
      thunkAPI.dispatch(clearCart());
      return response;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized: Please log in again.");
      }
      throw error;
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
