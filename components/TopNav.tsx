import Image from 'next/image';
import React from 'react';
import NewImage from '@/public/Hashmint_Logomark_Black_png.png';
import HamburgerToggle from './hamBurgerToggle';
import Link from 'next/link';

const TopNav = () => {
  return (
    <div className="flex flex-row justify-between relative z-50 items-center w-full bg-transparent mt-2 pl-8 pr-10">
      {/* lOGO */}
      <Link href="/">
        <div className="bg-gray-50 rounded-xl border-[#d8d4d1] border px-1  ">
          <Image src={NewImage} alt="logo" width={30} height={30} />
        </div>
      </Link>

      {/* Desktop NAV */}
      <div className="hidden md:block">
        <div className="flex flex-row justify-between items-center w-full bg-gray-50 border border-[#d8d4d1] rounded-lg  space-x-5 p-1">
          <div className=' flex flex-row justify-between items-center gap-4 pl-2'>

            <Link
              href={"/"}
              className="cursor-pointer text-xs font-medium  hover:text-black text-[#333333]"
            >
              Home
            </Link>
            <Link
              href={"/products"}
              className="cursor-pointer text-xs font-medium  hover:text-black text-[#333333]"
            >
              Product
            </Link>
            <Link
              href={"/faq"}
              className="cursor-pointer text-xs font-medium  hover:text-black text-[#333333]"
            >
              FAQ
            </Link>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#f9c63b] hover:bg-[#f9c63bf2] text-xs uppercase font-semibold cursor-pointer">
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