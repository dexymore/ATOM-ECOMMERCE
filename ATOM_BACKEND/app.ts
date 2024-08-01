import { globalErrorHandler } from './utils/AppError';
import express, {
    Express,
    Request,
    Response,
    NextFunction,
    Application,
  } from "express";
  import cors from "cors";
  import dotenv from "dotenv";
  import errorHandler from "./middlewares/errorHandler";
  import cookieParser from "cookie-parser";
import usersRouter from './routes/usersRoutes';
import adminRouter from './routes/adminRoutes';
import itemRouter from './routes/itemRoutes';
import cartRouter from './routes/cartRoutes';




const helmet = require('helmet');



  declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        NODE_ENV: "development" | "production";
        JWT_SECRET: string;
        JWT_EXPIRES_IN: string;
      }
    }
  }

  
  dotenv.config();
  
  const app: Application = express();

  app.use(express.json());
 

  app.use(cors({
    origin: 'http://localhost:5173', // Adjust to your frontend URL
    credentials: true,
  }));
  app.use(cookieParser());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Adjust as needed
    }
  }));
  
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "Hello World",
    });
  });
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    req.body.requestTime = new Date().toISOString();
    next();
  });
  
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/admin', adminRouter);
  app.use('/api/v1/items', itemRouter);
  app.use('/api/v1/carts', cartRouter)

  app.use(errorHandler);

  export default app;
  