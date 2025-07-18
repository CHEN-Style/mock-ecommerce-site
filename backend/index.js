const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// 中间件
app.use(cors());
app.use(express.json()); // 处理 JSON 数据
app.use(express.urlencoded({ extended: true })); // 处理 URL 编码的数据

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Mock E-commerce Backend API',
    version: '1.0.0',
    status: 'Connected to PostgreSQL database',
    endpoints: {
      auth: {
        base: '/api/auth',
        register: '/api/auth/register',
        login: '/api/auth/login',
        me: '/api/auth/me',
        profile: '/api/auth/profile',
        verifyToken: '/api/auth/verify-token',
        users: '/api/auth/users (dev only)'
      },
      user: {
        base: '/api/user',
        profile: '/api/user/profile',
        updatePassword: '/api/user/password',
        updateAvatar: '/api/user/avatar',
        deleteAccount: '/api/user/account',
        stats: '/api/user/stats'
      },
      products: {
        base: '/api/products',
        all: '/api/products',
        byId: '/api/products/:id',
        byCollection: '/api/products/collection/:collection'
      }
    },
    features: {
      authentication: 'JWT based authentication',
      userManagement: 'Full CRUD operations with soft delete',
      productManagement: 'Product catalog with collection support',
      security: 'Password hashing with bcrypt',
      database: 'PostgreSQL with UUID primary keys'
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log('✅ Connected to existing database');
});