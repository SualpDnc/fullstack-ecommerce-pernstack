const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/checkoutController');

// Sahte ödeme ile sipariş oluştur
router.post('/place-order', placeOrder);

module.exports = router;

