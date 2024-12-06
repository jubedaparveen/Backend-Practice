const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async (req, res) =>{
    try{
        const data = new ParentCategory(req.body);
        const response = await data.save();

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);

        if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({message: 'category already axists'});
        res.status(500).json({message: 'internal server error'});
    }
};

const readParentCategories = async (req, res) =>{
    try{
        const data = await ParentCategory.find();

        res.status(200).json({message: 'success', data });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const updateParentCategoryStatus = async (req, res) =>{
    try{
       
        const data = await ParentCategory.updateOne(req.params,{
            $set:req.body
        });

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const deleteParentCategory = async (req, res) =>{
    try{
        
        const data = await ParentCategory.deleteOne(req.params);

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server'});
    }
}

const deleteParentCategories = async (req, res) => {
    try{
        console.log(req.body);
        const data = await ParentCategory.deleteMany({_id: {$in: req.body.checkedCategories}});
        res.status(200).json({message: 'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server'});
    }

}

const readParentCategory = async (req, res) =>{
    try{
        const data = await ParentCategory.findOne(req.params);

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const updateParentCatergory = async (req, res) => {
    try{

        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        );

        res.status(200).json({message: 'category updated', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const activeParentCategories = async (req, res) => {
    try{
        const data = await ParentCategory.find({ status: true });

        res.status(200).json({message: 'success', data });
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    createParentCategory,
    readParentCategories,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCatergory,
    activeParentCategories
}