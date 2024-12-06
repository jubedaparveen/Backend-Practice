const Product = require("../../models/product");

const createProduct = async (req, res) => {
    try{
        const data = req.body;

        // data.sizes = JSON.parse(data.sizes);
        // data.colors = JSON.parse(data.colors);

        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if(req.files.secondary_thumbnail) data.secondary_thumbnail = req.files.secondary_thumbnail[0].filename;
            if(req.files.images) data.images = req.files.images.map((image)=> image.filename);
        }

        const dataToSave = new Product(data);

        const response = await dataToSave.save();

        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = {
    createProduct
}