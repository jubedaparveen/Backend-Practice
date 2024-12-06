const mongoose = require('mongoose');

const ForgetPasswordSchema = new mongoose.Schema({
    email:String,
    newpassword:String,
    confirmpassword:String,
    created_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
});

ForgetPasswordSchema.pre('save', function(){
    this.created_at = Date.now;
});

ForgetPasswordSchema.pre('insertOne', function(){
    this.created_at =Date.now;
});

const ForgetPasswordModel  = mongoose.model('ForgetPassword', ForgetPasswordSchema);

module.exports = ForgetPasswordModel;
