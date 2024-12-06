const mongoose = require('mongoose');

const parentCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    description:String,
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
parentCategorySchema.pre('save', function(){
    this.created_at = new Date();
});

parentCategorySchema.pre('updateOne', function(){
    this.created_at = new Date();
})

// parent_Category is collection mane
const parentCategoryModel = mongoose.model('parent_Category', parentCategorySchema);

module.exports = parentCategoryModel; 