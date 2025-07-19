"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products = [], height = 400, prioritizeFirst = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 计算每个商品单位的宽度（商品宽度 + 间距）
  const itemWidth = 280; // 商品卡片宽度
  const gap = 20; // 商品之间的间距
  const leftGap = 5; // 最左边的gap
  const totalItemWidth = itemWidth + gap;
  
  // 视窗内可完整显示的商品数量
  const visibleItems = 4;
  
  // 最大可移动次数 = 总商品数 - 可见商品数
  const maxMoveIndex = Math.max(0, products.length - visibleItems);

  // 向左移动
  const moveLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // 向右移动
  const moveRight = () => {
    if (currentIndex < maxMoveIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 计算容器的偏移量：保持最左边5px gap
  const translateX = -(currentIndex * totalItemWidth);

  // 如果没有商品，显示空状态
  if (products.length === 0) {
    return (
      <div className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: `${height}px` }}>
        <p className="text-gray-500 text-xl chewy-text">暂无商品</p>
      </div>
    );
  }

  return (
    <div className="relative w-full flex items-center overflow-hidden" style={{ height: `${height}px` }}>
      {/* 左侧按钮 */}
      <button
        onClick={moveLeft}
        disabled={currentIndex === 0}
        className="absolute left-5 z-20 w-14 h-14 bg-[#ecd448] hover:bg-[#4cc9f0] border-2 border-black rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:scale-105 active:scale-95 chewy-text font-bold"
      >
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 商品容器 */}
      <div className="flex items-center h-full overflow-hidden">
        <div 
          className="flex items-center transition-transform duration-700 ease-out"
          style={{ 
            transform: `translateX(${translateX + leftGap + 60}px)`, // +60px为左侧按钮和间距留出空间
          }}
        >
          {products.map((product, index) => (
            <div key={product.id} className="mr-5 flex-shrink-0"> {/* mr-5 提供20px的gap */}
              <ProductCard 
                product={product} 
                priority={prioritizeFirst && index < 3}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 右侧按钮 */}
      <button
        onClick={moveRight}
        disabled={currentIndex >= maxMoveIndex}
        className="absolute right-5 z-20 w-14 h-14 bg-[#ecd448] hover:bg-[#4cc9f0] border-2 border-black rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:scale-105 active:scale-95 chewy-text font-bold"
      >
        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 