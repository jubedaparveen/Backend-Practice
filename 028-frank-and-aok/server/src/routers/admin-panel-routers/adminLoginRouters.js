const express = require('express');
const multer = require('multer');
const { 
    adminLoginController, 
    genrateOtpController, 
    verifyOtpEmailUpdateController
} = require('../../controllers/controllersjunction');

const adminLoginRouter = express.Router();

adminLoginRouter.post('/login', multer().none(), adminLoginController);
adminLoginRouter.post('/genrate-otp', genrateOtpController);
adminLoginRouter.put('/update-email-verify-otp', verifyOtpEmailUpdateController);

module.exports = adminLoginRouter;