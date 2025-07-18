"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    emailOrUsername: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageLoading, setPageLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // 页面初始加载动画
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // 检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 验证token并获取用户信息
      fetchUserInfo(token);
    }
  }, []);

  // 获取用户信息
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      localStorage.removeItem('token');
    }
  };

  // 处理表单输入
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  // 登录处理
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        emailOrUsername: formData.emailOrUsername,
        password: formData.password
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        setFormData({
          username: '',
          email: '',
          emailOrUsername: '',
          password: '',
          confirmPassword: '',
          phone: '',
          address: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // 注册处理
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address
      });

      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        setFormData({
          username: '',
          email: '',
          emailOrUsername: '',
          password: '',
          confirmPassword: '',
          phone: '',
          address: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setFormData({
      username: '',
      email: '',
      emailOrUsername: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: ''
    });
  };

  // 开屏加载动画
  if (pageLoading) {
    return (
      <div className={`w-full min-h-screen flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center">
          {/* 主要加载动画 */}
          <div className="relative mb-8">
            <div className="w-24 h-24 border-8 border-[#ecd448] border-t-8 border-t-[#cd4c3a] rounded-full animate-spin mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-[#4cc9f0] rounded-full animate-bounce"></div>
            </div>
          </div>
          
          {/* 加载文字 */}
          <h2 className="text-3xl font-bold text-[#cd4c3a] chewy-text animate-pulse">
            Loading...
          </h2>
          
          {/* 点点动画 */}
          <div className="flex justify-center mt-4 space-x-2">
            <div className="w-3 h-3 bg-[#ecd448] rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-3 h-3 bg-[#cd4c3a] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-[#4cc9f0] rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  // 如果用户已登录，显示用户信息
  if (user) {
    return (
      <section className="w-[100%] min-h-screen flex border-t-2 border-black flex-col">
        <div className='animated-background h-[500px] flex flex-col items-center justify-center'>
          <div className='w-full h-[450px] bg-[#cd4c3a] flex flex-col items-center justify-center'>
            <h1 className='luckiest-text text-7xl text-[#fbd576]'>Welcome Back!</h1>
            <p className='chewy-text text-7xl text-[#fde9cc]'>{user.username}</p>
            <button
              onClick={handleLogout}
              className="w-[150px] mt-8 py-3 bg-[#fbd576] hover:bg-[#fde9cc] text-[#cd4c3a] font-bold rounded-full border-2 border-black transition-all duration-300 hover:scale-105 active:scale-95 chewy-text text-lg"
            >
              Log Out
            </button>
          </div>
        </div>
        <div className='w-full h-[500px] flex flex-col items-center justify-center border-t-2 border-black'>

        </div>
      </section>
    );
  }

  // 登录/注册表单
  return (
    <section className="w-full min-h-[700px] flex items-center justify-center p-8 border-t-2 border-b-2 border-black">
      <div className="bg-[#fbd576] p-8 rounded-3xl border-4 border-black max-w-md w-full shadow-2xl">
        <h1 className="text-4xl font-bold text-black text-center mb-8 chewy-text">
          {isLogin ? 'Login' : 'Register'}
        </h1>
        
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          <div className="space-y-4">
            {isLogin ? (
              // 登录表单
              <>
                <input
                  type="text"
                  name="emailOrUsername"
                  placeholder="Email or Username"
                  value={formData.emailOrUsername}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
              </>
            ) : (
              // 注册表单
              <>
                <input
                  type="text"
                  name="username"
                  placeholder="Username (optional)"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text mt-4"
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
                
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
                
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
                
                <input
                  type="text"
                  name="address"
                  placeholder="Address (optional)"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-4 bg-white rounded-full border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
                />
              </>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl luckiest-text">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#cd4c3a] hover:bg-[#c0392b] text-white font-bold rounded-full border-2 border-black transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed chewy-text text-lg"
          >
            {loading ? 'Processing...' : (isLogin ? 'SIGN IN →' : 'SIGN UP →')}
          </button>
        </form>

        <div className="flex justify-between mt-6 text-black">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="underline hover:text-[#4cc9f0] transition-colors duration-300 chewy-text"
          >
            {isLogin ? 'Create an account' : 'Already have account?'}
          </button>
          
          {isLogin && (
            <button
              onClick={() => alert('Forgot password feature coming soon...')}
              className="underline hover:text-[#4cc9f0] transition-colors duration-300 chewy-text"
            >
              Forgot password?
            </button>
          )}
        </div>
      </div>
    </section>
  );
} 