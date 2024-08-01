import e, { Request, Response, NextFunction } from 'express';

import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";

import { Cart, ICart } from '../models/cartModel';
import { IItem,Item } from '../models/itemModel';

exports.getAllCarts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const carts = await Cart.find();
    console.log(carts);

    res.status(200).json({
        status: 'success',
        results: carts.length,
        data: {
            carts,
        },
    });
    if (!carts) {
        return next(new AppError('No carts found', 404));
    }

});

exports.addItemsToCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {  itemId } = req.body;
    const userId = req.user._id;
    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }

    if (!itemId ) {
        return next(new AppError('Invalid item ID ', 400));
    }
 const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('No cart found', 404));
    }
    const item = await Item.findById(itemId);
    if (!item) {
        return next(new AppError('No item found', 404));
    }
     else {
        cart.items.push(item);
    }

    cart.totalQuantity = cart.items.length;
    cart.totalPrice += item.price;

    await cart.save();

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });
});

exports.removeItemsFromCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {  itemId } = req.body;
    const userId = req.user._id;

    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }

    if (!itemId) {
        return next(new AppError('Item ID is required', 400));
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('No cart found for this user', 404));
    }

    // Find the item to be removed
    const item = await Item.findById(itemId);
    if (!item) {
        return next(new AppError('Item not found', 404));
    }

    // Find the item in the cart's items array
    const itemIndex = cart.items.findIndex(cartItem => item.equals(itemId));
    if (itemIndex === -1) {
        return next(new AppError('Item not found in cart', 404));
    }

    // Remove the item from the cart
    ;
    cart.items.splice(itemIndex, 1);

    // Update cart totals
    cart.totalQuantity =cart.items.length;
    cart.totalPrice = cart.totalPrice - item.price;

    await cart.save();

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });
});

exports.getOneUserCart= asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
    const userId = req.user._id;
    

    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('No cart found for this user', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });

});