const UserModel = require('../model/userModel');
const AuthMiddleware = require('../middleware/authMiddleware');

class AuthController {
  // 用户注册
  static async register(req, res) {
    try {
      const { username, email, password, phone, address } = req.body;

      // 验证输入
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // 验证密码长度
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long'
        });
      }

      // 验证用户名长度（如果提供）
      if (username && username.length < 3) {
        return res.status(400).json({
          success: false,
          message: 'Username must be at least 3 characters long'
        });
      }

      // 创建用户
      const newUser = await UserModel.create({ 
        username, 
        email, 
        password, 
        phone, 
        address 
      });
      
      // 生成JWT令牌
      const token = AuthMiddleware.generateToken(newUser);
      
      // 返回用户信息和令牌
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: UserModel.getUserInfo(newUser)
      });

    } catch (error) {
      console.error('注册错误:', error);
      
      if (error.message === '用户已存在') {
        return res.status(400).json({
          success: false,
          message: 'This email is already registered'
        });
      }

      if (error.message === '用户名已存在') {
        return res.status(400).json({
          success: false,
          message: 'This username is already taken'
        });
      }
      
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }

  // 用户登录
  static async login(req, res) {
    try {
      const { emailOrUsername, password } = req.body;

      // 验证输入
      if (!emailOrUsername || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email/username and password are required'
        });
      }

      // 查找用户 - 先尝试邮箱，再尝试用户名
      let user = await UserModel.findByEmail(emailOrUsername);
      if (!user) {
        user = await UserModel.findByUsername(emailOrUsername);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User does not exist or incorrect password'
        });
      }

      // 验证密码
      const isValidPassword = await UserModel.validatePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'User does not exist or incorrect password'
        });
      }

      // 生成JWT令牌
      const token = AuthMiddleware.generateToken(user);

      // 返回用户信息和令牌
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: UserModel.getUserInfo(user)
      });

    } catch (error) {
      console.error('登录错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }

  // 获取当前用户信息
  static async getCurrentUser(req, res) {
    try {
      // 中间件已经验证了用户身份并添加了用户信息到req.user
      res.json({
        success: true,
        user: req.user
      });
    } catch (error) {
      console.error('获取用户信息错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }

  // 更新用户信息
  static async updateProfile(req, res) {
    try {
      const { username, email, phone, address } = req.body;
      const userId = req.user.id;

      // 验证邮箱格式
      if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid email format'
          });
        }

        // 检查邮箱是否已被其他用户使用
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser && existingUser.id !== userId) {
          return res.status(400).json({
            success: false,
            message: 'This email is already used by another user'
          });
        }
      }

      // 验证用户名
      if (username) {
        if (username.length < 3) {
          return res.status(400).json({
            success: false,
            message: 'Username must be at least 3 characters long'
          });
        }

        // 检查用户名是否已被其他用户使用
        const existingUsername = await UserModel.findByUsername(username);
        if (existingUsername && existingUsername.id !== userId) {
          return res.status(400).json({
            success: false,
            message: 'This username is already used by another user'
          });
        }
      }

      // 更新用户信息
      const updatedUser = await UserModel.updateUser(userId, { 
        username, 
        email, 
        phone, 
        address 
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: updatedUser
      });

    } catch (error) {
      console.error('更新用户信息错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }

  // 验证令牌
  static async verifyToken(req, res) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token is required'
        });
      }

      const user = await AuthMiddleware.verifyToken(token);

      res.json({
        success: true,
        message: 'Token is valid',
        user
      });

    } catch (error) {
      console.error('验证令牌错误:', error);
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  }

  // 获取所有用户 (开发时用，生产环境应删除)
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.json({
        success: true,
        users
      });
    } catch (error) {
      console.error('获取所有用户错误:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
}

module.exports = AuthController; 