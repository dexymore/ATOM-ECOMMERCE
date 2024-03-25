
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { User ,IUser} from '../models/userModel';
import AppError from '../utils/AppError';
import asyncHandler from "express-async-handler";
import crypto from 'crypto';
import Email from '../utils/sendMail';
// const crypto = require('crypto');


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

  const createSendToken = function(user: any, statusCode: number, res: Response): void {
    const token = signToken(user._id);

    const cookiesOptions = {
        expires: new Date(Date.now() + (Number(process.env.JWT_EXPIRES_IN_COOKIE) * 1000)), // JWT_EXPIRES_IN_COOKIE should be in seconds
        httpOnly: true
    };

    

    res.cookie('jwt', token, cookiesOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user,
        },
    });
};

exports.signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // Create a new user
  const newUser = await User.create(req.body);

  // Send welcome email to the new user
  const welcomeEmail = new Email(newUser, 'https://yourwebsite.com');
  await welcomeEmail.sendWelcomeEmail();

  // Send response to the client
  createSendToken(newUser, 201, res); // Assuming this function sends the JWT token
  res.status(201).json({
      status: 'success',
      data: {
          user: newUser,
      },
  });
});

exports.login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
      const { email, password } = req.body;
  
      // Check if email and password exist
      if (!email || !password) {
        return next(new AppError('Please enter email and password', 400));
      }
  
      // Check if user exists and password is correct
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
      }
  
      // If everything is okay, send the token
      const token = signToken(user._id);
  

  
      createSendToken(user, 200, res);
    
  };


//   export const protect = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // 1) Check if token exists in headers or cookies
//         let token: string | undefined;
//         if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//             token = req.headers.authorization.split(' ')[1];
//         } else if (req.cookies.jwt) {
//             token = req.cookies.jwt;
//         }
//         if (!token) {
//             return next(new AppError('You are not logged in', 401));
//         }

//         // 2) Verify the token
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//         // 3) Check if user exists
//         const currentUser : typeof User | null   = await User.findById(decoded.id);
//         if (!currentUser) {
//             return next(new AppError('The user belonging to this token does not exist.', 401));
//         }

//         // 4) Check if user changed password after token was issued
//         if (currentUser.changedPasswordAfter(decoded.iat)) {
//             return next(new AppError('User recently changed password! Please log in again.', 401));
//         }

//         // Grant access to protected route
//         // req.user = currentUser ;


// // Attach the user object to the request
//         res.locals.user = currentUser; // Make the user object available in views (optional)
//         next();
//     } catch (err) {
//         return next(new AppError('Invalid token. Please log in again.', 401));
//     }
// };

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

