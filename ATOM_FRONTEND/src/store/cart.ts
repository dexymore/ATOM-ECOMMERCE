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
    // addItemToCart(state, action: PayloadAction<Item | undefined>) {
    //   const newItem = action.payload;
    //   if (newItem) {
    //     const existingCartItem = state.items.find(cartItem => cartItem.itemId._id === newItem._id);
    //     if (existingCartItem) {
    //       existingCartItem.quantity++;
    //     } else {
    //       state.items.push({ itemId: newItem, quantity: 1 });
    //     }
    //     state.totalQuantity++;
    //     state.totalPrice += newItem.price;
    //   }
    // },
    // removeItemFromCart(state, action: PayloadAction<string>) {
    //   const itemId = action.payload;
    //   const existingCartItem = state.items.find(cartItem => cartItem.itemId._id === itemId);

    //   if (existingCartItem) {
    //     if (existingCartItem.quantity > 1) {
    //       existingCartItem.quantity--;
    //       state.totalQuantity--;
    //       state.totalPrice -= existingCartItem.itemId.price;
    //     } else {
    //       state.items = state.items.filter(cartItem => cartItem.itemId._id !== itemId);
    //       state.totalQuantity--;
    //       state.totalPrice -= existingCartItem.itemId.price;
    //     }
    //   }
    // },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;