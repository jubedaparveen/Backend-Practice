const express = require('express');
const { adminLogin, genrateOtp, verifyOtp } = require('../../controllers/controllers');
const multer = require('multer');

const adminRouter = express.Router();

adminRouter.post('/login',multer().none(), adminLogin);
adminRouter.post('/genrate-otp', genrateOtp);
adminRouter.put('/update-email', verifyOtp);

module.exports = adminRouter;