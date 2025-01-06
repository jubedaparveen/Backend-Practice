const express = require('express');

// initialise Routers for Admin-panel-routers, website-Routers and Mobile-app-Routers
const adminPanelRouters = express.Router();
const websiteRouters = express.Router();
const mobileAppRouters = express.Router();

//-----------------------------admin panel---------------------------------------
    //--------------------Import 
        const adminLoginRouter = require('./admin-panel-routers/adminLoginRouters');
        const forgetPasswordRouter = require('./admin-panel-routers/ForgetPasswordRouter');
        const SizesRouter = require('./admin-panel-routers/SizesRouter');
        const ColorsRouters = require('./admin-panel-routers/ColorRouters');
        const parentCategoryRouter = require('./admin-panel-routers/parentCategoryRouters');
        const ProductCategoryRouter = require('./admin-panel-routers/ProductCategoryRouters');
        const ProductRouter = require('./admin-panel-routers/ProductRouter');
        const OrderRouters = require('./admin-panel-routers/OrderRouter');
        const storyRouter = require('./admin-panel-routers/storyRouter');
    //---------------------------  Api
        adminPanelRouters.use('/admin-login', adminLoginRouter);
        adminPanelRouters.use('/forget-Password', forgetPasswordRouter)
        adminPanelRouters.use('/Sizes', SizesRouter);
        adminPanelRouters.use('/Colors', ColorsRouters);
        adminPanelRouters.use('/parent-category', parentCategoryRouter);
        adminPanelRouters.use('/product-category', ProductCategoryRouter);
        adminPanelRouters.use('/products', ProductRouter);
        adminPanelRouters.use('/Order', OrderRouters)
        adminPanelRouters.use('/story', storyRouter)

//---------------------------Website-----------------------------
    //-------------------Import 
    const { userRegisterRouter } = require('./websites-routers/userRegisteredRouter');
    const { parentCategoryRouterWeb } = require('./websites-routers/activeParentCategoryRouter');
    const { productCategoryWebRouter } = require('./websites-routers/activeProductCategoryRouter');
    const activeproductRouterWeb = require('./websites-routers/activeProductRouter');
    const cartRouter = require('./websites-routers/CartRouters');
    const paymentRouter = require('./websites-routers/PaymentRouter');

    //-------------------------------Api
        websiteRouters.use('/user-register', userRegisterRouter);
        websiteRouters.use('/parent-category', parentCategoryRouterWeb);
        websiteRouters.use('/product-categoryweb', productCategoryWebRouter);
        websiteRouters.use('/products', activeproductRouterWeb);
        websiteRouters.use('/cart', cartRouter);
        websiteRouters.use('/payment', paymentRouter);



//export all adminPanelRouters, websiteRouters and mobileAppRouters
module.exports = {
    adminPanelRouters,
    websiteRouters,
    mobileAppRouters
}

