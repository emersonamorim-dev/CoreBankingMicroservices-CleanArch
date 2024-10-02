const express = require('express');
const PaymentController = require('../controllers/PaymentController'); 

const router = express.Router();

router.post('/payments', PaymentController.createPayment); 

module.exports = router;

