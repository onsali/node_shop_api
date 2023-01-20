const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders'); //import orders model
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Order
        .find()
        .select('-__v')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quanity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
        Product.findById(req.body.productId) 
            .then(product => {
                if (!product) { //validation check
                    return res.status(404).json({
                        message: "Product not found"
                    });
                }
                const order = new Order({ //creating order object
                    _id: mongoose.Types.ObjectId(), //executing ObjectId to automatically generate one
                    quantity: req.body.quantity,
                    product: req.body.productId
                });
                return order
                    .save() //store in db
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Order stored',
                            createdOrder: {
                                id: result._id,
                                product: result.product,
                                quantity: result.quantity
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
            })
            .catch(err => {
                res.status(500).json({
                    message: "Product not found",
                    error: err
                });
            })
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            order: order
        })
    })
    .catch(err =>
        res.status(500).json({
            error: err
        }));
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Order deleted"
        })
    })
    .catch(err =>
        res.status(500).json({
            error: err
        }));
});

module.exports = router;