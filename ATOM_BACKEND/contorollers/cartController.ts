import e, { Request, Response, NextFunction } from 'express';

import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";

import { Cart, ICart } from '../models/cartModel';
import { IItem,Item } from '../models/itemModel';

exports.getAllCarts = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const carts = await Cart.find();


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
    const  itemId  = req.body.itemId;

    const userId = req.user._id;

    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }

    if (!itemId) {
        return next(new AppError('Invalid item ID', 400));
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('No cart found', 404));
    }

    const item = await Item.findById(itemId);
    if (!item) {
        return next(new AppError('No item found', 404));
    }

    const existingItem = cart.items.find(cartItem => cartItem.itemId.toString() === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ itemId, quantity: 1, price: item.price });
    }

    cart.totalQuantity = cart.items.reduce((total, cartItem) => total + cartItem.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    await cart.save();

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });
});


exports.removeItemsFromCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.body;
    const userId = req.user._id;

    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }

    if (!itemId) {
        return next(new AppError('Item ID is required', 400));
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('No cart found for this user', 404));
    }

    const itemIndex = cart.items.findIndex(cartItem => cartItem.itemId.toString() === itemId);
    if (itemIndex === -1) {
        return next(new AppError('Item not found in cart', 404));
    }

    const item = cart.items[itemIndex];
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.items.splice(itemIndex, 1);
    }

    cart.totalQuantity = cart.items.reduce((total, cartItem) => total + cartItem.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    await cart.save();

    res.status(200).json({
        status: 'success',
        data: {
            cart,
        },
    });
});

exports.removeAllItemInstancesFromCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.body; 
    const userId = req.user._id;  

    if (!userId) {
        return next(new AppError('User ID is required', 400));
    }

    if (!itemId) {
        return next(new AppError('Item ID is required', 400));
    }

    // Find the cart for the current user
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return next(new AppError('No cart found for this user', 404));
    }

    // Filter out all instances of the item from the cart
    const itemsToRemove = cart.items.filter(cartItem => cartItem.itemId.toString() === itemId);
    
    if (itemsToRemove.length === 0) {
        return next(new AppError('Item not found in cart', 404));
    }

    // Remove all instances of the item
    cart.items = cart.items.filter(cartItem => cartItem.itemId.toString() !== itemId);

    // Recalculate totalQuantity and totalPrice
    cart.totalQuantity = cart.items.reduce((total, cartItem) => total + cartItem.quantity, 0);
    cart.totalPrice = cart.items.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

    await cart.save();  // Save updated cart to the database

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
    
    const cart = await Cart.findOne({ user: userId }).populate('items.itemId');
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