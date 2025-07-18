const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const AuthMiddleware = require('../middleware/authMiddleware');

// 所有用户路由都需要认证
router.use(AuthMiddleware.authenticateToken);

// 用户信息相关
router.get('/profile', UserController.getUserProfile);
router.put('/password', UserController.updatePassword);
router.put('/avatar', UserController.updateAvatar);
router.delete('/account', UserController.deleteAccount);
router.get('/stats', UserController.getUserStats);

module.exports = router;
