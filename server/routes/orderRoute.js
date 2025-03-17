const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authUser')

const { createOrder, getOrders,  getOrderById, getOrderByUserId, getMyOrders } = require('../controllers/orderController')

router.get('/',  authenticateToken ,getOrders);
router.post('/', authenticateToken, createOrder);
// router.get('/:id',authenticateToken, getOrderById);
router.get('/user/:userId', authenticateToken, getOrderByUserId); // get orders by userId
router.get('/myorders', authenticateToken, getMyOrders); // get orders by userId

module.exports = { orderRouter : router}