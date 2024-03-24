
const express = require('express');
// const userController = require('../controllers/userController');

const userController = require('../contorollers/userController');
const adminController = require('../contorollers/adminController');

const router = express.Router();



router.post('/signup', adminController.signup);
router.post('/login', adminController.login);

// router.get('/logout', adminController.logout)
router.get('/',adminController.getAllAdmins)


export default router;
