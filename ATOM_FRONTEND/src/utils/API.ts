import { add } from './API';

import axios from "axios";
import { fetchCart } from "../store/cartThunks";
import { Dispatch } from "@reduxjs/toolkit";

export const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const getItems = async () => {
  try {
    const response = await API.get("/items");
    return response.data.data.items;
  } catch (error) {
    console.error("Failed to fetch items:", error);
    throw error;
  }
};
export const getOneItem = async (id: string|undefined) => {
  try {
    const response = await API.get(`/items/${id}`);
    return response.data.data.item;
  } catch (error) {
    console.error("Failed to fetch item:", error);
    throw error;
  }
};

export const userLogin = async (email: string, password: string) => {
  // const response = await API.post("users/login", { email, password });
  // return response.data;
  try {
    const response = await API.post("users/login", { email, password },   { withCredentials: true } );
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }

};
export const userSignUp = async (name: string, email: string, password: string,passwordConfirm:string ) => {
  // const response = await API.post("users/signup", { name, email, password,passwordConfirm });
  // return response.data;
  try {
    const response = await API.post("users/signup", { name, email, password,passwordConfirm },   { withCredentials: true } );
    return response.data;
  } catch (error) {
    console.error("Failed to signup:", error);
    throw error;
  }
};

export const addToCart = async (itemId: string) => {
  try {
    const response = await API.put("/carts/add-items", { itemId });

    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId: string) => {
  try {
    const response = await API.put("/carts/remove-items", { itemId });

  } catch (error) {
    console.error("Failed to remove from cart:", error);
    throw error;
  }
}

export const removeOneItemInstance = async (itemId: string) => {
  try {
    const response = await API.put("/carts/remove-all-item-instances", { itemId });

  } catch (error) {
    console.error("Failed to remove one item from cart:", error);
    throw error;
  }
};