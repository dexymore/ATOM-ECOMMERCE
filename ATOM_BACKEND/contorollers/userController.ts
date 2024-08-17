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

exports.getCurrentUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    const user = await User.findById(req.user.id);
if (!user) {
    return next(new AppError('No user found with that ID', 404));
}
res.status(200).json({
    status: 'success',
    data: {
        user,
    },
});
});

