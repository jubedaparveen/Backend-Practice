const express = require('express');
const multer = require('multer');

const userRegisterRouter = express.Router();


const { 
    userLoginController,
    genrateOtpWebsiteController, 
    registerUserController,
    verifyJwtController,
} = require('../../controllers/controllersjunction');

userRegisterRouter.post('/user-login', multer().none(), userLoginController)
userRegisterRouter.post('/genrate-otp', genrateOtpWebsiteController);
userRegisterRouter.post('/register-user', registerUserController);
userRegisterRouter.post('/verify-jwt-login', verifyJwtController);

module.exports = {
    userRegisterRouter, 
};