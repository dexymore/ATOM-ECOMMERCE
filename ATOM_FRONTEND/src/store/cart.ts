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
    addItemToCart(state, action: PayloadAction<Item | undefined>) {
      if (action.payload) {
        state.items.push(action.payload);
        state.totalQuantity++;
        state.totalPrice += action.payload.price;
      }

    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
