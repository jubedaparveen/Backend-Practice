const mongoose = require('mongoose');

const adminPanelSchema = new mongoose.Schema({
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

adminPanelSchema.pre('save', function(){
    this.created_at = Date.now;
});

adminPanelSchema.pre('insertOne', function(){
    this.created_at = Date.now;
});

const adminPanelModel = mongoose.model('admins', adminPanelSchema);

module.exports = adminPanelModel;