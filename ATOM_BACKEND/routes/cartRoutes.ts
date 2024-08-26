
import express, { Request, Response } from 'express';
import protect from '../middlewares/appMiddlewares';

const cartController = require('../contorollers/cartController');
const appMiddlewares = require('../middlewares/appMiddlewares');
const router = express.Router();

router.get('/', cartController.getAllCarts);
router.use(protect);
router.patch('/add-items', appMiddlewares.checkIDS({ body: ['itemId'] }),cartController.addItemsToCart);
router.patch('/remove-items', appMiddlewares.checkIDS({ body: ['itemId'] }),cartController.removeItemsFromCart);
router.patch('/remove-all-item-instances', appMiddlewares.checkIDS({ body: ['itemId'] }),cartController.removeAllItemInstancesFromCart);
router.get('/get-cart', cartController.getOneUserCart);


export default router;