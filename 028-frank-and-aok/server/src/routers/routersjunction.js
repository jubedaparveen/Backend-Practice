const express = require('express');

// initialise Routers for Admin-panel-routers, website-Routers and Mobile-app-Routers
const adminPanelRouters = express.Router();
const websiteRouters = express.Router();
const mobileAppRouters = express.Router();

//Import 
const SizesRouter = require('./admin-panel-routers/SizesRouter');
const ColorsRouters = require('./admin-panel-routers/ColorRouters');
const parentCategoryRouter = require('./admin-panel-routers/parentCategoryRouters');
const ProductCategoryRouter = require('./admin-panel-routers/ProductCategoryRouters');
const adminLoginRouter = require('./admin-panel-routers/adminLoginRouters');
const forgetPasswordRouter = require('./admin-panel-routers/ForgetPasswordRouter');
const ProductRouter = require('./admin-panel-routers/ProductRouter');

//admin panel
// connection between Sizes, Color, parentCategory, productcategory Router to admin panel router
adminPanelRouters.use('/admin-login', adminLoginRouter);
adminPanelRouters.use('/forget-Password', forgetPasswordRouter)
adminPanelRouters.use('/Sizes', SizesRouter);
adminPanelRouters.use('/Colors', ColorsRouters);
adminPanelRouters.use('/parent-category', parentCategoryRouter);
adminPanelRouters.use('/product-category', ProductCategoryRouter);
adminPanelRouters.use('/products', ProductRouter)

//Website
//imports
//Api





//export all adminPanelRouters, websiteRouters and mobileAppRouters
module.exports = {
    adminPanelRouters,
    websiteRouters,
    mobileAppRouters
}

