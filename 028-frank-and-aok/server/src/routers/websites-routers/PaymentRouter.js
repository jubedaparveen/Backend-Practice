const express = require('express');

const { 
    createCheckoutController, 
    setPaymentStatusController 
} = require('../../controllers/controllersjunction');

const paymentRouter = express.Router();

paymentRouter.post('/create-checkout', createCheckoutController);
paymentRouter.put('/update-payment-status/:_id', setPaymentStatusController)

module.exports = paymentRouter;