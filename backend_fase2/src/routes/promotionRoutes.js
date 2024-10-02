const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
 const promotionController = require('../controllers/promotionController');

router.post('/', authMiddleware, promotionController.createPromotion); 
router.put('/:id', authMiddleware, promotionController.updatePromotion); 
router.delete('/:id', authMiddleware, promotionController.deletePromotion); 
router.get('/:id', authMiddleware, promotionController.getPromotionById); 
router.get('/', authMiddleware, promotionController.getAllPromotions); 

module.exports = router;
