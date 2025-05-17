import Image from 'next/image';
import React from 'react';
import NewImage from '@/public/Hashmint_Logomark_Black_png.png';
import HamburgerToggle from './hamBurgerToggle';
import Link from 'next/link';

const TopNav = () => {
  return (
    <div className="flex flex-row justify-between relative z-50 items-center w-full px-5 bg-transparent">
      {/* lOGO */}
      <Link href='/'>
        <Image src={NewImage} alt="logo" width={80} height={80} />
      </Link>

      {/* Desktop NAV */}
      <div className="hidden md:block">
        <div className="flex flex-row justify-between items-center w-full bg-white border border-[#d8d4d1] rounded-lg pl-5 pr-1 py-1 space-x-5">
          <Link href={'/'} className="cursor-pointer text-md">Home</Link>
          <Link href={'/products'} className="cursor-pointer text-md">Product</Link>
          <Link href={'/faq'} className="cursor-pointer text-md">FAQ</Link>
          <button className="px-5 py-3 rounded-lg bg-[#f9c63b]">
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