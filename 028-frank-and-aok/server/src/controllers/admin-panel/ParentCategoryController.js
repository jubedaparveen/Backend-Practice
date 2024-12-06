// Admin Panel;

// Parent Category;
const parentCategoryModel = require("../../models/parentCategoryModels");

const ParentCategoryController = async (req, res)=>{
    try{
        const date = req.body;
        const datatoSave = new parentCategoryModel(date);
        const datatoSaveResponse = await datatoSave.save();
        res.status(200).json({message: 'Create Parent Category Successfully', date: datatoSaveResponse});
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({message: 'category already axists'});
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const readParentCategoryController = async (req, res) => {
    try{ 
        const readData = await parentCategoryModel.find()
        res.status(200).json({message: 'success', readData });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const UpdateParentCategoryStatusController = async (req, res) => {
    try{ 
        const data = await parentCategoryModel.updateOne(req.params,{ $set:req.body });
        res.status(200).json({message: 'success', data}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const singleDeleteParentCategoryController = async (req, res) => {
    try{ 
        const data = await parentCategoryModel.deleteOne(req.params);
        res.status(200).json({message : 'Sucess', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const multiDeleteParentCategoryController = async (req, res) => {
    try{ 
        console.log(req.body);
        const data = await parentCategoryModel.deleteMany({_id: {$in: req.body.checkedCategories}});
        res.status(200).json({message: 'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const editReadParentCategoryController = async (req, res) => {
    try{ 
        const data = await parentCategoryModel.findOne(req.params);
        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
};

const editupdataParentCategoryController = async (req, res) => {
    try{
        const data = await parentCategoryModel.updateOne(
            req.params,
            {
                $set: req.body
            }
        );
        res.status(200).json({message : 'category updated', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server error'});
    }
}

// creating relation API between parent-Category and Product-Category
const activeParentCategories = async (req, res) =>{
    try{
        const data = await parentCategoryModel.find({status: true});
        res.status(200).json({message: 'Success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}
module.exports = {
    ParentCategoryController,
    readParentCategoryController,
    UpdateParentCategoryStatusController,
    singleDeleteParentCategoryController,
    multiDeleteParentCategoryController,
    editReadParentCategoryController,
    editupdataParentCategoryController,
    activeParentCategories
}
