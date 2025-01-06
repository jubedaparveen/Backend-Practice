const express = require('express');
const ProductRouter = express.Router();


const multerUpload = require('../../middleware/multer');

const { 
    createProductController, 
    readProductController, 
    updateStatusProductController,
    singleDeleteProductController,
    editReadProductController
} = require('../../controllers/controllersjunction');


ProductRouter.post('/create-product', multerUpload,  createProductController);
ProductRouter.get('/read-product', readProductController);
ProductRouter.put('/update-status-product/:_id', updateStatusProductController);
ProductRouter.delete('/single-delete-product/:_id', singleDeleteProductController);
ProductRouter.get('/edit-read-product/:_id', editReadProductController);




// ProductRouter.post('/create-product', multerUpload, createProductController);


module.exports = ProductRouter;