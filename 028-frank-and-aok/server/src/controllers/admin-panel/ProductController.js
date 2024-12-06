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
    }
    catch(error){
        console.log(error);
        res.status(500),json({message: 'Internal sarver Error'});
    }
};


module.exports ={
    createProductController
}