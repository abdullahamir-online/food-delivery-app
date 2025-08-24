const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route to fetch restaurants by category (protected)
router.get('/categories', authMiddleware, restaurantController);

module.exports = router;


