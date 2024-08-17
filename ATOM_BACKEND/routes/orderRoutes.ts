import protect from "../middlewares/appMiddlewares";


import express from 'express';
const router=express.Router();
const orderController = require('../contorollers/orderController');



router.post('/checkout', protect,orderController.getCheckout);
router.get('/', protect,orderController.getUserOrders);






export default router;