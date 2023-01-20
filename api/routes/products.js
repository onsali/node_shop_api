const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products'); //import product model

router.get('/', (req, res, next) => {
    Product.find()
        .select("name price _id") //excluding _v can also do "-_v" when selecting
        .exec()
        .then(docs => { //in mongoose, docs are an instance of a model
            const response = {
                count: docs.length,
                products: docs.map(doc => { //restructuring response to add link to product
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
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
    const product = new Product({ //creating product object and storing in db
        _id: new mongoose.Types.ObjectId(), //executing ObjectId to automatically generate one
        name: req.body.name, //get data from request body where key is name
        price: req.body.price
    }); //construct product 
    product
    .save().
    then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Created product', 
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result.id,
                request: {
                    type: 'GET', 
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
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
        .select("-__v")
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
            console.log("Product updated: " + result);
            res.status(200).json({message: "Product updated", result});
        }
    });
}); 

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({message: "Product deleted",result});
        })
        .catch (err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}); 

module.exports = router; //allows router to be used globally in other files