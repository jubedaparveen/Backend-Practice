const express = require('express');
const multer = require('multer');
const {
    createParentCategory,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCatergory,
    activeParentCategories
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();
parentCategoryRouter.use(multer().none());

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/read-categories', readParentCategories);
parentCategoryRouter.put('/update-status/:_id', updateParentCategoryStatus);
parentCategoryRouter.delete('/delete-category/:_id', deleteParentCategory);
parentCategoryRouter.put('/delete-categories', deleteParentCategories);
parentCategoryRouter.get('/read-category/:_id', readParentCategory);
parentCategoryRouter.put('/update-category/:_id', updateParentCatergory);
parentCategoryRouter.get('/active-categories', activeParentCategories);

module.exports = parentCategoryRouter;