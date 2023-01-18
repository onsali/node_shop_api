const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handler for GET reqests to /products' 
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }; //get name and price from request params and store in prodcut
    res.status(201).json({
        message: 'Handler for POST reqests to /products', 
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => { //colon is var in express
    const id = req.params.productId; //param
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special param',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
}); 

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated the product'
    });
}); 

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted the product'
    });
}); 


module.exports = router; //allows router to be used globally in other files