const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategoryRoutes');
const productCategoryRouter = require('./admin-panel/productCategoryRoutes');
const adminRouter = require('./admin-panel/admin');
const colorRouter = require('./admin-panel/colorRoutes');
const sizeRouter = require('./admin-panel/sizeRoutes');
const productRouter = require('./admin-panel/productRoutes');
const userRouter = require('./website/userRoutes');

const adminPanelRouter = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();

adminPanelRouter.use('/parent-category', parentCategoryRouter);
adminPanelRouter.use('/product-category', productCategoryRouter);
adminPanelRouter.use('/admin', adminRouter);
adminPanelRouter.use('/colors', colorRouter);
adminPanelRouter.use('/sizes', sizeRouter);
adminPanelRouter.use('/products', productRouter);

websiteRouter.use('/users', userRouter);

module.exports = {
    adminPanelRouter,
    websiteRouter,
    appRouter
}