import { Request, Response, NextFunction } from 'express';
import { Item ,IItem} from '../models/itemModel';
import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";


exports.getAllItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

const items = await Item.find()
if (!items) {
    return next(new AppError('No items found', 404));}

res.status(200).json({
    status: 'success',
 
    data: {
        items,
    },
});



});

exports.getItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

const item = await Item.findById(req.params.id);

if (!item) {
    return next(new AppError('No item found with that ID', 404));
    
}

res.status(200).json({
    status: 'success',
    data: {
        item,
    },
});

});

