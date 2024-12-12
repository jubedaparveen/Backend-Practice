const express = require('express');

const userRegisterRouter = express.Router();


const { 
    genrateOtpWebsiteController 
} = require('../../controllers/controllersjunction');

userRegisterRouter.post('/genrate-otp', genrateOtpWebsiteController);

module.exports = {
    userRegisterRouter
}