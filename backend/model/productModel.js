const pool = require('../db/db');

class ProductModel {
  // 获取所有产品
  static async getAllProducts() {
    try {
      const query = `
        SELECT 
          id,
          name,
          info_name,
          info_price,
          image_id,
          p1,
          p2,
          other_dec,
          mask,
          show_info,
          collection
        FROM products
        ORDER BY id ASC
      `;
      
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('获取产品列表错误:', error);
      throw error;
    }
  }

  // 根据ID获取单个产品
  static async getProductById(id) {
    try {
      const query = `
        SELECT 
          id,
          name,
          info_name,
          info_price,
          image_id,
          p1,
          p2,
          other_dec,
          mask,
          show_info,
          collection
        FROM products 
        WHERE id = $1
      `;
      
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('获取产品详情错误:', error);
      throw error;
    }
  }

  // 根据collection获取产品
  static async getProductsByCollection(collection) {
    try {
      const query = `
        SELECT 
          id,
          name,
          info_name,
          info_price,
          image_id,
          p1,
          p2,
          other_dec,
          mask,
          show_info,
          collection
        FROM products 
        WHERE collection = $1
        ORDER BY id ASC
      `;
      
      const result = await pool.query(query, [collection]);
      return result.rows;
    } catch (error) {
      console.error('根据collection获取产品错误:', error);
      throw error;
    }
  }
}

module.exports = ProductModel; 