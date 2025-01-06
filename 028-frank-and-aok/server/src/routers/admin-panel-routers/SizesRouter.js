const express = require('express');
const multer = require('multer');

//Initialise router only
const SizesRouter = express.Router();
// Initialise Multer for form read without file input field
SizesRouter.use(multer().none());

const { 
    addSizesController, 
    readSizeController, 
    UpdateSizeStatusController,
    singleDeleteSizeController,
    activeSizesController,
    readEditSizeController,
    editUpdateSizeController,
    multiDeleteController,
} = require('../../controllers/controllersjunction');

SizesRouter.post('/add-sizes', addSizesController);
SizesRouter.get('/read-size', readSizeController);// view page

SizesRouter.put('/update-size-status/:_id', UpdateSizeStatusController);

SizesRouter.get('/read-edit-size/:_id', readEditSizeController);
SizesRouter.put('/edit-update-size/:_id', editUpdateSizeController);

SizesRouter.delete('/single-delete-size:_id', singleDeleteSizeController);
SizesRouter.put('/multi-delete', multiDeleteController)
SizesRouter.get('/active-sizes', activeSizesController );



module.exports = SizesRouter;