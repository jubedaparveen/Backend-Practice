
const parentCategoryModel = require("../../models/parentCategoryModels");


const activeParentCategoriesWebController = async (req, res) =>{
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
    activeParentCategoriesWebController
}