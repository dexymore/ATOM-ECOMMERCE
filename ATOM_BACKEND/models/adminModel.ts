import mongoose, { Schema, Document,Query } from 'mongoose';
const validator = require('validator');
const bcrypt = require('bcrypt');


interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;

}

const adminSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value) && value.endsWith('@atom.io'),
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required:  [true, 'a user must have a password'],

        minlength: [8, 'a user password must be more or equal to 8 chars'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


adminSchema.pre('save', async function (next) {
    //only run the function if passwoed is modified
    // if (!this.isModified('password')) return next();
    //hash the password with cost of twelve
    this.password = await bcrypt.hash(this.password, 14);
    //deleting the password confirm feild becaue its nod needed in the database
    this.passwordConfirm = undefined;
    // finally calling next
    next();
  });

adminSchema.methods.correctPassword = async function (
    candidatePassword:any,
    userPassword:any
  ) {
    // This function takes in two arguments: the candidate password and the user password
    // The candidate password is the password entered by the user attempting to log in
    // The user password is the hashed password stored in the database for the corresponding user
  
    return await bcrypt.compare(candidatePassword, userPassword);
    // The bcrypt.compare method compares the candidate password with the user password
    // It returns a Promise that resolves to a boolean value indicating whether the passwords match
    // If the passwords match, the Promise resolves to true; otherwise, it resolves to false
    // The Promise is returned by the function, allowing the caller to handle the result appropriately
  };
const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export {Admin,IAdmin}