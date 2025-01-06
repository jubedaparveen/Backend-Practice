const express = require('express');
const multer = require('multer');
const forgetPasswordRouter = express.Router();

const { 
    forgetPasswordGenrateOtpController, 
    verifyOtpController,
    PasswordUpdateController, 
} = require('../../controllers/controllersjunction');


forgetPasswordRouter.post('/forget-password-genrate-otp', forgetPasswordGenrateOtpController);
forgetPasswordRouter.post('/verify-otp', verifyOtpController)
forgetPasswordRouter.put('/password-update', PasswordUpdateController)

module.exports = forgetPasswordRouter;