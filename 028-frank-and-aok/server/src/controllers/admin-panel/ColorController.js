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
        res.status(200).json({message: 'success', data });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
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


const activeColorsController = async (req, res) => {
    try { 
        const response = await ColorsModel.find({deleted_at:null, status:true});
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
    activeColorsController
};