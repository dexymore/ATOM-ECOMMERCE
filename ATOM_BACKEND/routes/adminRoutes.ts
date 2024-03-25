
const express = require('express');
// const userController = require('../controllers/userController');

const userController = require('../contorollers/userController');
const adminController = require('../contorollers/adminController');
const itemController = require('../contorollers/itemController');
 const appMiddlewares = require('../middlewares/appMiddlewares');

const router = express.Router();



router.post('/signup', adminController.signup);
router.post('/login', adminController.login);

// router.get('/logout', adminController.logout)

router.use(appMiddlewares.restrict);
router.get('/',adminController.getAllAdmins)
router.post('/createItem',itemController.createItem) ;
router.get('/getAllItems',itemController.getAllItems);
router.get('/getItem/:id',appMiddlewares.checkIDS,itemController.getItem);
router.patch('/updateItem/:id',appMiddlewares.checkIDS,itemController.updateItem);
router.delete('/deleteItem/:id',appMiddlewares.checkIDS,itemController.deleteItem);
router.get('/logout',adminController.logout)


export default router;
