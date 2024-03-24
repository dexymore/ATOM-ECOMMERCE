import { Request, Response, NextFunction } from 'express';
import { User ,IUser} from '../models/userModel';
import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";


exports.getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const users = await User.find();

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
    if (!users) {
        return next(new AppError('No users found', 404));
    }

});