import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart";
import authSlice from "./auth";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

const store = configureStore({
  reducer: { cart: cartSlice, auth: authSlice },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
