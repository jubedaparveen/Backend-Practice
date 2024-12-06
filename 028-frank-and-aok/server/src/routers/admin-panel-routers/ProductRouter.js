const express = require('express');
const ProductRouter = express.Router();


const multerUpload = require('../../middleware/multer');

const { createProductCategoryController } = require('../../controllers/controllersjunction');


ProductRouter.post('/create-product', multerUpload, createProductCategoryController);

module.exports = ProductRouter;