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
} = require('../../controllers/controllersjunction');

SizesRouter.post('/add-sizes', addSizesController);
SizesRouter.get('/read-size', readSizeController);
SizesRouter.put('/update-size-status/:_id', UpdateSizeStatusController);
SizesRouter.delete('/single-delete-size:_id', singleDeleteSizeController)
SizesRouter.get('/active-sizes', activeSizesController )



module.exports = SizesRouter;