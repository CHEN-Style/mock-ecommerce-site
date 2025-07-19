// API配置文件
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.NEXT_PUBLIC_API_BASE_URL 
  : (process.env.NEXT_PUBLIC_DEV_API_BASE_URL || 'http://localhost:4000');

export default API_BASE_URL; 