/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderDetails
 *     responses:
 *       201:
 *         description: Order created successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error while creating order
 * 
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error while retrieving orders
 * 
 * /order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error while retrieving order
 * 
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error while updating order
 * 
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Order not found or cannot be deleted due to relationships
 *       500:
 *         description: Server error while deleting order
 */
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken'); // Make sure to install jsonwebtoken package
const {createOrder, getOrder, getAllOrder, updateOrder, deleteOrder} = require('../services/order');
const config = require('../config/config')

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, config.JWT_SECRET); // Use your JWT secret key
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Apply verifyToken middleware to all routes
router.post('/order', verifyToken, async function(req, res) {
    try {
        const order = await createOrder(req.body);
        res.status(201).send('Order created successfully');
    } catch(error) {
        res.status(500).send('Error creating order');
    }
});

router.get('/order/:id', verifyToken, async function(req, res) {
    try {
        const order = await getOrder(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving order' });
    }
});

router.get('/order', verifyToken, async function(req, res) {
    try {
        const order = await getAllOrder();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving orders' });
    }
});

router.put('/order/:id', verifyToken, async function(req, res) {
    try {
        const order = await updateOrder(req.params.id, req.body);
        res.status(200).send('Order updated successfully');
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
});

router.delete('/order/:id', verifyToken, async (req, res) => {
    try {
        await deleteOrder(req.params.id);
        res.status(200).json("Order deleted successfully.");
    } catch (error) {
        if (error.message.includes('Order not found')) {
            return res.status(404).json({ error: error.message });
        }
        if (error.name == "SequelizeForeignKeyConstraintError") {
            return res.status(404).json({ error: 'This order can not be deleted, because it is being used by many products.' });
        }       
        res.status(500).json({ error: 'Internal server error while deleting order' });
    }
});

module.exports = router;