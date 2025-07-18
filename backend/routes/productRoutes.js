const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');

// 公开路由 (不需要认证)
router.get('/', ProductController.getAllProducts);                    // GET /api/products
router.get('/:id', ProductController.getProductById);                 // GET /api/products/:id
router.get('/collection/:collection', ProductController.getProductsByCollection); // GET /api/products/collection/:collection

module.exports = router; 