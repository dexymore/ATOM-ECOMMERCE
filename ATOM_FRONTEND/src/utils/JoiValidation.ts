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