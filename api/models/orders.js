//file for models of orders for db
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //serial id from mongoose
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, //create relation to Product model
    quantity: { type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);