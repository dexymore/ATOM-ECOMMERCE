import express, { Request, Response } from 'express';
const itemController = require('../contorollers/itemController');



const router = express.Router();

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItem);



export default router;