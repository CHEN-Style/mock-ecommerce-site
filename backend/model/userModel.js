const pool = require('../db/db');
const bcrypt = require('bcryptjs');

class UserModel {
  // 创建用户
  static async create(userData) {
    const { username, email, password, phone, address } = userData;
    
    try {
      // 检查用户是否已存在
      const existingUser = await this.findByEmail(email);
      if (existingUser) {
        throw new Error('用户已存在');
      }

      // 检查用户名是否已存在
      if (username) {
        const existingUsername = await this.findByUsername(username);
        if (existingUsername) {
          throw new Error('用户名已存在');
        }
      }

      // 哈希密码
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 插入新用户
      const query = `
        INSERT INTO users (username, email, password, phone, address, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
        RETURNING id, username, email, phone, address, created_at, is_admin, status
      `;
      
      const result = await pool.query(query, [
        username || email.split('@')[0], // 如果没有username，使用email前缀
        email,
        hashedPassword,
        phone || null,
        address || null
      ]);
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // 根据邮箱查找用户
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM users WHERE email = $1 AND status = $2';
      const result = await pool.query(query, [email, 'active']);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // 根据用户名查找用户
  static async findByUsername(username) {
    try {
      const query = 'SELECT * FROM users WHERE username = $1 AND status = $2';
      const result = await pool.query(query, [username, 'active']);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // 根据ID查找用户
  static async findById(id) {
    try {
      const query = 'SELECT * FROM users WHERE id = $1 AND status = $2';
      const result = await pool.query(query, [id, 'active']);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // 更新用户信息
  static async updateUser(id, updates) {
    try {
      const { username, email, phone, address, avatar_url } = updates;
      
      let query = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP';
      let params = [];
      let paramIndex = 1;

      if (username) {
        query += `, username = $${paramIndex}`;
        params.push(username);
        paramIndex++;
      }

      if (email) {
        query += `, email = $${paramIndex}`;
        params.push(email);
        paramIndex++;
      }

      if (phone !== undefined) {
        query += `, phone = $${paramIndex}`;
        params.push(phone);
        paramIndex++;
      }

      if (address !== undefined) {
        query += `, address = $${paramIndex}`;
        params.push(address);
        paramIndex++;
      }

      if (avatar_url !== undefined) {
        query += `, avatar_url = $${paramIndex}`;
        params.push(avatar_url);
        paramIndex++;
      }

      query += ` WHERE id = $${paramIndex} AND status = 'active' RETURNING id, username, email, phone, address, avatar_url, created_at, updated_at, is_admin, status`;
      params.push(id);

      const result = await pool.query(query, params);
      return this.getUserInfo(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  // 更新密码
  static async updatePassword(id, newPassword) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const query = `
        UPDATE users 
        SET password = $1, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $2 AND status = 'active' 
        RETURNING id, username, email
      `;
      
      const result = await pool.query(query, [hashedPassword, id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // 验证密码
  static async validatePassword(plainPassword, hashedPassword) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw error;
    }
  }

  // 获取所有用户 (开发时用，生产环境应删除)
  static async getAllUsers() {
    try {
      const query = `
        SELECT id, username, email, phone, address, avatar_url, created_at, updated_at, is_admin, status 
        FROM users 
        WHERE status = 'active' 
        ORDER BY created_at DESC
      `;
      const result = await pool.query(query);
      return result.rows.map(user => this.getUserInfo(user));
    } catch (error) {
      throw error;
    }
  }

  // 获取用户信息（不包含密码）
  static getUserInfo(user) {
    if (!user) return null;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      avatar_url: user.avatar_url,
      is_admin: user.is_admin,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  // 软删除用户（将状态设置为inactive）
  static async deleteUser(id) {
    try {
      const query = `
        UPDATE users 
        SET status = 'inactive', updated_at = CURRENT_TIMESTAMP 
        WHERE id = $1 AND status = 'active' 
        RETURNING id, username, email
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // 设置重置密码令牌
  static async setResetToken(email, token) {
    try {
      const query = `
        UPDATE users 
        SET reset_token = $1, updated_at = CURRENT_TIMESTAMP 
        WHERE email = $2 AND status = 'active' 
        RETURNING id, username, email
      `;
      const result = await pool.query(query, [token, email]);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // 通过重置令牌查找用户
  static async findByResetToken(token) {
    try {
      const query = 'SELECT * FROM users WHERE reset_token = $1 AND status = $2';
      const result = await pool.query(query, [token, 'active']);
      return result.rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // 清除重置令牌
  static async clearResetToken(id) {
    try {
      const query = `
        UPDATE users 
        SET reset_token = NULL, updated_at = CURRENT_TIMESTAMP 
        WHERE id = $1 AND status = 'active'
      `;
      await pool.query(query, [id]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
