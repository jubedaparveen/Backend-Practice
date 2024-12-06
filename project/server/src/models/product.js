const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    short_description: String,
    thumbnail: String,
    secondary_thumbnail: String,
    images: Object,
    price: Number,
    mrp: Number,
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_categories'
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_categories'
    },
    sizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sizes'
    }],
    colors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors'
    }],
    ifStock: {
        type: Boolean,
        default: true
    },
    brand: String,
    status: {
        type: Boolean,
        default: true
    },
    created_at: Date,
    updated_at: {
        type: Date,
        default: Date.now
    }
});

productSchema.pre('save', function () {
    this.created_at = Date.now;
});

const Product = mongoose.model('products', productSchema);

module.exports = Product