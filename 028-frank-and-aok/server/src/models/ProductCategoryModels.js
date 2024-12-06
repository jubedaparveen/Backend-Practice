const mongoose = require('mongoose');

const ProductCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:String,
    thumbnail:String,
    parent_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent_Category'
    },
    slug: String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
});

//Schema Middleware
ProductCategorySchema.pre('save', function(){
    this.created_at = new Date();
});

ProductCategorySchema.pre('updateOne', function(){
    this.created_at = new Date();
})

// parent_Category is collection mane
const ProductCategoryModel = mongoose.model('Product_Category', ProductCategorySchema);

module.exports = ProductCategoryModel; 