

import mongoose, { Schema, Document } from 'mongoose';



interface ICartItem {
    itemId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
  }

  interface IOrder extends Document {
    cart: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    cartItems: ICartItem[];
    price: number;
    paid: boolean;
    delivered: boolean;
    address: string;
    phone_number: string;
    delivery: string;
    special_note?: string;
    createdAt: Date;
}


const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cart: { type: Schema.Types.ObjectId, ref: 'Cart', required: true },
  cartItems: [{
    itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  price: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  delivered: { type: Boolean, default: false },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  delivery: { type: String, required: true },
  special_note: { type: String },
  createdAt: { type: Date, default: Date.now }
});

//   orderSchema.pre('save', function (next) {
//     this.populate('user')
//     this.populate('cart')
//     this.populate('cartItems.itemId')

//     next();
//   });
  


// Create and export the order model
const Order = mongoose.model<IOrder>('Order', orderSchema);
export  { Order, IOrder};