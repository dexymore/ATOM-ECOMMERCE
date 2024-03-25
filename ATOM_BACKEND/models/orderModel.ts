

import mongoose, { Schema, Document } from 'mongoose';

// Define the order schema
interface IOrder extends Document {
    item: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    price: number;
    paid: boolean;
    createdAt: Date;
}

const orderSchema: Schema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    paid: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function (next) {
    this.populate('user'); // Corrected 'populate' and 'path'
    this.populate({ path: 'item', select: 'name' })
    next();
});


// Create and export the order model
const Order = mongoose.model<IOrder>('Order', orderSchema);
export  { Order, IOrder};