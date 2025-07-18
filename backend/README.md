# Mock E-commerce Backend

基于 Node.js + Express + PostgreSQL 构建的电商后端 API，使用 JWT 进行用户认证。

## 🚀 功能特点

- 用户注册和登录（支持用户名或邮箱登录）
- JWT 认证
- 密码哈希加密
- PostgreSQL 数据库
- RESTful API 设计
- MVC 架构模式
- 软删除用户
- 用户资料管理（头像、电话、地址）
- UUID 主键

## 📋 环境要求

- Node.js 14+
- PostgreSQL 12+

## 🛠️ 安装步骤

1. **安装依赖**
```bash
npm install
```

2. **配置数据库**
- 创建 PostgreSQL 数据库
- 执行以下 SQL 创建用户表：

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active',
  reset_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. **创建 `.env` 文件**
在根目录创建 `.env` 文件，配置如下：

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=mock_ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

4. **启动服务器**
```bash
npm start
```

服务器将在 `http://localhost:4000` 启动

## 📚 API 端点

### 认证相关 (`/api/auth`)

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息 (需要认证)
- `PUT /api/auth/profile` - 更新用户资料 (需要认证)
- `POST /api/auth/verify-token` - 验证 JWT 令牌
- `GET /api/auth/users` - 获取所有用户 (仅开发环境)

### 用户相关 (`/api/user`)

- `GET /api/user/profile` - 获取用户详细信息 (需要认证)
- `PUT /api/user/password` - 更新密码 (需要认证)
- `PUT /api/user/avatar` - 更新头像 (需要认证)
- `DELETE /api/user/account` - 删除账户 (需要认证)
- `GET /api/user/stats` - 获取用户统计信息 (需要认证)

### 请求示例

**注册**
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "123-456-7890",
    "address": "123 Main St"
  }'
```

**登录 (邮箱)**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "john@example.com",
    "password": "password123"
  }'
```

**登录 (用户名)**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "john_doe",
    "password": "password123"
  }'
```

**获取用户信息**
```bash
curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**更新密码**
```bash
curl -X PUT http://localhost:4000/api/user/password \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
  }'
```

**更新头像**
```bash
curl -X PUT http://localhost:4000/api/user/avatar \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "avatar_url": "https://example.com/avatar.jpg"
  }'
```

## 🗂️ 项目结构

```
backend/
├── controller/          # 控制器
│   ├── authController.js
│   └── userController.js
├── middleware/          # 中间件
│   └── authMiddleware.js
├── model/              # 数据模型
│   └── userModel.js
├── routes/             # 路由
│   ├── authRoutes.js
│   └── userRoutes.js
├── db/                 # 数据库配置
│   └── db.js
├── index.js            # 服务器入口
├── package.json
└── README.md
```

## 🔒 数据库字段

### users 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键，自动生成 |
| username | TEXT | 用户名，必填 |
| email | TEXT | 邮箱，必填且唯一 |
| password | TEXT | 密码哈希，必填 |
| phone | TEXT | 电话号码，可选 |
| address | TEXT | 地址，可选 |
| avatar_url | TEXT | 头像URL，可选 |
| is_admin | BOOLEAN | 是否管理员，默认false |
| status | TEXT | 用户状态，默认'active' |
| reset_token | TEXT | 重置密码令牌，可选 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 🔒 安全特性

- 密码使用 bcrypt 哈希加密
- JWT 令牌认证
- 输入验证和格式检查
- 软删除（用户状态设置为 'inactive'）
- CORS 配置
- 环境变量保护敏感信息
- 防止重复邮箱和用户名注册

## 🐛 故障排除

1. **数据库连接失败**
   - 检查 PostgreSQL 服务是否运行
   - 验证 `.env` 文件中的数据库配置
   - 确认数据库和用户权限

2. **用户表不存在**
   - 确保已执行 SQL 语句创建用户表
   - 检查表结构是否正确

3. **JWT 令牌无效**
   - 检查 `JWT_SECRET` 是否正确配置
   - 确认令牌格式为 `Bearer <token>`

4. **端口冲突**
   - 修改 `.env` 文件中的 `PORT` 值

## 📝 开发说明

- 使用 UUID 作为主键，提供更好的分布式支持
- 支持通过邮箱或用户名登录
- 软删除机制，避免数据丢失
- 使用 `nodemon` 进行开发时的自动重启
- 生产环境需要移除 `/api/auth/users` 端点
- 所有用户相关操作都需要认证
- 密码更新需要验证当前密码 