"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import API_BASE_URL from '../config/api';
import Marquee from "../components/Marquee";
import ProductCarousel from "../components/ProductCarousel";
import SkeletonLoader from "../components/SkeletonLoader";
import DisclaimerModal from "../components/DisclaimerModal";
import { giftBoxProductsNo2 } from "../data/products";

export default function Home() {
  const [giftBoxProducts, setGiftBoxProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // 数据转换函数 - 将API数据转换为组件期望的格式
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
      infoPrice: apiProduct.info_price
    };
  };

  // 获取产品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/products`);
        
        if (response.data.success) {
          const products = response.data.data;
          
          // 过滤并转换礼品盒系列数据
          const giftBoxData = products
            .filter(product => product.collection === 'giftBox')
            .map(transformProductData);
          
          // 过滤并转换特色商品系列数据
          const featuredData = products
            .filter(product => product.collection === 'Clothing')
            .map(transformProductData);
          
          setGiftBoxProducts(giftBoxData);
          setFeaturedProducts(featuredData);
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
        <SkeletonLoader type="home" />
        <DisclaimerModal />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <DisclaimerModal />
      <section className="animated-background w-full h-[600px] border-t-2 border-b-2 border-black flex items-center justify-center">
        <div className="w-[95%] h-[90%] flex flex-row items-center justify-between bg-[#cd4c3a] border-2 border-black rounded-[20px] pl-15 overflow-hidden">
          <article className="w-[500px] h-[450px] flex flex-col  justify-center overflow-hidden">
            <p className="chewy-text text-5xl mb-5 text-[#fbd576]">Great Day! Right?</p>
            <p className="luckiest-text text-6xl text-[#fde9cc]">OPTIMUM QUALITY</p>
            <p className="luckiest-text text-6xl text-[#fde9cc]">ECO-FRIENDLY</p>
            <p className="luckiest-text text-6xl text-[#fde9cc] mb-5">THE BEST EXPERIENCE</p>
            <Link href="/contact">
              <button className="btn">Visit Our Store</button>
            </Link>
          </article>
          <img src="/shop.png" alt="shop" className="w-[750px] relative right-[-70px]" />
        </div>
      </section>
      <div className="w-full h-[50px] bg-black flex items-center justify-center leading-none">
        <Marquee text="🛒 BIG SALE NOW ✦ NEW ARRIVALS ✦ SHOP NOW ✦" speed={15} />
      </div>
      
      {/* 礼品盒系列1 */}
      <section className="w-full h-[600px] border-b-2 border-black">
                  <div className="w-full h-[100px] flex flex-row items-center justify-between px-15 pt-10">
            <p className="chewy-text text-5xl text-black">Gift Box Collection</p>
            <Link href="/product?filter=giftBox">
              <button className="btn">EXPLORE MORE</button>
            </Link>
          </div>
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
        ) : (
          <ProductCarousel products={giftBoxProducts} height={500} />
        )}
      </section>
      
      {/* 礼品盒系列2 - 折扣专区 */}
      <section className="w-full h-[400px] border-b-2 border-black bg-[#fbd576] relative">
        <img src="/Logo/section.png" alt="section" className="w-[300px] absolute top-[-82px] left-[-110px] z-10 rotate-[-15deg]" />
        <ProductCarousel products={giftBoxProductsNo2} />
        <img src="/Logo/wow.png" alt="wow" className="w-[200px] absolute bottom-[-50px] right-[-80px] z-10 rotate-[15deg]" />
      </section>
      
      {/* 特色商品系列 */}
      <section className="w-full h-[600px] border-b-2 border-black">
                  <div className="w-full h-[100px] flex flex-row items-center justify-between px-15 pt-10">
            <p className="chewy-text text-5xl text-black">Featured Products</p>
            <Link href="/product?filter=Clothing">
              <button className="btn">EXPLORE MORE</button>
            </Link>
          </div>
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
        ) : (
          <ProductCarousel products={featuredProducts} height={500} />
        )}
      </section>

      {/* 上新通知 */}
      <section className="w-full h-[700px] border-b-2 border-black flex flex-col items-center pt-[50px] ">
        <p className="luckiest-text font-bold text-5xl text-black">What's Coming Soon?</p>
        <div className="mt-20 w-[400px] h-[430px] rounded-[40px] border-2 border-black flex flex-col items-center justify-center p-5 pt-0">
          <img src="/Logo/smile.png" alt="smile" className="w-[150px] h-[150px]" />
          <p className="chewy-text font-bold text-2xl text-black">Stay Updated</p>
          <p className="luckiest-text text-5xl text-black w-[300px] text-center">Watch this Space!</p>
          <p className="text-xl text-black w-[300px] text-center">Subscribe and receive the good news first, exclusive discounts and perks!</p>
 
        </div>
      </section>
    </div>
  );
}
