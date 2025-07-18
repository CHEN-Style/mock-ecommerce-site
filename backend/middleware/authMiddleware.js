const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');

class AuthMiddleware {
  // JWT密钥
  static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
  
  // 生成JWT令牌
  static generateToken(user) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email 
      },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // 验证JWT令牌
  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET);
      const user = await UserModel.findById(decoded.id);
      
      if (!user) {
        throw new Error('用户不存在');
      }

      return UserModel.getUserInfo(user);
    } catch (error) {
      throw new Error('无效的令牌');
    }
  }

  // 认证中间件 - 验证请求中的令牌
  static async authenticateToken(req, res, next) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: '访问令牌缺失'
        });
      }

      const user = await AuthMiddleware.verifyToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: '无效的访问令牌'
      });
    }
  }
}

module.exports = AuthMiddleware;
