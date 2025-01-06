const express = require('express');
const parentCategoryRouterWeb = express.Router();

const { 
    activeParentCategoriesWebController, 
} = require('../../controllers/controllersjunction');

parentCategoryRouterWeb.get('/active-parent-categoriesWeb', activeParentCategoriesWebController)

module.exports = {
    parentCategoryRouterWeb
}