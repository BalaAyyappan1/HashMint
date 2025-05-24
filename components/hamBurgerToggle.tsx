"use client";
import { useState } from "react";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";
import { HiMenuAlt2 as Menu } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const HamburgerToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Hamburger and Book a call button */}
      <div className="flex items-center gap-3 relative border bg-gray-50 border-[#d8d4d1] rounded-lg p-1">
        {/* Book a call button with smooth animation */}
        <div
          className={classNames(
            "transition-all duration-300 transform origin-right",
            {
              "opacity-0 translate-x-5 pointer-events-none": isOpen,
              "opacity-100 translate-x-0": !isOpen,
            }
          )}
        >
          <Link href={'https://hashmint-frontend.onrender.com/'} target="_blank" className="px-3 py-1 rounded-lg bg-[#f9c63b]">
            Pre-Order
          </Link>
        </div>

        {/* Hamburger / Close Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={toggleMenu}
          className="relative w-8 h-8 flex items-center justify-center z-50 group "
        >
          {/* Hamburger Icon */}
          <div
            className={classNames(
              "absolute w-full h-full flex flex-col justify-between p-1 transition-all duration-300",
              {
                "opacity-100": !isOpen,
                "opacity-0 rotate-90": isOpen,
              }
            )}
          >
            <div className="flex flex-col space-y-1 group hover:cursor-pointer">
              <Menu className="hover:text-gray-300 w-6 h-6" />
            </div>
          </div>

          {/* Close Icon */}
          <div
            className={classNames(
              "absolute w-full h-full flex items-center justify-between transition-all duration-300  border border-[#d8d4d1] rounded-lg p-1",
              {
                "opacity-100 rotate-0": isOpen,
                "opacity-0 -rotate-90": !isOpen,
              }
            )}
          >
           
            <IoClose className="hover:text-gray-700 w-7 h-7 cursor-pointer " />
          </div>
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={classNames(
          "fixed top-0 left-0 w-full h-full bg-white z-10 transition-all duration-300 ease-in-out transform  ",
          {
            "translate-x-0 opacity-100": isOpen,
            "-translate-x-full opacity-0": !isOpen,
          }
        )}
      >
        <div className="p-6 flex flex-col justify-between space-y-4 text-xl ">
        <Image
              src="/Hashmint_Logomark_Black_png.png"
              alt="new"
              width={60}
              height={60}
            />
          <nav className="flex flex-col space-y-8 mt-6">
            <a href="/" className="flex items-center gap-2 text-5xl">
              {isActive("/") && <span className="text-2xl">•</span>} Home
            </a>
            <a href="/products" className="flex items-center gap-2 text-5xl">
              {isActive("/products") && <span className="2xl">•</span>} Products
            </a>
            <a href="/faq" className="flex items-center gap-2 text-5xl">
              {isActive("/faq") && <span className="text-2xl">•</span>} FAQ
            </a>
          </nav>

          <button className=" px-8 py-3 text-base sm:text-lg md:text-xl lg:text-2xl w-full rounded-xl bg-[#f9c63b] hover:bg-[#f9c63bf2] text-black font-medium transition-colors duration-200">
            Book a call
          </button>
        </div>
      </div>
    </>
  );
};

export default HamburgerToggle;
