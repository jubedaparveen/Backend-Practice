const mongoose = require('mongoose');

const userRegisterSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    created_at:Date,
    updated_at:{
        type:Date,
        default: Date.now
    }
});

userRegisterSchema.pre('save', function(){
    this.created_at = Date.now;
});

const UserRegisterModel = new mongoose.model('users', userRegisterSchema);

module.exports = UserRegisterModel;