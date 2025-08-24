const express = require('express');
const router = express.Router();
const { createOrder , getUserOrders , updateOrderStatus , cancelOrder }  = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new order
router.post('/', authMiddleware,   createOrder);

// Get all orders for a specific user
router.get('/user/orders', authMiddleware,  getUserOrders);

// Update the status of an order
router.put('/:orderId/status', authMiddleware,  updateOrderStatus);

// Cancel an order
router.delete('/:orderId', authMiddleware,  cancelOrder);

module.exports = router;

