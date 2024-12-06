const express = require('express');
const multer = require('multer');
const forgetPasswordRouter = express.Router();
const { 
    forgetPasswordGenrateOtpController 
} = require('../../controllers/controllersjunction');

forgetPasswordRouter.post('/forget-password-genrate-otp', forgetPasswordGenrateOtpController);

module.exports = forgetPasswordRouter;