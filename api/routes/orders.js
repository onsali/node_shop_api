const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'GET orders'
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({ //201 http code for successful update
        message: 'POST orders/Created',
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({ 
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({ 
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;