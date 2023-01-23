const express = require('express');
const router = express.Router();
const auth = require('../auth/auth')

const OrdersController = require('../controllers/orders');

router.get('/', auth, OrdersController.orders_get_all);

router.post('/', auth, OrdersController.orders_post);

router.get('/:orderId', auth, OrdersController.orders_get_single);

router.delete('/:orderId', auth, OrdersController.orders_delete);

module.exports = router;