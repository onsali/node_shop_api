//file for models of product for db
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //serial id from mongoose
    name: { type: String, required: true },
    price: { type: Number, required: true } //validation check
});

module.exports = mongoose.model('Product', productSchema);