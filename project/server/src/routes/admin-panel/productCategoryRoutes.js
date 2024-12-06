const express = require('express');
const { 
    createProductCategory, 
    readProductCategories,
    productCategoriesByParentCategory
 } = require('../../controllers/controllers');
const multerUpload = require('../../middlewares/multer');

const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category', multerUpload,  createProductCategory);
productCategoryRouter.get('/read-categories', readProductCategories);
productCategoryRouter.get('/category-by-parent-category/:parent_category', productCategoriesByParentCategory);

module.exports = productCategoryRouter;