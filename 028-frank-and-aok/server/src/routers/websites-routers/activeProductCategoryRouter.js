const express = require('express');
const productCategoryWebRouter = express.Router();

const { activeProductCategoryWebController } = require('../../controllers/controllersjunction');

productCategoryWebRouter.get('/active-product-categoryWeb', activeProductCategoryWebController);

module.exports ={

    productCategoryWebRouter
}