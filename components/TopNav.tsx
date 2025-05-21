"use client";

import Image from 'next/image';
import React from 'react';
import NewImage from '@/public/Hashmint_Logomark_Black_png.png';
import HamburgerToggle from './hamBurgerToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TopNav = () => {
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="flex flex-row justify-between relative z-50 items-center w-full px-10 bg-transparent mt-5">
      {/* LOGO */}
      <Link href="/">
        <div className="bg-[#FAF5F2] rounded-xl  px-1">
          <Image src={NewImage} alt="logo" width={50} height={50} />
        </div>
      </Link>

      {/* Desktop NAV */}
      <div className="hidden md:block">
        <div className="flex flex-row justify-between items-center w-full bg-[#FAF5F2] border border-[#d8d4d1] rounded-lg pl-5  pr-1 py-1 space-x-5">
          <Link
            href={"/"}
            className={`cursor-pointer text-sm font-regular hover:text-black ${
              isActive('/') ? 'text-black' : 'text-[#343333]'
            }`}
          >
            Home
          </Link>
          <Link
            href={"/products"}
            className={`cursor-pointer text-sm font-regular hover:text-black ${
              isActive('/products') ? 'text-black' : 'text-[#333333]'
            }`}
          >
            Products
          </Link>
          <Link
            href={"/faq"}
            className={`cursor-pointer text-sm font-regular hover:text-black ${
              isActive('/faq') ? 'text-black' : 'text-[#333333]'
            }`}
          >
            FAQ
          </Link>
          <button className="px-5 py-3 rounded-lg bg-[#f9c63b] hover:bg-[#f9c63bf2] text-sm cursor-pointer font-regular">
            Book a call
          </button>
        </div>
      </div>

      {/* Mobile NAV */}
      <div className="md:hidden">
        <HamburgerToggle />
      </div>
    </div>
  );
}

export default TopNav;