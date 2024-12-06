const express = require('express');
const { adminPanelRouters, websiteRouters, mobileAppRouters } = require('./routers/routersjunction');

const allRouters = express.Router();

allRouters.use('/admin-panel', adminPanelRouters);
allRouters.use('/website', websiteRouters);
allRouters.use('/mobileApp', mobileAppRouters);

module.exports = allRouters;