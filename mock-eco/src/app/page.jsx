"use client";

import Image from "next/image";
import Link from "next/link";
import Marquee from "../components/Marquee";
import ProductCarousel from "../components/ProductCarousel";
import { giftBoxProducts, giftBoxProductsNo2, featuredProducts } from "../data/products";


// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: '$35',
//     color: 'Black',
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in white.",
//     price: '$35',
//     color: 'Aspen White',
//   },
//   {
//     id: 3,
//     name: 'Basic Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg',
//     imageAlt: "Front of men's Basic Tee in dark gray.",
//     price: '$35',
//     color: 'Charcoal',
//   },
//   {
//     id: 4,
//     name: 'Artwork Tee',
//     href: '#',
//     imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg',
//     imageAlt: "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
//     price: '$35',
//     color: 'Iso Dots',
//   },
// ]

export default function Home() {
  return (
    <>
      <section className="container w-full h-[600px] border-t-2 border-b-2 border-black flex items-center justify-center">
        <div className="w-[95%] h-[90%] flex flex-row items-center justify-between bg-[#cd4c3a] border-2 border-black rounded-[20px] pl-15 overflow-hidden">
          <article className="w-[500px] h-[450px] flex flex-col  justify-center overflow-hidden">
            <p className="chewy-text text-5xl mb-5 text-[#fbd576]">Great Day! Right?</p>
            <p className="luckiest-text text-6xl text-[#fde9cc]">OPTIMUM QUALITY</p>
            <p className="luckiest-text text-6xl text-[#fde9cc]">ECO-FRIENDLY</p>
            <p className="luckiest-text text-6xl text-[#fde9cc] mb-5">THE BEST EXPERIENCE</p>
            <button className="btn">Visit Our Store</button>
          </article>
          <img src="/shop.png" alt="shop" className="w-[750px] relative right-[-70px]" />
        </div>
      </section>
      <div className="w-full h-[50px] bg-black flex items-center justify-center leading-none">
        <Marquee text="🛒 BIG SALE NOW ✦ NEW ARRIVALS ✦ SHOP NOW ✦" speed={15} />
      </div>
      
      {/* 礼品盒系列1 */}
      <section className="w-full h-[500px] border-b-2 border-black">
        <div className="w-full h-[100px] flex flex-row items-center justify-between px-15 pt-10">
          <p className="chewy-text text-5xl text-black">Gift Box Collection</p>
          <button className="btn">EXPLORE MORE</button>
        </div>
        <ProductCarousel products={giftBoxProducts} />
      </section>
      
      {/* 礼品盒系列2 - 折扣专区 */}
      <section className="w-full h-[400px] border-b-2 border-black bg-[#fbd576] relative">
        <img src="/Logo/section.png" alt="section" className="w-[300px] absolute top-[-100px] left-[-100px] z-10 rotate-[-15deg]" />
        <ProductCarousel products={giftBoxProductsNo2} />
        <img src="/Logo/wow.png" alt="wow" className="w-[200px] absolute bottom-[-100px] right-[-80px] z-10 rotate-[15deg]" />
      </section>
      
      {/* 特色商品系列 */}
      <section className="w-full h-[500px] border-b-2 border-black">
        <div className="w-full h-[100px] flex flex-row items-center justify-between px-15 pt-10">
          <p className="chewy-text text-5xl text-black">Featured Products</p>
          <button className="btn">EXPLORE MORE</button>
        </div>
        <ProductCarousel products={featuredProducts} />
      </section>
    </>
  );
}
