import { user } from './API';
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getItems = async () => {
  const response = await API.get("/items");
  return response.data;
  
};

export const userLogin = async (email: string, password: string) => {
  const response = await API.post("users/login", { email, password });
  return response.data;

};

export const userSignUp = async (name: string, email: string, password: string,passwordConfirm:string ) => {
  const response = await API.post("users/signup", { name, email, password,passwordConfirm });
  return response.data;
};