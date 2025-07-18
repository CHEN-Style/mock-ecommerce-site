const UserModel = require('../model/userModel');

class UserController {
  // 获取用户详细信息
  static async getUserProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '用户不存在'
        });
      }

      res.json({
        success: true,
        user: UserModel.getUserInfo(user)
      });
    } catch (error) {
      console.error('获取用户资料错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误'
      });
    }
  }

  // 更新用户密码
  static async updatePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // 验证输入
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: '当前密码和新密码都是必填项'
        });
      }

      // 验证新密码长度
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: '新密码长度至少为6位'
        });
      }

      // 获取用户信息
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '用户不存在'
        });
      }

      // 验证当前密码
      const isValidPassword = await UserModel.validatePassword(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: '当前密码错误'
        });
      }

      // 更新密码
      const updatedUser = await UserModel.updatePassword(userId, newPassword);

      res.json({
        success: true,
        message: '密码更新成功',
        user: UserModel.getUserInfo(updatedUser)
      });
    } catch (error) {
      console.error('更新密码错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误'
      });
    }
  }

  // 删除用户账户
  static async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const { password } = req.body;

      // 验证密码
      if (!password) {
        return res.status(400).json({
          success: false,
          message: '需要输入密码确认删除'
        });
      }

      // 获取用户信息
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: '用户不存在'
        });
      }

      // 验证密码
      const isValidPassword = await UserModel.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: '密码错误'
        });
      }

      // 删除用户（软删除）
      await UserModel.deleteUser(userId);

      res.json({
        success: true,
        message: '账户删除成功'
      });
    } catch (error) {
      console.error('删除账户错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误'
      });
    }
  }

  // 获取用户统计信息
  static async getUserStats(req, res) {
    try {
      const userId = req.user.id;
      
      // 这里可以添加用户统计逻辑，比如：
      // - 订单数量
      // - 购买总额
      // - 收藏商品数量
      // - 评论数量等

      const stats = {
        totalOrders: 0,
        totalSpent: 0,
        favoriteItems: 0,
        reviewsCount: 0,
        accountAge: Math.floor((Date.now() - new Date(req.user.created_at).getTime()) / (1000 * 60 * 60 * 24)) // 天数
      };

      res.json({
        success: true,
        stats
      });
    } catch (error) {
      console.error('获取用户统计错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误'
      });
    }
  }

  // 更新用户头像
  static async updateAvatar(req, res) {
    try {
      const userId = req.user.id;
      const { avatar_url } = req.body;

      if (!avatar_url) {
        return res.status(400).json({
          success: false,
          message: '头像URL是必填项'
        });
      }

      // 更新头像
      const updatedUser = await UserModel.updateUser(userId, { avatar_url });

      res.json({
        success: true,
        message: '头像更新成功',
        user: updatedUser
      });
    } catch (error) {
      console.error('更新头像错误:', error);
      res.status(500).json({
        success: false,
        message: '服务器错误'
      });
    }
  }
}

module.exports = UserController;
