const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
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

categorySchema.pre('save', function(){
    this.created_at = new Date();
});

categorySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

const ParentCategory = mongoose.model('parent_categories', categorySchema);

module.exports = ParentCategory;