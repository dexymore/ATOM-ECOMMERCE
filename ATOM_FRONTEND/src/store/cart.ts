import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
interface Image {
  public_id: string;
  url: string;
  _id: string;
}

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: Image[];
// Add quantity property
}

interface CartState {
  items: Item[];
  totalQuantity: number;
  totalPrice: number;
}


interface CartState {
  items: Item[];
  totalQuantity: number;
  totalPrice: number;
}

const initialCartState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    setCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    
    addItemToCart(state, action: PayloadAction<Item | undefined>) {
      if (action.payload) {
        state.items.push(action.payload);
        state.totalQuantity++;
        state.totalPrice += action.payload.price;
      }

    },
 removeItemFromCart(state, action: PayloadAction<string>) {
    const itemToRemove = state.items.find((item) => item._id === action.payload);
    if (itemToRemove) {
      state.totalQuantity--;
      state.totalPrice -= itemToRemove.price;
      state.items = state.items.filter((item) => item._id !== action.payload);
    }
  }
 
 
 
  },
});



export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
