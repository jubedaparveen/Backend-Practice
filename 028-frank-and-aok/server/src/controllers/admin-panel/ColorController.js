const ColorsModel = require("../../models/ColorModels");

const addColorController = async (req, res) =>{
    try{
        console.log(req.body, 'data');
        const data = new ColorsModel(req.body);
        // console.log(data);
        const response = await data.save();
        console.log(response);
        res.status(200).json({message: 'Add Color Successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const readColorController = async (req, res) => {
    try{ 
        const data = await ColorsModel.find()
        console.log(data);
        res.status(200).json({message: 'View Colors successfully', data });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const updateColorStatusController = async (req, res) =>{
    try{
        const data = await ColorsModel.updateOne(req.params, {$set:req.body});
        res.status(200).json({message: 'Update Status Successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

const readEditColorController = async (req, res) =>{
    try{
        const data = await ColorsModel.findOne(req.params);
        res.status(200).json({message: 'Read Data Successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Errror'});
    }
};

const updateEditColorController = async (req, res) =>{
    try{
        const data = await ColorsModel.updateOne(req.params, {$set:req.body});
        res.status(200).json({message: 'Color Updated Successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal server Error'})
    }
};

const singleDeleteColorController = async (req, res) => {
    try{ 
        const data = await ColorsModel.deleteOne(req.params);
        res.status(200).json({message : 'Sucess', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const multiDeleteColorController = async (req, res) =>{
    try{
        const data = await SizesModel.deleteMany({_id: {$in: req.body.checkedBox}});
        res.status(200).json({message: 'All Checked Box Delete Successfully'})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'})
    }
};

const activeColorsController = async (req, res) => {
    try { 
        const response = await ColorsModel.find({deleted_at:null, status:true});
        console.log(response);
        res.status(200).json({message: 'success', data: response });
     }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}




module.exports = {
    addColorController,
    readColorController,
    singleDeleteColorController,
    activeColorsController,
    updateColorStatusController,
    readEditColorController,
    multiDeleteColorController,
    updateEditColorController
};