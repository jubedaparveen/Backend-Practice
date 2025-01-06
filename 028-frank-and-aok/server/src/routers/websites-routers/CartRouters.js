const express = require('express');

const { 
    createCartController, 
    readCartController,
    deleteCartController,
    updateCartQuantityController
} = require('../../controllers/controllersjunction');

const cartRouter = express.Router();

cartRouter.post('/create-cart', createCartController);
cartRouter.get('/read-cart/:user', readCartController);
cartRouter.delete('/delete-cart/:_id', deleteCartController);
cartRouter.put('/update-cart/:_id', updateCartQuantityController);


module.exports = cartRouter;