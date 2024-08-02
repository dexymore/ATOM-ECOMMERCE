import protect from "../middlewares/appMiddlewares";


import express from 'express';
const router=express.Router();
const orderController = require('../contorollers/orderController');



router.get('/checkout', protect,orderController.getCheckout);





export default router;