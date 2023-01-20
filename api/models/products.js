//file for models of product for db
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //serial id from mongoose
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);