import express from 'express';

import { webhookHandler } from "../contorollers/webhookController";
import protect from '../middlewares/appMiddlewares';



const router = express.Router();

// Use express.raw() middleware for the webhook route
router.post('/', );
router.get('/',(req,res)=>{
    res.send('Hello from webhook');
})

export default router;