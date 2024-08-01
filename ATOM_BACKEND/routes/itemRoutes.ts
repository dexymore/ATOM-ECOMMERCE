import express, { Request, Response } from 'express';
const itemController = require('../contorollers/itemController');
const appMiddlewares = require('../middlewares/appMiddlewares');



const router = express.Router();

router.get('/', itemController.getAllItems);
router.get('/filterItem',itemController.getSpecificItems)
router.get('/:id', appMiddlewares.checkIDS({ params: ['id'] }), itemController.getItem);






export default router;