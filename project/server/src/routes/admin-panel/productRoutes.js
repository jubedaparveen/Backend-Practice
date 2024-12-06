const express = require('express');
const multerUpload = require('../../middlewares/multer');
const { createProduct } = require('../../controllers/controllers');

const productRouter = express.Router();

productRouter.post('/create-product', multerUpload, createProduct);

module.exports = productRouter;