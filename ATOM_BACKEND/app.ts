import dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { globalErrorHandler } from './utils/AppError';
import errorHandler from './middlewares/errorHandler';
import { webhookHandler } from "./contorollers/webhookController";
import usersRouter from './routes/usersRoutes';
import adminRouter from './routes/adminRoutes';
import itemRouter from './routes/itemRoutes';
import cartRouter from './routes/cartRoutes';
import webHookRouter from './routes/webHookRoutes';
import orderRouter from './routes/orderRoutes';

import mongoSanitize from 'express-mongo-sanitize';




const app: Application = express();

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

app.use(mongoSanitize());
app.post('/api/v1/webhook',express.raw({type:'application/json'}),webhookHandler );

app.use(express.json({ limit: '20kb' }));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(cookieParser());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"], 
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
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);


// Global error handler
app.use(errorHandler);

export default app;
