"use client";

import Link from "next/link";
import Image from "next/image";
import UserIconButton from "../../components/userIconBtn";
import CartButton from "../../components/chartButton";

export default function Header() {
  return (
    <header className="w-full h-[80px] flex flex-row items-center px-10 justify-between relative">
      <nav className="w-[300px] h-full flex flex-row items-center justify-between gap-5">
        <Link href="/product">
          <div className="text-base font-extrabold cursor-pointer transition-all duration-300 hover:text-[#cd4c3a] ">
            SHOP
          </div>
        </Link>
        <Link href="/about">
          <div className="text-base font-extrabold cursor-pointer transition-all duration-300 hover:text-[#cd4c3a] ">
            ABOUT
          </div>
        </Link>
        <Link href="/contact">
          <div className="text-base font-extrabold cursor-pointer transition-all duration-300 hover:text-[#cd4c3a] ">
            CONTACT
          </div>
        </Link>
      </nav>
      <nav className="w-[300px] h-full flex flex-row items-center justify-between gap-5">
        <div className="text-base font-extrabold">BECOME A SELLER</div>
        <Link href="/user">
          <UserIconButton  />
        </Link>
        <CartButton onClick={() => alert("This feature is developing")} />
      </nav>
      <Link href="/" className="absolute left-1/2 top-[90px] -translate-x-1/2 -translate-y-1/2 z-10">
        <Image
          src="/Logo/EStudioLOGO.png"
          alt="logo"
          width={300}
          height={300}
          className="w-[300px] h-[300px] transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer z-10"
          priority
          quality={90}
        />
      </Link>
    </header>
  );
} 