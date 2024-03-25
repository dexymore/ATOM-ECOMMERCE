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
    results: items.length,
 
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

exports.createItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
const newItem = await Item.create(req.body);
if (!newItem) {
    return next(new AppError('erorr creating thios item', 500))};
res.status(201).json({
    status: 'success',
    data: {
        item: newItem,
    },
});
});

exports.updateItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
const item= await Item.findByIdAndUpdate(req.params.id, req.body);
if (!item) {
    return next(new AppError('No item found with that ID', 404))};
res.status(200).json({
    status: 'success',
    data: {
        item,
    },
});
});


exports.deleteItem = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
const item= await Item.findByIdAndDelete(req.params.id);
if (!item) {
    return next(new AppError('No item found with that ID', 404))}
res.status(204).json({})

})


exports.getSpecificItems = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };

    // List of fields that can be filtered
    const allowedFields = ['category', 'size', 'sex'];

    // Remove fields from queryObj that are not allowed
    Object.keys(queryObj).forEach(key => {
        if (!allowedFields.includes(key)) {
            delete queryObj[key];
        }
    });

    // Use the cleaned queryObj to perform the query

    const items = await Item.find(queryObj);

    if (!items.length) {
        return next(new AppError('No items found matching the criteria', 404));
    }

    res.status(200).json({
        status: 'success',
        results: items.length,
        data: {
            items,
        },
    });
});