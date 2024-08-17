import protect from "../middlewares/appMiddlewares";


const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../contorollers/authController');
const userController = require('../contorollers/userController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgetpassword', authController.forgetpassword);


router.use(protect);
router.get("/verify",authController.verifyAuth)
router.get('/logout', authController.logout);

router.patch('/resetpassword/:token', authController.resetPassword);

router.get('/', userController.getAllUsers);
router.get('/me', userController.getCurrentUser);





export default router;
