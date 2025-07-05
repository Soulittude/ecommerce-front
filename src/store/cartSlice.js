// src/store/cartSlice.js
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
    /*
          addItem(state, action)
          • state: current cart state (we can mutate it safely via Immer)
          • action.payload: the new item object ({ id, name, price })
          Behavior:
            1. Increase totalQuantity by 1
            2. If the item already exists in state.items, increment its quantity
            3. Otherwise, push the new item into items[] with quantity = 1
            4. Increase totalAmount by the item's price
        */
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

    /*
          removeItem(state, action)
          • action.payload: the id of the item to remove
          Behavior:
            1. Find the item in state.items
            2. Decrease totalQuantity by that item's quantity
            3. Decrease totalAmount by (price × quantity)
            4. Remove the item from items[]
        */
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

    /*
          clearCart(state)
          Behavior:
            • Reset items, totalQuantity, and totalAmount to initial state
        */
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
