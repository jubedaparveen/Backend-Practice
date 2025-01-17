const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    short_description: String,
    thumbnail: String,
    secondary_thumbnail: String,
    images: Object,
    price: Number,
    mrp: Number,
    parent_category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'parent_Category'
    },
    Product_Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product_Category'
    },
    brand:String,
    sizes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sizes'
    }],
    color:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Colors_Category'
    }],
    ifStock:{
        type: Boolean,
        default: true
    },
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
ProductSchema.pre('save', function(){
    this.created_at = new Date();
});

ProductSchema.pre('updateOne', function(){
    this.created_at = new Date();
})

// parent_Category is collection name
const ProductModels = mongoose.model('products', ProductSchema);

module.exports = ProductModels; 