import dotenv from 'dotenv';
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/AppError';
import { Cart, ICart } from '../models/cartModel';




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
        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        customer_email: user.email,


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
  