const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes); //all incoming requests have to go through this method (middleware)
app.use('/orders', orderRoutes);

module.exports = app;