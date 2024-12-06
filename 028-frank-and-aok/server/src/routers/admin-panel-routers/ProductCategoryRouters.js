const express = require('express');
const multer = require('multer');
const multerupload = require('../../middleware/multer');
const ProductCategoryRouter = express.Router();

const {
    createProductCategoryController,
    readProductCategoryController,
    StatusUpdateProductCategoryController,
    singleDeleteProductCategoryController,
    editReadProductCategoryController,
    editupdataProductCategoryController,
    multiDeleteProductCategoryController,
    productCategoriesByParentCategory
} = require('../../controllers/controllersjunction');



ProductCategoryRouter.post('/create-Product-category', multerupload, createProductCategoryController);
ProductCategoryRouter.get('/read-product-category', readProductCategoryController);
ProductCategoryRouter.put('/status-update-product-category/:_id', StatusUpdateProductCategoryController);
ProductCategoryRouter.delete('/single-delete-product-category/:_id', singleDeleteProductCategoryController);
ProductCategoryRouter.get('/edit-read-product-category/:_id', editReadProductCategoryController);
ProductCategoryRouter.put('/edit-updata-product-category/:_id', multerupload,editupdataProductCategoryController);
ProductCategoryRouter.put('/multi-delete-product-category', multiDeleteProductCategoryController)

//product Categories By Parent Category
ProductCategoryRouter.get('/product-by-parent-category/:parent_category', productCategoriesByParentCategory);

//

//

module.exports = ProductCategoryRouter;