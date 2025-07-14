"use client";

import { useRef, useEffect, useState } from "react";

export default function SeamlessMarquee({ text = "✦ React Bits ✦", speed = 60 }) {
  const containerRef = useRef(null);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // 增加足够的重复内容以确保无缝循环
    // 使用8个重复项而不是4个，这样可以确保在动画的任何时候都有足够的内容显示
    setContent(Array(8).fill(text));
  }, [text]);

  return (
    <div className="overflow-hidden w-full h-[50px] bg-black flex items-center relative">
      <div
        ref={containerRef}
        className="flex whitespace-nowrap animate-marquee-seamless"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {content.map((item, index) => (
          <span
            key={index}
            className="mx-8 text-[#fde9cc] font-bold tracking-wider text-base"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

