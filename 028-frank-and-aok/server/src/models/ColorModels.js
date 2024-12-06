const mongoose = require('mongoose');

const ColorsSchema = new mongoose.Schema({
    color:{type:String},
    colorcode:{type:String},
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
ColorsSchema.pre('save', function(){
    this.created_at = new Date();
});

ColorsSchema.pre('updateOne', function(){
    this.created_at = new Date();
})

// parent_Category is collection name
const ColorsModel = mongoose.model('Colors_Category', ColorsSchema);

module.exports = ColorsModel; 