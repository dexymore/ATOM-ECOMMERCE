
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { User ,IUser} from '../models/userModel';
import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";
import crypto from 'crypto';
import Email from '../utils/sendMail';
import {Cart} from '../models/cartModel';
// const crypto = require('crypto');


const expirationdate=Math.floor(Date.now() / 1000) + parseInt(process.env.JWT_EXPIRES_IN);

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = (user: any, statusCode: number, res: Response): void => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES_IN_COOKIE) * 1000), // JWT_EXPIRES_IN_COOKIE should be in seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Cookie will only be sent over HTTPS in production
  };

  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    data: {
      user,
    },
  });
};
// Assuming this is a utility function

exports.signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await User.create(req.body);

  const newCart = new Cart({
    user: newUser._id,
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });
  await newCart.save();

  newUser.cart = newCart._id;
  await newUser.save();

  const welcomeEmail = new Email(newUser, 'https://yourwebsite.com');
  await welcomeEmail.sendWelcomeEmail();

  createSendToken(newUser, 201, res);
});


exports.login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});




exports.forgetpassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with that email address.', 404));
    }

    // 2) Generate random password reset token and save it to the user document
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send password reset email to the user
    try {
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
        await new Email(user, resetURL).sendPasswordResetEmail(); // Assuming your Email class has a method named sendPasswordResetEmail
        res.status(200).json({ status: 'success', message: 'Password reset token sent to email.' });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending the email. Please try again later.', 500));
    }
});
  

  exports.resetPassword = asyncHandler(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
  
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
  
    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  
    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user,200,res)
  });


//   export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         if (req.cookies.jwt) {
//             const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET) as { id: string, iat: number };
//             const freshUser = await User.findById(decoded.id);
//             if (freshUser && !freshUser.changedPasswordAfter(decoded.iat)) {
//                 res.locals.user = freshUser;
//                 req.user = freshUser;
//             }
//         }
//         next(); // Call next outside the try-catch block
//     } catch (err) {
//         next(err); // Pass the error to the error handling middleware
//     }
// };


// Define a function called "restrict" that accepts any number of roles as arguments.


  
  exports.logout = (req:Request, res:Response) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now()+10*1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  }

// exports.getme = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//     const user=req.user;
//     res.status(200).json({
//         status: 'success',
//         data: {
//             user,
//         },
//     });
// });


exports.verifyAuth = asyncHandler(async (req, res, next) => {
if(req.user){
  res.status(200).json({status:"success",isAuthenticted:true})
}

});