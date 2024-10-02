const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, purchaseController.createPurchase);
router.get('/getAll', authMiddleware, purchaseController.getAllPurchases);

module.exports = router;
