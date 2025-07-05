import { createSlice } from "@reduxjs/toolkit";

// initialState defines the default shape of our cart data
// - items: an array to hold each product (with id, name, price, quantity)
// - totalQuantity: total count of all items in the cart
// - totalAmount: sum of (price × quantity) for all items
const initialState = {
  items: [], // starts empty
  totalQuantity: 0, // no items yet
  totalAmount: 0, // no cost yet
};

/*
  createSlice automatically generates:
    • action creators (e.g., addItem, removeItem, clearCart)
    • a reducer function handling those actions

  Parameters:
    - name: prefix for generated action types
    - initialState: the starting state
    - reducers: an object mapping "case reducer" functions
*/
const cartSlice = createSlice({
  name: "cart", // action type prefix: 'cart/addItem', etc.
  initialState, // the state this slice manages
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.id === newItem.id);

      // 1. Increment total number of items
      state.totalQuantity += 1;

      if (existing) {
        // 2a. If item present, bump its quantity
        existing.quantity += 1;
      } else {
        // 2b. If new item, add with initial quantity
        state.items.push({ ...newItem, quantity: 1 });
      }

      // 3. Update total cost
      state.totalAmount += newItem.price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = state.items[index];

        // 1. Subtract all of that item's quantity
        state.totalQuantity -= item.quantity;
        // 2. Subtract the cost for that item
        state.totalAmount -= item.price * item.quantity;
        // 3. Remove from the items array
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Export action creators for dispatching:
export const { addItem, removeItem, clearCart } = cartSlice.actions;

// Export the reducer to include in our store:
export default cartSlice.reducer;
