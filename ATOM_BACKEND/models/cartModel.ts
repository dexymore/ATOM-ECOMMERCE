import mongoose, { Schema, Document } from 'mongoose';
import { IItem, itemSchema } from './itemModel'; // Ensure the correct path to itemModel

interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: IItem[];
  totalQuantity: number;
  totalPrice: number;
}

const cartSchema: Schema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      type: itemSchema,
      required: true,
    },
  ],
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
