const express = require('express');
const { activeProductsByParentCategory } = require('../../controllers/controllersjunction');


const activeproductRouterWeb = express.Router();


activeproductRouterWeb.get('/active-products/:parent_category', activeProductsByParentCategory)



module.exports = activeproductRouterWeb;