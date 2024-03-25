

const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../contorollers/authController');
const userController = require('../contorollers/userController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
 router.post('/forgetpassword', authController.forgetpassword);
 router.patch('/resetpassword/:token', authController.resetPassword);

router.get('/', userController.getAllUsers);





export default router;
