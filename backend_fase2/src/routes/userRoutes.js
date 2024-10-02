const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', authMiddleware, userController.registerUser);
router.post('/login', userController.loginUser); 
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
