"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import SkeletonLoader from '@/components/SkeletonLoader';

export default function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // 固定的商品描述
  const productDescription = "Discover the perfect blend of quality, functionality, and modern design with our latest offering. This product is crafted to meet the needs of today's fast-paced lifestyle, whether you're looking to upgrade your essentials or explore new possibilities. Engineered with attention to detail and user experience in mind, it delivers reliable performance across a variety of scenarios.\n\nBuilt using high-quality materials and advanced production techniques, this item stands out for its durability, versatility, and ease of use. From casual users to professionals, it adapts to your needs, making everyday tasks more convenient and enjoyable.";

  // 获取商品详情
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/products/${id}`);
        
        if (response.data.success) {
          setItem(response.data.data);
        } else {
          setError('Failed to fetch item');
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError('Error loading item');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  // 生成三张图片用于轮播（使用相关图片模拟）
  const getImageUrls = (imageId) => {
    // 获取当前图片的数字部分
    const currentNum = imageId.replace('img', '');
    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    
    // 确保当前图片在第一位，然后添加两张相关图片
    const otherNums = nums.filter(num => num !== currentNum);
    const selectedNums = [currentNum, ...otherNums.slice(0, 2)];
    
    return selectedNums.map(num => `/goods/img${num}.png`);
  };

  // 数量调整
  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  // 固定1秒加载时间和淡出效果
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowSkeleton(false);
      }, 500); // 淡出动画持续时间
    }, 1000); // 固定显示1秒

    return () => clearTimeout(timer);
  }, []);

  // 显示骨架屏
  if (showSkeleton) {
    return (
      <div className={`${fadeOut ? 'animate-fade-out' : ''}`}>
        <SkeletonLoader type="item" />
      </div>
    );
  }

  if (loading) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center border-t-2 border-black">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#ecd448] border-t-4 border-t-[#cd4c3a] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="chewy-text text-xl text-gray-600">Loading product...</p>
        </div>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center border-t-2 border-black">
        <p className="chewy-text text-xl text-red-600">{error || 'Product not found'}</p>
      </section>
    );
  }

  const images = getImageUrls(item.image_id);

  return (
    <section className="w-full min-h-screen border-t-2 border-black py-8 flex items-center justify-center animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12">
          {/* 左侧 - 商品图片轮播 */}
          <div className="relative flex-1 lg:flex-none lg:w-1/2 flex flex-col items-center justify-center">
            {/* 主图 */}
            <div className="relative aspect-square bg-white rounded-2xl border-2 border-black overflow-hidden mb-4">
              <img 
                src={images[currentImageIndex]} 
                alt={item.info_name}
                className="w-full h-full object-cover"
              />
              
              {/* 导航按钮 */}
              <button 
                onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18l-6-6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18l6-6-6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 图片指示器 */}
            <div className="flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentImageIndex === index ? 'bg-[#cd4c3a]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 右侧 - 商品信息 */}
          <div className="space-y-6 flex-1 lg:flex-none lg:w-1/2">
            {/* 商品标题和价格 */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-black chewy-text mb-4">
                {item.info_name}
              </h1>
              <div className="text-4xl lg:text-5xl font-bold text-black luckiest-text mb-4">
                ${item.info_price}
              </div>
            </div>

            {/* 商品描述 */}
            <div className="space-y-4">
              <div className="text-lg text-gray-700 leading-relaxed">
                {productDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* READ MORE 按钮 */}
              <button className="text-black font-bold underline hover:text-[#cd4c3a] transition-colors">
                READ MORE
              </button>
            </div>

            {/* 数量选择和添加到购物车 */}
            <div className="space-y-4">
              {/* 数量选择器 */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-black rounded-full overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-2 hover:text-[#cd4c3a] transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-2 hover:text-[#cd4c3a] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 添加到购物车按钮 */}
              <button 
                onClick={() => alert("This feature is developing")}
                className="w-full bg-[#cd4c3a] hover:bg-[#b33d2a] text-white font-bold py-4 px-8 rounded-full border-2 border-black transition-colors flex items-center justify-center space-x-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17A2 2 0 0 1 15 19H9A2 2 0 0 1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-lg chewy-text">ADD TO CART</span>
              </button>
            </div>

            {/* 配送信息 */}
            <div className="bg-[#fbd576] p-4 rounded-2xl border-2 border-black space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#cd4c3a] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-black">Pick up at POP Canberra</p>
                  <p className="text-sm text-gray-600">Usually ready in 2 hours</p>
                </div>
              </div>
              
              <hr className="border-dashed border-gray-400" />
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#cd4c3a] rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                    <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-black">Earn POP Points with every purchase</p>
                  <button className="text-sm text-blue-600 underline hover:text-blue-800 transition-colors">
                    Learn more
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ 区域 */}
            <div className="bg-white p-4 rounded-2xl border-2 border-black">
              <button className="w-full flex items-center justify-between text-left">
                <span className="text-lg font-bold">FAQS</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}