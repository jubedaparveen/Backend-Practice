const ProductCategory = require("../../models/productCategory");

const createProductCategory = async (req, res) => {
    try{
        const data = req.body;

        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        console.log(data)

        const dataToSave = new ProductCategory(data);
        const response = await dataToSave.save();
        console.log(response);
        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const readProductCategories = async (req, res) => {
    try{
        const data = await ProductCategory.find().populate('parent_category');

        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'success', data, filepath });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

const productCategoriesByParentCategory = async (req, res) => {
    try{

        const data = await ProductCategory.find(req.params).populate('parent_category');

        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'success', data, filepath });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    createProductCategory,
    readProductCategories,
    productCategoriesByParentCategory
}