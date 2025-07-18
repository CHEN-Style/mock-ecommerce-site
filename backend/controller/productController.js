const ProductModel = require('../model/productModel');

class ProductController {
  // 获取所有产品
  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      
      res.json({
        success: true,
        message: 'Products retrieved successfully',
        data: products,
        count: products.length
      });
    } catch (error) {
      console.error('获取产品列表错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while retrieving products'
      });
    }
  }

  // 根据ID获取单个产品
  static async getProductById(req, res) {
    try {
      const { id } = req.params;

      // 验证ID格式
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid product ID'
        });
      }

      const product = await ProductModel.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      res.json({
        success: true,
        message: 'Product retrieved successfully',
        data: product
      });
    } catch (error) {
      console.error('获取产品详情错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while retrieving product'
      });
    }
  }

  // 根据collection获取产品
  static async getProductsByCollection(req, res) {
    try {
      const { collection } = req.params;

      if (!collection) {
        return res.status(400).json({
          success: false,
          message: 'Collection parameter is required'
        });
      }

      const products = await ProductModel.getProductsByCollection(collection);
      
      res.json({
        success: true,
        message: 'Products retrieved successfully',
        data: products,
        count: products.length,
        collection: collection
      });
    } catch (error) {
      console.error('根据collection获取产品错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while retrieving products by collection'
      });
    }
  }
}

module.exports = ProductController; 