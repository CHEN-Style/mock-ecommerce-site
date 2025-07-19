"use client";

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import SkeletonLoader from "@/components/SkeletonLoader";

function ProductPageContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'All';
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Sticky filter相关状态
  const filterRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [filterOriginalTop, setFilterOriginalTop] = useState(0);
  const [filterOriginalLeft, setFilterOriginalLeft] = useState(0);

  // 分类选项
  const categories = [
    { id: 'All', name: 'All', count: 0 },
    { id: 'giftBox', name: 'Gift Box', count: 0 },
    { id: 'Clothing', name: 'Clothing', count: 0 }
  ];

  // 数据转换函数
  const transformProductData = (apiProduct) => {
    return {
      id: apiProduct.id,
      name: apiProduct.name,
      image: `/goods/${apiProduct.image_id}.png`,
      otherDec: apiProduct.other_dec,
      mask: apiProduct.mask,
      p1: apiProduct.p1,
      p2: apiProduct.p2,
      showInfo: apiProduct.show_info,
      infoName: apiProduct.info_name,
      infoPrice: apiProduct.info_price,
      collection: apiProduct.collection
    };
  };

  // 获取所有商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        
        if (response.data.success) {
          const transformedProducts = response.data.data.map(transformProductData);
          setProducts(transformedProducts);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error loading products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 过滤商品
  useEffect(() => {
    let filtered = products;

    // 按分类过滤
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.collection === selectedCategory);
    }

    // 按搜索关键词过滤
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.infoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  // 计算各分类的商品数量
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'All') return products.length;
    return products.filter(product => product.collection === categoryId).length;
  };

  // Sticky filter逻辑
  useEffect(() => {
    // 只有在商品加载完成后才计算位置
    if (loading) return;

    const calculateAndSetPosition = () => {
      if (!filterRef.current || isSticky) return;
      
      const rect = filterRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const left = rect.left;
      
      console.log('记录位置:', { top, left, rect }); // 调试日志
      
      setFilterOriginalTop(top);
      setFilterOriginalLeft(left);
    };

    const handleScroll = () => {
      if (!filterRef.current) return;

      const currentScrollY = window.scrollY;
      
      // 如果还没有记录位置，先记录
      if (filterOriginalTop === 0) {
        calculateAndSetPosition();
        return;
      }
      
      // 计算sticky触发点
      const stickyPoint = filterOriginalTop - 30;
      
      // 切换sticky状态
      if (currentScrollY >= stickyPoint && !isSticky) {
        console.log('激活sticky，left值:', filterOriginalLeft); // 调试日志
        setIsSticky(true);
      } else if (currentScrollY < stickyPoint && isSticky) {
        setIsSticky(false);
      }
    };

    // 等待DOM完全渲染后再计算位置
    const timer = setTimeout(() => {
      calculateAndSetPosition();
    }, 500);
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filterOriginalTop, isSticky, loading]); // 添加loading依赖

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setIsSticky(false);
      setFilterOriginalTop(0);
      setFilterOriginalLeft(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        <SkeletonLoader type="product" />
      </div>
    );
  }

  return (
    <section className="w-full border-t-2 border-b-2 border-black flex flex-col items-center justify-center animate-fade-in">
      <Marquee text="🛒 BIG SALE NOW ✦ NEW ARRIVALS ✦ SHOP NOW ✦" speed={15} />
      
      {/* 标题区域 */}
      <div className="w-full h-[150px] flex flex-row justify-between px-10">
        <div className="h-[150px] flex flex-col justify-end items-start">
          <p className="luckiest-text text-5xl">Shop</p>
          <p className="chewy-text text-6xl">{categories.find(cat => cat.id === selectedCategory)?.name || 'All'}</p>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="w-full flex flex-row items-start justify-center mt-10 gap-8 px-10 pb-10">
        {/* 占位符，当filter变成sticky时保持布局 */}
        {isSticky && <div className="w-[300px] min-h-[500px]"></div>}
        
        {/* 左侧过滤器 */}
        <aside 
          ref={filterRef}
          className={`w-[300px] min-h-[500px] border-2 border-black rounded-2xl p-6 transition-all duration-300 ${
            isSticky 
              ? 'fixed top-[30px] z-50 shadow-lg' 
              : 'relative'
          }`}
          style={isSticky ? { left: `${filterOriginalLeft}px` } : {}}
        >
          
          {/* Filter 标题 */}
          <div className="mb-6">
            <h2 className="text-4xl font-bold mb-4 chewy-text">Filter</h2>
            
            {/* 搜索框 */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-black rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-[#cd4c3a]"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 分类选择 */}
          <div>
            <h3 className="text-2xl font-bold mb-4 chewy-text">BY CATEGORY</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-5 h-5 text-[#cd4c3a] border-2 border-black focus:ring-[#cd4c3a]"
                  />
                  <span className="chewy-text ml-3 text-lg font-medium group-hover:text-[#cd4c3a] transition-colors">
                    {category.name}
                  </span>
                  <span className="chewy-text ml-auto text-sm text-gray-600">
                    ({getCategoryCount(category.id)})
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* 右侧商品区域 */}
        <div className="flex-1 min-h-[500px]">
          {loading ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#ecd448] border-t-4 border-t-[#cd4c3a] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="chewy-text text-xl text-gray-600">Loading products...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <p className="chewy-text text-xl text-red-600">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="w-full h-[500px] flex items-center justify-center">
              <p className="chewy-text text-xl text-gray-600">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ProductPageContent />
    </Suspense>
  );
}