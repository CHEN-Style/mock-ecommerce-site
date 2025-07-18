"use client";

import { useState } from "react";
import Marquee from "./Marquee";
import SocialBar from "../../components/socialBar";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  }
  
  return (
    <footer className="w-full h-[450px] flex flex-col items-center relative">
      <Marquee text="🛒 BIG SALE NOW ✦ NEW ARRIVALS ✦ SHOP NOW ✦" speed={15} />
      <main className="w-full h-[280px] flex flex-row items-center justify-between gap-4 px-10">
        <img src="/Logo/EStudioLOGO.png" alt="logo" className="w-[250px] h-[250px]" />
        <div className="w-[330px] h-[250px] flex flex-col justify-center">
          <p className="luckiest-text font-extrabold text-3xl text-black mb-3">Stay Updated</p>
          <p className="chewy-text text-xl text-black mb-3">Subscribe and receive the good news first, exclusive discounts and perks!</p>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleChange}
            required
            className="w-full p-4 bg-white rounded-full shadow-[3px_3px_0_rgba(0,0,0,0.7)] border-2 border-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4cc9f0] transition-all duration-300 luckiest-text"
          />
        </div>
        <div className="w-[250px] h-[250px] flex flex-col justify-center items-center gap-5">
          <p className="luckiest-text font-extrabold text-3xl text-black mb-2">Follow Us</p>
          <SocialBar />
        </div>
      </main>
      <svg width="95%" height="2">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="black" strokeWidth="2" strokeDasharray="8, 4" />
      </svg>
      <article className="w-full h-[100px] flex flex-row items-center justify-between px-10 mt-2 border-b-2 border-black">
        <p className="font-bold text-xl text-black">© 2025 EStudio. All rights reserved.</p>
        <p className="font-bold text-xl text-black">Privacy Policy</p>
        <p className="font-bold text-xl text-black">Terms of Service</p>
        <p className="font-bold text-xl text-black">FAQs</p>
        <p className="font-bold text-xl text-black">Refund Policy</p>
      </article>

    </footer>
  )
}