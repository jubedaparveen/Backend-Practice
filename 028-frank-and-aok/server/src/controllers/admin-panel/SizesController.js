const SizesModel = require('../../models/SizesModels');

// for adding dat to database
const addSizesController = async (req, res) =>{
    try{
        console.log(req.body)
        const data = new SizesModel({
            name: req.body.name,
            sizeorder: req.body.sizeorder
        });
        const response = await data.save();
        console.log('response', response)
        res.status(200).json({message: 'Sizes Added successfully', data: response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

//for get data from database
const readSizeController = async (req, res) =>{

    try{
        const data = await SizesModel.find();
        res.status(200).json({message : 'Success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server Error'});
    }

};

const UpdateSizeStatusController = async (req, res) => {
    try{ 
        const data = await SizesModel.updateOne(req.params,{ $set:req.body });
        res.status(200).json({message: 'success', data}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const singleDeleteSizeController = async (req, res) => {
    try{ 
        const data = await SizesModel.deleteOne(req.params);
        res.status(200).json({message : 'Sucess', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const activeSizesController = async (req, res) => {
    try{
        const response = await SizesModel.find({deleted_at: null, status: true });
        res.status(200).json({message: 'success', data: response});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    addSizesController,
    readSizeController,
    singleDeleteSizeController,
    UpdateSizeStatusController,
    activeSizesController
};