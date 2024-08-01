import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import{ API }from '../utils/API';
import { cartActions } from './cart';
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

export const fetchCart = () => async (dispatch: Dispatch) => {
    try {
      // Make sure to include withCredentials: true to send cookies with the request
      const response = await API.get('/carts/get-cart');
  
      // Dispatch the response data to your Redux store
      dispatch(cartActions.setCart(response.data.data.cart));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
  
  export const addToCart = (item: Item) => async (dispatch: Dispatch) => {
    try {
        const itemId = item._id; // Extract itemId from the item object
        await API.put(
            '/carts/add-items',
            { itemId }
        );
        dispatch(cartActions.addItemToCart(item));
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
};
