const ProductCategoryModel = require('../../models/ProductCategoryModels');

// For Add Product in Product Category list
const createProductCategoryController = async (req, res) =>{
    try{
        const data = req.body;
        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        console.log(data)
        const datasave = new ProductCategoryModel(data);
        const response = await datasave.save();
        console.log(response);
        res.status(200).json({massage: 'Successfully Create Product Category', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};
// get data from database
const readProductCategoryController = async (req, res) =>{
    try{
        const data = await ProductCategoryModel.find().populate('parent_category');
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'success', data, filepath });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const StatusUpdateProductCategoryController = async (req, res) =>{
    try{
        
        const data = await ProductCategoryModel.updateOne(req.params, { $set:req.body });
        res.status(200).json({message: 'Status Update successfully', data}); 
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }

};

const singleDeleteProductCategoryController = async (req, res) => {
    try{ 
        const data = await ProductCategoryModel.deleteOne(req.params);
        res.status(200).json({message : 'Sucess', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const multiDeleteProductCategoryController = async (req, res) => {
    try{ 
        console.log(req.body);
        const data = await ProductCategoryModel.deleteMany({_id: {$in: req.body.checkedCategories}});
        res.status(200).json({message: 'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'})
    }
};

const editReadProductCategoryController = async (req, res) =>{
    try{
        const data = await ProductCategoryModel.findOne(req.params);
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'Edited Data Updated successfully', data, filepath});
    }
    catch{
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const editupdataProductCategoryController = async (req, res) => {
    try{
        const data = req.body;
        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        console.log('data',data)
        // const datasave =  ProductCategoryModel(data);
        console.log( req.params, 'params')
        const response = await ProductCategoryModel.updateOne(
            req.params,
            {
                $set: data
            }
        );
        console.log(response);
        res.status(200).json({massage: 'Successfully Update Product Category', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server error'});
    }
}

// product Categories By ParentCategory 
const productCategoriesByParentCategory = async (req, res) => {
    try{
        const data = await ProductCategoryModel.find(req.params).populate('parent_category');
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'success', data, filepath });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports ={
    createProductCategoryController,
    readProductCategoryController,
    StatusUpdateProductCategoryController,
    singleDeleteProductCategoryController,
    editReadProductCategoryController,
    editupdataProductCategoryController,
    multiDeleteProductCategoryController,
    productCategoriesByParentCategory
}