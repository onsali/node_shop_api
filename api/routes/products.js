const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products'); //import product model

router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })  //exec returns true promise
        .catch (err => {
            console.log(err);  //error for server side
            res.status(500).json({
                error: err //error for client side
            })
        });
});
//arguments from request goes to function which executes a method then parse docs into console and catch; return error along with response codes

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(), 
        name: req.body.name, //get data from request body where key is name
        price: req.body.price
    }); //construct product in mongodb
    product
    .save().
    then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Handler for POST reqests to /products', 
            createdProduct: result
        });
        }) //mongoose method to save in db
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err //err is mongoose default error stored in error object
            });
        });
        
});

router.get('/:productId', (req, res, next) => { //colon is var in express
    const id = req.params.productId; //param
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: 'Not found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}); 

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findByIdAndUpdate(id, {
        $set: req.body
    }, {
        new: true
    }, function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            })
        } else {
            console.log("Result: " + result);
            res.status(200).json(result);
        }
    });
}); 

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}); 


module.exports = router; //allows router to be used globally in other files