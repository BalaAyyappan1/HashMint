import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HashmintLogo from '@/public/Hashmint_Logomark_Black_png.png'


const Footer = () => {

  const NavContents = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'FAQ', link: '/faq' },

  ];


  const Logos = [
    { name: 'Twitter', src: "/Footer/twitter.png" },
    { name: 'TikTok', src: "/Footer/tik.png" },
    { name: 'Instagram', src: "/Footer/insta.png" },
  ];


  return (
    <footer className="flex flex-col w-full h-[120vh] bg-[#000000]  text-white">
      {/* topsection */}
      <div className="relative w-full">
        <Image
          src="https://ik.imagekit.io/99y1fc9mh/HashMint/prefooter-product.avif?updatedAt=1746729436147"
          alt="new"
          width={1000}
          height={1000}
          className="object-cover w-full h-[70vh]"
        />

        <div className="absolute top-20 left-40 text-[#f9c63b] text-[120px]  font-semibold">
          HashMint
        </div>

        <div className="absolute top-100 left-40 ">
          <button className="px-50 py-4 text-[30px] rounded-xl bg-[#f9c63b]">
            Book a call
          </button>
          <p className="text-white text-[20px] font-semibold absolute mt-7  left-35 ">
            Estimated Ship Date:{" "}
            <span className="text-white font-normal">June 2025</span>
          </p>
        </div>
      </div>

      {/* bottomsection */}
      <div className="flex flex-row justify-center space-x-60 items-center w-full mx-auto max-w-9xl px-10 ">
        <div className="flex flex-col space-y-50 items-center">
          <div className="flex flex-row items-center space-x-10">
            <Image
              src={HashmintLogo}
              alt="logo"
              width={100}
              height={100}
              className="w-[50%]"
            />
            <p className="text-[60px] font-semibold">HashMint</p>
          </div>

          <div className=" text-[15px] font-semibold">
            © MMXXV • Hashmint Co. • Hashmint is a Public Benefit Co. <br />
            <Link href="#" className="hover:underline cursor-pointer">
              Privacy Policy
            </Link>{" "}
            •{" "}
            <Link href="#" className="hover:underline">
              Terms of service
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-50 mt-10 justify-center">
          <div className="flex flex-row items-start gap-12">
            {/* NAVIGATION Section */}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mb-2">NAVIGATION</h1>
              {NavContents.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="text-[15px] font-semibold hover:underline cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* WHO WE ARE Section */}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mb-2">WHO WE ARE</h1>
              <p className="text-[15px] font-medium">
                A more Caring Computer Company
              </p>
            </div>

            {/* SOCIALS Section */}
            <div className="flex flex-col">
              <h1 className="text-lg font-bold mb-2">SOCIALS</h1>
              <div className="flex flex-row space-x-2">
                {Logos.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer hover:underline"
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain text-white"
                    />
              
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block mb-2 text-white">Get Updates</label>
            <div className="relative">
              <input
                type="email"
                placeholder="E-Mail"
                className="w-full p-3 pr-28 rounded-2xl bg-transparent border border-gray-300 text-white"
              />
              <button
                className="absolute top-1/2 right-2 -translate-y-1/2 px-4.5 py-2 bg-[#f9c63b] text-black rounded-xl text-sm whitespace-nowrap"
              >
                Book a call
              </button>
            </div>
          </div>



        </div>
      </div>
    </footer>
  );
};

export default Footer;