const express = require('express');
const multer = require('multer');
const multerupload = require('../../middleware/multer');

const OrderRouters = express.Router();
OrderRouters.use(multer().none());

const { readOrderController } = require('../../controllers/controllersjunction');

OrderRouters.get('/read-order', multerupload, readOrderController);

module.exports = OrderRouters;