import mongoose, { Schema, Document,Query } from 'mongoose';
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    passwordChangedAt: Date;
    passwordResetToken: string|undefined;
    passwordResetExpires: Date|undefined;
    active: boolean;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    changedPasswordAfter(JWTTimestamp: number): boolean;
    createPasswordResetToken(): string;
    changedPasswordAfter(JWTTimestamp: number): boolean;
    cart : mongoose.Types.ObjectId;

    

}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'a user must have a name']
    },
    email: {
        type: String,
        required: [true, 'a user must have email'],
        unique: true,
        lowercase: true,
        vlaidate: [validator.isEmail, 'please enter a valid email'],
    },
  password: {
        type: 'string',
    required: [true, 'a user must have a password'],
    minlength: [8, 'a user password must be more or equal to 8 chars'],
    select: false,
  },
  passwordchangedat: { type: Date },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active:{type:Boolean,default:true,select:false},
  cart: {
    type: mongoose.Types.ObjectId,
    ref: 'Cart',
  },
});



userSchema.pre('save', async function (next) {
    //only run the function if passwoed is modified
    if (!this.isModified('password')) return next();
    //hash the password with cost of twelve
    this.password = await bcrypt.hash(this.password, 14);
    //deleting the password confirm feild becaue its nod needed in the database
    this.passwordConfirm = undefined;
    // finally calling next
    next();
  });

  userSchema.methods.correctPassword = async function (
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

  userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
        const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
}

userSchema.methods.createPasswordResetToken = function (): string {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');


// canged the expires time to 5 minutes instead of 10 minutes , cause 10 is a big number i think
    this.passwordResetExpires = Date.now() + 5 * 60 * 1000;

    return resetToken;
};

userSchema.pre<IUser>('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = new Date(Date.now() - 1000)
    next();
});

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: number): boolean {
    if (this.passwordChangedAt) {
      // Directly calculate the timestamp in seconds from the Date object
      const changedTimestamp = this.passwordChangedAt.getTime() / 1000;
  
      // Compare the provided JWT timestamp (assumed to be in seconds) with the password changed timestamp
      return JWTTimestamp < changedTimestamp;
    }
  
    // If there's no passwordChangedAt date, assume the password hasn't been changed after the JWT was issued
    return false;
  };
  

userSchema.pre('find', function (next: any) {
    // Modify the current query to filter out inactive users
    this.where({ active: { $ne: false } });
    next();
});

const User = mongoose.model<IUser>('User', userSchema);

export {User,IUser}