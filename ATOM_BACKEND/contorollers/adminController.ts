import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import {Admin,IAdmin} from '../models/adminModel';
import AppError from '../utils/AppError';

import asyncHandler from "express-async-handler";
import crypto from 'crypto';



const expirationdate=Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRES_IN);

const signToken = function (id: string) {
    return jwt.sign(
      {
        id,
  
        exp: expirationdate,
      },
      process.env.JWT_SECRET
    );
  };

  const createSendToken = function(admin: any, statusCode: number, res: Response): void {
    const token = signToken(admin._id);

    const cookiesOptions = {
        expires: new Date(Date.now() + (Number(process.env.JWT_EXPIRES_IN_COOKIE) * 1000)), // JWT_EXPIRES_IN_COOKIE should be in seconds
        httpOnly: true
    };

    

    res.cookie('jwt', token, cookiesOptions);
    admin.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            admin,
        },
    });
};

exports.signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
const newadmin = await Admin.create(req.body);
createSendToken(newadmin, 201, res);
// res.status(201).json({
//     status: 'success',
//     data: {
//         admin: newadmin,
//     },
// });


});

exports.login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
      const { email, password } = req.body;
  
      // Check if email and password exist
      if (!email || !password) {
        return next(new AppError('Please enter email and password', 400));
      }
  
      // Check if admin exists and password is correct
      const admin = await Admin.findOne({ email }).select('+password');
      if (!admin || !(await admin.correctPassword(password, admin.password))) {
        return next(new AppError('Incorrect email or password', 401));
      }
  
      // If everything is okay, send the token
      // const token = signToken(admin._id);
  

  
      createSendToken(admin, 200, res);
    
  };

  exports.getAllAdmins = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
const admins = await Admin.find();
res.status(200).json({
    status: 'success',
    results: admins.length,
    data: {
        admins,
    },
});

if (!admins) {
    return next(new AppError('No admins found', 404));}
  });