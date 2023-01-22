const express = require('express');
const app = express();
const morgan = require('morgan'); //middleware for logging functionality in terminal using (next) param
const bodyParser = require('body-parser'); //package for parsing body content of requests
const mongoose = require('mongoose'); //package for working with mongodb

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://admin:toor@cluster0.1hgonkn.mongodb.net/?retryWrites=true&w=majority', //hardcoded mongodb key :)
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); //hardcoded mongodb connection

//everything after app.use is middleware

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); //makes folder publicly available
//parse url, and json encoded data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//set CORS header allowing all origins. RESTful API's usually are lax with CORS to allow wider implementation of API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    //preflight request
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next(); //go to routes
});


//Routes to handle requests
app.use('/products', productRoutes); 
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

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