const express = require('express');
const multer = require('multer');
// const multerupload = require('../../middleware/multer');

const ColorsRouters = express.Router();
ColorsRouters.use(multer().none());

const { 
    addColorController, 
    readColorController, 
    singleDeleteColorController,
    activeColorsController
} = require('../../controllers/controllersjunction');

ColorsRouters.post('/add-Color', addColorController);
ColorsRouters.get('/read-color', readColorController);
ColorsRouters.delete('/single-delete-color:_id', singleDeleteColorController);
ColorsRouters.get('/active-colors', activeColorsController)

module.exports = ColorsRouters;