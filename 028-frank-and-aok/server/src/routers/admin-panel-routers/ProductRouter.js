const express = require('express');
const ProductRouter = express.Router();


const multerUpload = require('../../middleware/multer');

const { createProductController } = require('../../controllers/controllersjunction');


ProductRouter.post('/create-product', multerUpload, createProductController);

module.exports = ProductRouter;