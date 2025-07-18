const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false // RDS 公共证书自动接受
  }
});

pool.connect()
  .then(() => console.log('✅ PostgreSQL connected successfully'))
  .catch((err) => console.error('❌ PostgreSQL connection error:', err));

module.exports = pool;