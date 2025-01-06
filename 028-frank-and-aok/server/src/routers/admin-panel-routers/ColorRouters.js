const express = require('express');
const multer = require('multer');
// const multerupload = require('../../middleware/multer');

const ColorsRouters = express.Router();
ColorsRouters.use(multer().none());

const { 
    addColorController, 
    readColorController, 
    updateColorStatusController,
    singleDeleteColorController,
    activeColorsController,
    readEditColorController,
    multiDeleteColorController,
    updateEditColorController,
} = require('../../controllers/controllersjunction');

ColorsRouters.post('/add-Color', addColorController); // Add Color
ColorsRouters.get('/read-color', readColorController); // view color

ColorsRouters.put('/update-color-status/:_id', updateColorStatusController); // update status

ColorsRouters.get('/read-edit-color/:_id', readEditColorController)// read data for view page
ColorsRouters.put('/update-edit-color/:_id', updateEditColorController)

ColorsRouters.delete('/single-delete-color:_id', singleDeleteColorController); // single delete
ColorsRouters.put('/multi-delete-color', multiDeleteColorController)

ColorsRouters.get('/active-colors', activeColorsController); // for active color

module.exports = ColorsRouters;