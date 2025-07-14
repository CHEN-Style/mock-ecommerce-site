"use client";

import Link from "next/link";
import UserIconButton from "../../components/userIconBtn";
import CartButton from "../../components/chartButton";

export default function Header() {
  return (
    <header className="w-full h-[80px] flex flex-row items-center px-10 justify-between relative">
      <nav className="w-[300px] h-full flex flex-row items-center justify-between gap-5">
        <div className="text-base font-extrabold">SHOP</div>
        <div className="text-base font-extrabold">ABOUT</div>
        <div className="text-base font-extrabold">CONTACT</div>
      </nav>
      <nav className="w-[300px] h-full flex flex-row items-center justify-between gap-5">
        <div className="text-base font-extrabold">BECOME A SELLER</div>
        <Link href="/user">
          <UserIconButton  />
        </Link>
        <CartButton onClick={() => alert("点击了图标！")} />
      </nav>
      <Link href="/" className="absolute left-1/2 top-[90px] -translate-x-1/2 -translate-y-1/2">
        <img
          src="/Logo/EStudioLOGO.png"
          alt="logo"
          className="w-[300px] h-[300px] transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
        />
      </Link>
    </header>
  );
} 