const mongoose = require('mongoose');

const SizesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    sizeorder: {
        type: String,
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
SizesSchema.pre('save', function(){
    this.created_at = new Date();
});

SizesSchema.pre('updateOne', function(){
    this.created_at = new Date();
})

// Sizes is collection mane
const SizesModel = mongoose.model('Sizes', SizesSchema);

module.exports = SizesModel; 