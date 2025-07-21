import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("jwt") || null,
  },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.jwt;
      localStorage.setItem("jwt", action.payload.jwt);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwt");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
