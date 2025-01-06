const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    sizes:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sizes',
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colors_Category'
    },
    quantity:{
        type: Number,
        default: 1
    }
});

const CartModel = mongoose.model('carts', cartSchema);

module.exports = CartModel;