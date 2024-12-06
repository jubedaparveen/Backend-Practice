const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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

adminSchema.pre('save', function(){
    this.created_at = Date.now;
});
adminSchema.pre('insertOne', function(){
    this.created_at = Date.now;
});

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;