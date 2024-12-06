const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
    name:String,
    facebook:String,
    instagram:String,
    youtube:String,
    twitter:String,
    logo:String,
    favicon:String,
    footer_logo:String,
    thumbnail:String,
    email:String,
    password:String,
    created_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
});

adminLoginSchema.pre('save', function(){
    this.created_at = Date.now;
});

adminLoginSchema.pre('insertOne', function(){
    this.created_at =Date.now;
});

const adminLoginModel  = mongoose.model('adminDetails', adminLoginSchema);

module.exports = adminLoginModel;