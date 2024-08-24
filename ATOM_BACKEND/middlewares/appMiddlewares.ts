
var mongoose = require('mongoose');
import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import {User} from '../models/userModel';
import asyncHandler from 'express-async-handler';
import AppError from '../utils/AppError'



interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}

declare module 'express' {
    interface Request {
        user?: any; 
    }
}

export const checkIDS = (fieldsToCheck: { params?: string[], body?: string[] }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (fieldsToCheck.params) {
            for (const field of fieldsToCheck.params) {
                if (!mongoose.Types.ObjectId.isValid(req.params[field])) {
                    return next(new AppError(`Invalid ID for ${field} in params`, 400));
                }
            }
        }

        if (fieldsToCheck.body) {
            for (const field of fieldsToCheck.body) {
                if (!mongoose.Types.ObjectId.isValid(req.body[field])) {
                    return next(new AppError(`Invalid ID for ${field} in body`, 400));
                }
            }
        }

        next();
    };
}

exports.restrict = (req: Request, res: Response, next: NextFunction) => {
       
        if (!req.cookies.Adminjwt) {
        
            return res.status(403).json({ message: "You don't have permission to access this resource" });
          
        } else {
            
       next();
        }
    };



const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
  
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; iat: number; exp: number };
  
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }
  
    req.user = currentUser;
    next();
  });
  
  export default protect;