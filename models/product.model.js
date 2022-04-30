const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    image : String,
    description: String,
    price: String
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;