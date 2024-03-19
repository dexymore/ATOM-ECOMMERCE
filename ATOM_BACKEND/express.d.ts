// typings/express.d.ts
import { User,IUser } from '../models/userModel'; // Adjust the path based on your project structure

declare module 'express' {
    interface Request {
        user?: IUser;
    }
}

// typings/mongoose.d.ts