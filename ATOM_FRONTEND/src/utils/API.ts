

import axios from "axios";





interface FormData {
  address: string;
  phone_number: string;
  delivery: string;
  special_note?: string; 
}

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/v1`,
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
    const response = await API.patch("/carts/add-items", { itemId });

    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (itemId: string) => {
  try {
   await API.patch("/carts/remove-items", { itemId });

  } catch (error) {
    console.error("Failed to remove from cart:", error);
    throw error;
  }
}

export const removeOneItemInstance = async (itemId: string) => {
  try {
  await API.patch("/carts/remove-all-item-instances", { itemId });

  } catch (error) {
    console.error("Failed to remove one item from cart:", error);
    throw error;
  }
};

export const createOrderCheckout = async (formData: FormData) => {
  try {
    const response = await API.post("/orders/checkout", {
      formData: formData,
    });

    return response.data.session.id;
  } catch (error) {
    console.error("Failed to checkout:", error);
    throw error;
  }
};

export const getUserOrders = async ()=>{
  try{
const response=await API.get("/orders");

return response.data.orders;

  }catch(error){
    console.error("Failed to get orders:", error);
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await API.get("/users/me");

    return response.data.data.user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

export const filterItems = async (category: string = "", sex: string = "", size: string = "", name: string = "") => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (sex) params.append('sex', sex);
    if (size) params.append('size', size);
    if (name) params.append('name', name);

    const response = await API.get(`items/filterItem?${params.toString()}`);
    
    if (response.data.status === "success") {
      return response.data.data.items;
    } else if (response.data.status === "fail") {

      return [];
    }
  } catch (error) {
    console.error("Error fetching filtered items:", error);
    throw error;
  }
}

export const verifyUser = async () => {
  try {
    const response = await API.get("/users/verify", { withCredentials: true });

    return response.data.isAuthenticted;  
  } catch (error) {
    console.error("Failed to verify user:", error);
    return false;  
  }
};


export const submitForgotPassword = async (email: string) => {
  try {
    const response = await API.post("/users/forgetpassword", { email });

    return response.data;
  } catch (error) {
    console.error("Failed to submit forgot password:", error);
    throw error;
  }
};

export const resetPassword = async (token: string, password: string, passwordConfirm: string) => {
  try {
    const response = await axios.patch(`/api/v1/users/resetpassword/${token}`, {
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await API.get("/users/logout");
    return response.data;
  } catch (error) {
return error;
  
  }
};
