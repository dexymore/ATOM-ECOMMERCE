import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
}

interface CartItem {
  itemId: Item; // Populated item details
  quantity: number;
}

interface CartState {
  items: CartItem[];
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
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
   
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;