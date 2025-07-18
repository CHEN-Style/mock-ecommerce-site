"use client";

import Link from "next/link";
import ShopButton from "../../components/shopButton";

export default function ProductCard({ product }) {
  const { id, image, name, otherDec = false, mask = false, p1, p2, showInfo = false, infoName, infoPrice } = product;

  return (
    <div className="">
      <Link href={`/item/${id}`} className="block">
        <div className="relative w-[280px] h-[280px] flex-shrink-0 cursor-pointer">
        <div className="peer w-full h-full bg-white rounded-[10px] hover:outline hover:outline-2 hover:outline-black">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover rounded-[10px]" 
          />
          
          {/* 灰色半透明模板 */}
          {mask && (
            <div className="absolute inset-0 bg-black/60 rounded-[10px] flex flex-col items-center justify-center">
              <p className="text-white text-2xl font-bold chewy-text mb-2">{p1}</p>
              <p className="text-white text-lg font-semibold luckiest-text">{p2}</p>
            </div>
          )}
        </div>
        
        {/* NEW 贴纸 */}
        <img
          src="/Logo/newSticker.png"
          alt="new"
          className="w-[80px] h-[80px] absolute top-[-30px] left-[-20px] rotate-[-10deg] peer-hover:animate-[swing_0.5s_ease-in-out_infinite]"
        />
        
        {/* 装饰星星 - 根据otherDec选择不同样式 */}
        {!otherDec ? (
          // 默认装饰星星 - 初始隐藏，hover时出现并带动画
          <>
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[40px] h-[40px] absolute top-[10px] right-[-20px] rotate-[-10deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.5s_ease-in-out_infinite] transition-opacity duration-300" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[40px] h-[40px] absolute top-[-20px] right-[20px] rotate-[-10deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.5s_ease-in-out_infinite] transition-opacity duration-300" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[40px] h-[40px] absolute bottom-[20px] left-[-20px] rotate-[-10deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.5s_ease-in-out_infinite] transition-opacity duration-300" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[40px] h-[40px] absolute bottom-[-20px] left-[20px] rotate-[-10deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.5s_ease-in-out_infinite] transition-opacity duration-300" 
            />
          </>
        ) : (
          // 另一种装饰星星 - 更多星星，不同位置和大小
          <>
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[30px] h-[30px] absolute top-[0px] right-[10px] rotate-[15deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.3s_ease-in-out_infinite] transition-opacity duration-200" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[35px] h-[35px] absolute top-[-15px] left-[40px] rotate-[-30deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.4s_ease-in-out_infinite] transition-opacity duration-300" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[25px] h-[25px] absolute bottom-[10px] right-[-15px] rotate-[45deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.6s_ease-in-out_infinite] transition-opacity duration-400" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[40px] h-[40px] absolute bottom-[-10px] left-[10px] rotate-[0deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.5s_ease-in-out_infinite] transition-opacity duration-350" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[20px] h-[20px] absolute top-[50px] left-[-10px] rotate-[60deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.35s_ease-in-out_infinite] transition-opacity duration-250" 
            />
            <img 
              src="/Logo/star.png" 
              alt="star" 
              className="w-[28px] h-[28px] absolute top-[120px] right-[5px] rotate-[-45deg] opacity-0 peer-hover:opacity-100 peer-hover:animate-[swing_0.45s_ease-in-out_infinite] transition-opacity duration-300" 
            />
          </>
        )}
        </div>
      </Link>
      
      {/* 商品信息栏 */}
      {showInfo && (
        <div className="w-[280px] h-[150px] mt-4 flex flex-col justify-between">
          <div className="flex-1">
            <Link href={`/item/${id}`}>
              <h3 className="text-2xl font-bold text-gray-800 chewy-text mb-2 line-clamp-2 cursor-pointer hover:text-[#cd4c3a] transition-colors">
                {infoName}
              </h3>
            </Link>
            <div className="flex items-center justify-start gap-2 mt-auto">
              <span className="text-2xl text-gray-800 luckiest-text">
                ${infoPrice}
              </span>
              <ShopButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 