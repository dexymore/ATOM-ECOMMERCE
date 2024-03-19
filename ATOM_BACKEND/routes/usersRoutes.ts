import e from "express";

const express = require('express');
// const userController = require('../controllers/userController');
const authController = require('../contorollers/authController');

const router = express.Router();


router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.get('/logout', authController.logout);
// router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);



export default router;
