
var mongoose = require('mongoose');
import { Request, Response, NextFunction } from 'express';
const multer = require('multer');


const Express = require('express');



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
        user?: any; // Assuming IUser is the interface for your user model
    }
}

exports.checkIDS = function (req:Request, res:Response, next:NextFunction) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID for this document, please provide valid ID'
        });
    }
    
    next();
};


exports.restrict = (req: Request, res: Response, next: NextFunction) => {
        // Check if the user is authenticated and if their email ends with '@atom.io'
        if (!req.cookies.Adminjwt) {
            // User is an admin, allow access to the protected route
            return res.status(403).json({ message: "You don't have permission to access this resource" });
          
        } else {
            // User is not an admin, deny access with a 403 Forbidden status
       next();
        }
    };

/////////////////////////multer///////////////////////////
///upload image

