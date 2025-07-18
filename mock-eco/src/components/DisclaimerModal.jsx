"use client";

import { useState, useEffect } from 'react';

export default function DisclaimerModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 检查是否已经显示过弹窗
    const hasShownDisclaimer = localStorage.getItem('hasShownDisclaimer');
    
    if (!hasShownDisclaimer) {
      // 延迟显示弹窗，让页面先加载
      setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 1500);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      // 标记已经显示过弹窗
      localStorage.setItem('hasShownDisclaimer', 'true');
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pointer-events-none">
      <div 
        className={`
          pointer-events-auto 
          bg-white 
          border-2 
          border-black 
          rounded-2xl 
          shadow-2xl 
          max-w-md 
          w-full 
          p-6 
          mt-4 
          mr-4
          transform 
          transition-all 
          duration-300 
          ease-out
          ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}
        style={{
          animation: isAnimating ? 'slideInFromRight 0.5s ease-out' : 'slideOutToRight 0.3s ease-in'
        }}
      >
        {/* 关闭按钮 */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full border-2 border-black transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* 标题 */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#cd4c3a] chewy-text">
            📢 Important Notice
          </h2>
        </div>

        {/* 内容 */}
        <div className="space-y-4 text-gray-700">
          <p className="text-sm leading-relaxed">
            This website is a <strong>simulated e-commerce site</strong>, not for any commercial purposes, only used as a personal full-stack skill showcase. If you are interested, please go to the <strong>'Follow Us'</strong> section in the footer area and click any button to view the source code.
          </p>
          
          <div className="bg-[#fbd576] p-3 rounded-lg border border-black">
            <p className="text-sm font-medium text-black">
              ⚠️ The responsive adaptation of this website is under development. Please use a <strong>PC</strong> to browse for the best experience.
            </p>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-6 flex gap-3">
          <button 
            onClick={handleClose}
            className="flex-1 bg-[#cd4c3a] hover:bg-[#b33d2a] text-white font-bold py-2 px-4 rounded-full border-2 border-black transition-colors"
          >
            Got it!
          </button>
          <button 
            onClick={() => {
              // 滚动到footer区域
              const footer = document.querySelector('footer');
              if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
              }
              handleClose();
            }}
            className="flex-1 bg-white hover:bg-gray-50 text-black font-bold py-2 px-4 rounded-full border-2 border-black transition-colors"
          >
            View Source
          </button>
        </div>
      </div>
    </div>
  );
} 