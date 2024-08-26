
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/AppError';
import { Cart, ICart } from '../models/cartModel';

import { Order, IOrder } from '../models/orderModel';

interface FormData {
  address: string;
  phone_number: string;
  delivery: string;
  special_note?: string; 
}




exports.getCheckout = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const user = req.user;
  


  const cart = await Cart.findOne({ user: userId });

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is not defined');
  }

  if (!cart) {
    throw new AppError('Please login first', 400);
  }

  if (cart.items.length === 0) {
    throw new AppError('Your cart is empty', 400);
  }

  const newSavings = cart.totalPrice * 0.05;
  const newTax = cart.totalPrice * 0.1;
  const newStorePickup = cart.items.length * 2;
  const newTotal = cart.totalPrice - newSavings + newTax + newStorePickup;

  // Ensure newTotal is an integer in cents
  const newTotalInCents = Math.round(newTotal * 100);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: `${user.name} shopping cart`,
            },
            unit_amount: newTotalInCents,
            currency: 'usd',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://atom-ecommerce-frontend.vercel.app`,
      cancel_url: `https://atom-ecommerce-frontend.vercel.app/cart`,
      metadata: {
        address: req.body.formData.address,
        phone_number: req.body.formData.phone_number,
        delivery: req.body.formData.delivery,
        special_note: req.body.formData.special_note || '', 
      },
      customer_email: user.email,
      client_reference_id: user.id,
    });

    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: err,
    });
  }
});
  

//   exports.createOrder = asyncHandler(session) => {
// const userId = req.user.id;
// const user = req.user;
// const cart = await Cart.findOne({ user: userId });
// if (!cart || !user) {
//   throw new AppError('Please login first', 400);
// }

// if (cart.items.length === 0) {
//   throw new AppError('Your cart is empty', 400);
// }
// const newSavings = cart.totalPrice * 0.05;
// const newTax = cart.totalPrice * 0.1;
// const newStorePickup = cart.items.length * 2;
// const newTotal = cart.totalPrice - newSavings + newTax + newStorePickup;


// // Create a new order
// await Order.create({
//   user: user._id,
//   cart: cart._id,
//   price: newTotal,
//   paid: true,
//   delivered: false,
//   cartItems: cart.items,
// });
// await Cart.findOneAndUpdate({ user: userId }, { items: [], totalQuantity: 0, totalPrice: 0 });
// res.status(200).json({
//   status: 'success',
//   message: 'Order created successfully',
// });
  

//   })

exports.getUserOrders= asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
const userId= await req.user.id;

if (!userId) {
  return next(new AppError('Please login first', 400));
}


  const orders = await Order.find({ user: userId })
    .populate('user').populate({
      path: 'cartItems.itemId',
      model: 'Item'
    });

if (!orders) {
  return next(new AppError('No orders found for this user', 404));
}

  res.status(200).json({
    status: 'success',
    orders,
  });


})