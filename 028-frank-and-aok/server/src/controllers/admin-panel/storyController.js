const StoryModel = require('../../models/storyModel');

const createStoryController = async (req, res) =>{
    try{
        const data = req.body;
        if(req.files){
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.bannerimg) data.bannerimg = req.files.bannerimg.filename;
        }
        console.log(data)
        const datasave = new StoryModel(data)
        const response = await datasave.save();
        console.log(response);
        res.status(200).json({message : 'Story Added Successsfully', data : response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

const readStoryController = async (req, res) =>{
    try{
        const data = await StoryModel.find();
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak/`;
        res.status(200).json({message: 'read Story Data Successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

module.exports = {
    createStoryController,
    readStoryController
}