import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import authSlice from "./auth";
const store = configureStore({
  reducer: { cart: cartSlice, auth: authSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
