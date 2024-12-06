const express = require('express');
const multer = require('multer');

//Initialise router only
const parentCategoryRouter = express.Router();
// Initialise Multer for form read without file input field
parentCategoryRouter.use(multer().none());

const { 
        ParentCategoryController, 
        readParentCategoryController, 
        UpdateParentCategoryStatusController, 
        singleDeleteParentCategoryController, 
        multiDeleteParentCategoryController,
        editReadParentCategoryController,
        editupdataParentCategoryController,
        activeParentCategories
     } = require('../../controllers/controllersjunction');

// Create Router for Parent - Category
parentCategoryRouter.post('/create-Parent-Category', ParentCategoryController);
// Read router for Parent -Category
parentCategoryRouter.get('/read-parent-category', readParentCategoryController);
// status update router
parentCategoryRouter.put('/status-update-parent-category/:_id', UpdateParentCategoryStatusController);
// Delete single Parent -Category  Router
parentCategoryRouter.delete('/single-delete-parent-category:_id', singleDeleteParentCategoryController);
// Multi Delete Parent -Category Router
parentCategoryRouter.put('/multi-delete-parent-category', multiDeleteParentCategoryController);
// Edit Parent - Category Router
parentCategoryRouter.get('/edit-read-parent-category/:_id', editReadParentCategoryController);
//Edit and Update Parent - Category Router
parentCategoryRouter.put('/edit-updata-parent-category/:_id', editupdataParentCategoryController)
//Active PArent Categoey Parent-Category
parentCategoryRouter.get('/active-parent-category', activeParentCategories)



// export this Router
module.exports = parentCategoryRouter;