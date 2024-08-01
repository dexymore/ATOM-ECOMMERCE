import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../utils/API";
import { cartActions } from "./cart";


export const fetchCart = () => async (dispatch: Dispatch) => {
  try {

    const response = await API.get("/carts/get-cart");


    dispatch(cartActions.setCart(response.data.data.cart));
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};


// export const addToCart = async (itemId: string, quantity: number = 1) => {};
// export const removeFromCart = async (itemId: string) => {};