const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:String,
    thumbnail:String,
    parent_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categories'
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

categorySchema.pre('save', function(){
    this.created_at = new Date();
});

categorySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

const ProductCategory = mongoose.model('product_category', categorySchema);

module.exports = ProductCategory;