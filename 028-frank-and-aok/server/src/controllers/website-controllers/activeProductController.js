const ProductModels = require("../../models/ProductModels");

const activeProductsByParentCategory = async(req, res) =>{
    try{
        const data = await ProductModels.find({parent_category: req.params.parent_category, status: true})
        .populate('parent_category')
        .populate('Product_Category')
        .populate('sizes')
        .populate('color');

        const filepath = `${req.protocol}://${req.get('host')}/frank-and-oak-files/`

        res.status(200).json({message: 'success', data, filepath});
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {
    activeProductsByParentCategory
}