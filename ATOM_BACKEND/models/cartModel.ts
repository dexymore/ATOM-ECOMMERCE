import mongoose, { Schema, Document } from 'mongoose';
import { IItem } from './itemModel'; // Ensure the correct path to itemModel

interface ICartItem {
  itemId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const cartItemSchema: Schema = new Schema({
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema: Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [cartItemSchema],
  totalQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export { ICart, Cart };
