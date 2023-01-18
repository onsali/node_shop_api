const express = require('express');
const app = express();
const morgan = require('morgan'); //middleware for logging functionality in terminal using (next) param

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

//Routes to handle requests
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes);

//Error handling for requests that didn't make it to above routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); //forward error request
})

//Error handling for requests that fail on server side instead of above
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;