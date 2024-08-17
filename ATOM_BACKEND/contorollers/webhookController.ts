import Stripe from 'stripe';
import { Request, Response, NextFunction } from 'express';
import { Cart } from '../models/cartModel';
import { Order } from '../models/orderModel';
import  AppError  from '../utils/AppError';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export const webhookHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('⚠️  Webhook signature verification failed:', err);
        res.status(400).send(`Webhook Error: ${err}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const userId = session.client_reference_id;

            const cart = await Cart.findOne({ user: userId });
            if (!cart) {
                throw new AppError('Cart not found', 404);
            }

            const newSavings = cart.totalPrice * 0.05;
            const newTax = cart.totalPrice * 0.1;
            const newStorePickup = cart.items.length * 2;
            const newTotal = cart.totalPrice - newSavings + newTax + newStorePickup;

            if (!session.metadata) {
                throw new AppError('Metadata not found in session', 500);
            }

            const address = session.metadata.address;
            const phoneNumber = session.metadata.phone_number;
            const delivery = session.metadata.delivery;
            const specialNote = session.metadata.special_note;

            const newOrder = await Order.create({
                user: userId,
                cart: cart._id,
                price: newTotal,
                paid: true,
                delivered: false,
                cartItems: cart.items,
                address,
                phone_number: phoneNumber,
                delivery,
                special_note: specialNote,
            });

            await Cart.findOneAndUpdate({ user: userId }, { items: [], totalQuantity: 0, totalPrice: 0 });
            console.log(`Cart cleared for user: ${userId}`);
        } catch (err) {
            next(new AppError('Error processing checkout session', 500));
            return;
        }
    }

    res.status(200).json({ received: true });
};
