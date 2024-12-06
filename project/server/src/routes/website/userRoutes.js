const express = require('express');
const { genrateOtpWeb, registerUser, verifyJwt } = require('../../controllers/controllers');

const userRouter = express.Router();

userRouter.post('/genrate-otp', genrateOtpWeb);
userRouter.post('/register-user', registerUser);
userRouter.post('/verify-login', verifyJwt);

module.exports = userRouter;