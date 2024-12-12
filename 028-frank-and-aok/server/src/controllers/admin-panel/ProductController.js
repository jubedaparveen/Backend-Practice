const { json } = require('express');
const ProductModel = require('../../models/ProductModels');

const createProductController = async (req, res) =>{
    try{
        const data = req.body;

        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;

            if(req.files.secondary_thumbnail) data.secondary_thumbnail = req.files.secondary_thumbnail[0].filename;

            if(req.files.images) data.images = req.files.images.map((image)=> image.filename);
        }
        const datasave = new ProductModel(data);
        const response = await datasave.save();

        console.log(response);
        res.status(200).json({message: 'Procuct Added Successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal sarver Error'});
    }
};

const readProductController = async (req, res) =>{

    try{
        const data = await ProductModel.find().populate('parent_category', 'Product_Category', 'Sizes', 'Colors_Category');
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'Product Added in Veiw Page successflly', data, filepath });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
};

const updateStatusProductController = async (req, res) =>{
    try{
        const data = await ProductModel.updateOne(req.params, {$set : req.body});
        res.status(200).json({message : 'Product Status Updated Successfully', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    };
};

const singleDeleteProductController = async (req, res) =>{
    try{
        const data = await ProductModel.deleteOne(req.params);
        res.status(200).json({message:'Product Deleted Seccessfully', data})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'Internal Server Error'});
    }
};

const editReadProductController = async (req, res) =>{
    try{
        console.log(req.params)
        const data = await ProductModel.findOne(req.params);
        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'Edited Data Updated successfully', data:'', filepath:''});
        // console.log(data);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports ={
    createProductController,
    readProductController,
    updateStatusProductController,
    singleDeleteProductController,
    editReadProductController
}