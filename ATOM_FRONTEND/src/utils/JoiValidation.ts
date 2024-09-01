import { parseStackingContexts } from 'html2canvas/dist/types/render/stacking-context';
import Joi from 'joi';
// do not forget ro rensure about the email regex pattern
export const userJoiSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'A user must have a name',
        'string.base': 'Name must be a string'
    }),
    email: Joi.string().regex(/^\S+@\S+\.\S+$/).required().messages({
        'any.required': 'Please enter your email',
        'string.base': 'Email must be a string',
        'string.pattern.base': 'Please enter a valid email address'
    }),
    password: Joi.string().min(8).required().messages({
        'any.required': 'A user must have a password',
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters long'
    }),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match'
    })
});

export const userLoginJoiSchema = Joi.object({
    email: Joi.string().regex(/^\S+@\S+\.\S+$/).required().messages({
        'any.required': 'Please enter your email',
        'string.base': 'Email must be a string',
        'string.pattern.base': 'Please enter a valid email address in the format anything@anything.com'
    }), // Updated email validation with regex pattern
    password: Joi.string().required().messages({
        'any.required': 'Please enter your password',
        'string.base': 'Password must be a string'
    })
});


export const userForgotPasswordSchema = Joi.object({
    email: Joi.string().regex(/^\S+@\S+\.\S+$/).required().messages({
        'any.required': 'Please enter your email',
        'string.base': 'Email must be a string',
        'string.pattern.base': 'Please enter a valid email address in the format anything@anything.com'
    })})    ;

export const userResetPasswordSchema = Joi.object({
    password: Joi.string().min(8).required().messages({
        'any.required': 'A user must have a password',
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters long'
    }),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.required': 'Please confirm your password',
        'any.only': 'Passwords do not match'
    })
})
    export const userCheckoutSchema = Joi.object({
    address: Joi.string().required().messages({
        'any.required': 'Please enter your address',
        'string.base': 'Address must be a string'
    }),
    phone_number: Joi.string()
    .pattern(/^[0-9]+$/) // Only digits allowed
    .required()
    .messages({
      'any.required': 'Please enter your phone number',
      'string.pattern.base': 'Phone number must only contain digits',
      'string.base': 'Phone number must be a string'
    }),
    delivery: Joi.string().required().messages({
        'any.required': 'Please select a delivery option',
        'string.base': 'Delivery must be a string'
    }),
    special_note: Joi.string().allow('').messages({
        'string.base': 'Special note must be a string'
    })
});