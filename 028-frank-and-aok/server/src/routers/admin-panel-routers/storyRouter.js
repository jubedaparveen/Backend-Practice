const express = require('express');
const storyRouter = express.Router();

const multerupload = require('../../middleware/multer');

const { 
    createStoryController, 
    readStoryController
} = require('../../controllers/controllersjunction');

storyRouter.post('/create-story', multerupload, createStoryController);
storyRouter.get('/read-story', readStoryController);



module.exports = storyRouter;