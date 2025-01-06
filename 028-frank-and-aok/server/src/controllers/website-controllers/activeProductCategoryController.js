const ProductCategoryModel = require("../../models/ProductCategoryModels");

const activeProductCategoryWebController = async (req, res) => {
    try{
        const data = await ProductCategoryModel.find({status: true}).populate('parent_category');

        const filepath = `${req.protocol}://${req.get('host')}/fran-and-oak-admin-files/`;
        res.status(200).json({message: 'success', data, filepath });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:'internal server error'});
    }
};

module.exports ={
    activeProductCategoryWebController
}