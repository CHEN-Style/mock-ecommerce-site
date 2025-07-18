const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');
const AuthMiddleware = require('../middleware/authMiddleware');

// 公开路由 (不需要认证)
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-token', AuthController.verifyToken);

// 受保护路由 (需要认证)
router.get('/me', AuthMiddleware.authenticateToken, AuthController.getCurrentUser);
router.put('/profile', AuthMiddleware.authenticateToken, AuthController.updateProfile);

// 开发时用的路由 (生产环境应删除)
router.get('/users', AuthController.getAllUsers);

module.exports = router; 