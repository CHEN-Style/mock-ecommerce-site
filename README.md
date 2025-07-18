# Mock E-commerce Site | 模拟电商网站

[English](#english) | [中文](#中文)

## English

This is a full-stack e-commerce simulation project built with Next.js 13 and Node.js, designed to showcase modern web development skills and techniques.

### 🚀 Project Overview

This project is a **simulation e-commerce website** created for educational and portfolio purposes. It demonstrates proficiency in full-stack development, including responsive design, API integration, and modern UI/UX patterns.

### ✨ Features

- **Product Catalog**: Browse products with filtering and search functionality
- **Product Details**: Detailed product pages with image carousels and purchasing options
- **Category Filtering**: Filter products by categories (Gift Box, Clothing, etc.)
- **Responsive Design**: Optimized for desktop viewing (mobile optimization in progress)
- **Loading States**: Skeleton screens with smooth animations
- **User Authentication**: Login/register functionality (backend ready)
- **Shopping Cart UI**: Add to cart interface (frontend implementation)
- **Modern UI**: Clean, modern design with smooth transitions and animations

### 🛠️ Tech Stack

**Frontend:**
- Next.js 13 (App Router)
- React 18
- Tailwind CSS
- Axios for API calls
- Custom CSS animations

**Backend:**
- Node.js
- Express.js
- MySQL database
- JWT authentication
- RESTful API design

### 📁 Project Structure

```
mock-ecommerce-site/
├── backend/                 # Node.js backend
│   ├── controller/          # API controllers
│   ├── model/              # Database models
│   ├── routes/             # API routes
│   └── middleware/         # Authentication middleware
├── mock-eco/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # Next.js 13 app router
│   │   ├── components/     # Reusable components
│   │   └── data/           # Static data
│   └── public/             # Static assets
```

### 🎯 Key Features Implemented

1. **Product Management**: Complete product catalog with detailed views
2. **Category Filtering**: Dynamic filtering system with URL parameters
3. **Search Functionality**: Real-time product search
4. **Skeleton Loading**: Professional loading states
5. **Smooth Animations**: Page transitions and hover effects
6. **Responsive Components**: Mobile-friendly design patterns
7. **API Integration**: Full backend API integration
8. **User Interface**: Modern, clean, and intuitive design

---

## 中文

这是一个使用 Next.js 13 和 Node.js 构建的全栈电商模拟项目，旨在展示现代网络开发技能和技术。

### 🚀 项目概述

本项目是一个**模拟电商网站**，专为教育和作品集目的而创建。它展示了全栈开发能力，包括响应式设计、API 集成和现代 UI/UX 模式。

### ✨ 功能特性

- **商品目录**：浏览带有过滤和搜索功能的商品
- **商品详情**：带有图片轮播和购买选项的详细商品页面
- **分类过滤**：按类别过滤商品（礼品盒、服装等）
- **响应式设计**：针对桌面浏览优化（移动端优化开发中）
- **加载状态**：带有流畅动画的骨架屏
- **用户认证**：登录/注册功能（后端已准备）
- **购物车界面**：添加到购物车界面（前端实现）
- **现代界面**：简洁、现代的设计，带有流畅的过渡和动画

### 🛠️ 技术栈

**前端：**
- Next.js 13 (App Router)
- React 18
- Tailwind CSS
- Axios 用于 API 调用
- 自定义 CSS 动画

**后端：**
- Node.js
- Express.js
- MySQL 数据库
- JWT 认证
- RESTful API 设计

### 📁 项目结构

```
mock-ecommerce-site/
├── backend/                 # Node.js 后端
│   ├── controller/          # API 控制器
│   ├── model/              # 数据库模型
│   ├── routes/             # API 路由
│   └── middleware/         # 认证中间件
├── mock-eco/               # Next.js 前端
│   ├── src/
│   │   ├── app/            # Next.js 13 应用路由
│   │   ├── components/     # 可重用组件
│   │   └── data/           # 静态数据
│   └── public/             # 静态资源
```

### 🎯 已实现的关键功能

1. **商品管理**：完整的商品目录和详细视图
2. **分类过滤**：带有 URL 参数的动态过滤系统
3. **搜索功能**：实时商品搜索
4. **骨架加载**：专业的加载状态
5. **流畅动画**：页面过渡和悬停效果
6. **响应式组件**：移动友好的设计模式
7. **API 集成**：完整的后端 API 集成
8. **用户界面**：现代、简洁、直观的设计

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started | 开始使用

### English

#### Prerequisites
- Node.js 18+ 
- npm or yarn
- MySQL database

#### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mock-ecommerce-site
   ```

2. **Install frontend dependencies**
   ```bash
   cd mock-eco
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up the database**
   - Create a MySQL database
   - Update database configuration in `backend/db/db.js`

5. **Run the backend server**
   ```bash
   cd backend
   npm start
   ```

6. **Run the frontend development server**
   ```bash
   cd mock-eco
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 中文

#### 前置要求
- Node.js 18+
- npm 或 yarn
- MySQL 数据库

#### 安装步骤

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd mock-ecommerce-site
   ```

2. **安装前端依赖**
   ```bash
   cd mock-eco
   npm install
   ```

3. **安装后端依赖**
   ```bash
   cd ../backend
   npm install
   ```

4. **设置数据库**
   - 创建 MySQL 数据库
   - 更新 `backend/db/db.js` 中的数据库配置

5. **运行后端服务器**
   ```bash
   cd backend
   npm start
   ```

6. **运行前端开发服务器**
   ```bash
   cd mock-eco
   npm run dev
   ```

7. **打开浏览器**
   访问 [http://localhost:3000](http://localhost:3000)

### 📝 Usage Notes | 使用说明

**English:**
- The website is optimized for desktop viewing
- Mobile responsiveness is currently under development
- Backend API runs on port 4000 by default
- Frontend development server runs on port 3000

**中文：**
- 该网站针对桌面浏览进行了优化
- 移动端响应式目前正在开发中
- 后端 API 默认运行在 4000 端口
- 前端开发服务器运行在 3000 端口

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load custom fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## API Endpoints | API 接口

### English

**Products API:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/collection/:collection` - Get products by collection

**Authentication API:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### 中文

**商品 API：**
- `GET /api/products` - 获取所有商品
- `GET /api/products/:id` - 根据 ID 获取商品
- `GET /api/products/collection/:collection` - 根据集合获取商品

**认证 API：**
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/verify` - 验证 JWT 令牌

## 🚨 Disclaimer | 免责声明

### English

**This is a simulation project for educational and portfolio purposes only.**

- Not intended for commercial use
- No real transactions or payments are processed
- Product images and descriptions are for demonstration only
- User data is handled for development purposes only
- This project showcases technical skills and is not a real e-commerce platform

### 中文

**这是一个仅用于教育和作品集目的的模拟项目。**

- 不用于商业用途
- 不处理真实交易或付款
- 商品图片和描述仅用于演示
- 用户数据仅用于开发目的
- 此项目展示技术技能，不是真正的电商平台

## 📄 License | 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 👥 Contributing | 贡献

### English

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 中文

欢迎贡献！请随时提交 Pull Request。

1. Fork 项目
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 Contact | 联系方式

If you have any questions about this project, feel free to reach out!

如果您对此项目有任何疑问，请随时联系！

**Email:** ChenStyle2022@gmail.com

---

## Deploy on Vercel | 部署到 Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

部署 Next.js 应用程序的最简单方法是使用 Next.js 创建者提供的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看我们的 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。
