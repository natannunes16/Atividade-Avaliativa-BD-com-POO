const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.post('/', authMiddleware, productController.uploadImage,  productController.createProduct); 
router.put('/:id', authMiddleware, productController.uploadImage, productController.updateProduct); 
router.delete('/:id', authMiddleware, productController.deleteProduct); 
router.get('/:id', authMiddleware, productController.getProductById); 
router.get('/', authMiddleware, productController.getAllProducts); 

module.exports = router;
