const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    bannerimg: String,
    description: String,
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

StorySchema.pre('save', function(){
    this.created_at = new Date();
});

StorySchema.pre('updateOne', function(){
    this.created_at = new Date();
});

const StoryModel = mongoose.model('story', StorySchema);

module.exports = StoryModel;