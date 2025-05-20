import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HashmintLogo from '@/public/Hashmint_Logomark_Black_png.png';

const Footer = () => {
  const NavContents = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'FAQ', link: '/faq' },
  ];

  return (
    <footer className="flex flex-col w-full bg-black text-white">
      {/* Top section - Pre-footer banner */}
      <div className="relative w-full">
        <div className="w-full h-[40vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] relative">
          <Image
            src="https://ik.imagekit.io/99y1fc9mh/HashMint/prefooter-product.avif?updatedAt=1746729436147"
            alt="HashMint pre-footer banner"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col md:items-start items-center  justify-between p-4 sm:p-8 md:p-12 lg:p-16">
            <h2 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#f9c63b] font-bold mb-6 md:mb-8 lg:mb-10">
              HashMint
            </h2>

            <div className="flex flex-col space-y-4 items-start justify-center">
              <div className="w-fit">
                <button className="md:px-46 md:py-5 px-32 whitespace-nowrap py-3 text-base sm:text-lg md:text-xl lg:text-2xl w-full rounded-xl bg-[#f9c63b] hover:bg-[#f9c63bf2] text-black font-medium transition-colors duration-200 cursor-pointer">
                  Book a call
                </button>
                <p className="text-white text-sm sm:text-base md:text-lg font-normal md:font-semibold text-center mt-5">
                  Estimated Ship Date: <span className="font-normal">June 2025</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom section - Main footer content */}
      <div className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Logo and copyright section */}
          <div className="flex flex-col space-y-8 lg:space-y-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="bg-white rounded-xl p-1">
                <Image
                  src={HashmintLogo}
                  alt="HashMint logo"
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold">HashMint</span>
            </Link>

            <div className="text-xs sm:text-sm mt-auto">
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

          {/* Links and subscription section */}
          <div className="flex flex-col space-y-8">
            {/* Navigation, About, and Socials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* NAVIGATION Section */}
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">Navigation</h3>
                <nav className="flex flex-col space-y-2">
                  {NavContents.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      className="text-base font-medium hover:underline cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* WHO WE ARE Section */}
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">Who We Are</h3>
                <p className="text-sm sm:text-base font-medium">
                  A more Caring <br /> Computer Company
                </p>
              </div>

              {/* SOCIALS Section */}
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider">Socials</h3>
                <div className="flex space-x-4">
                  {/* Twitter/X */}
                  <a href="#" className="hover:text-[#f9c63b] transition-colors duration-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_6359_938)">
                        <path d="M7.55016 21.7502C16.6045 21.7502 21.5583 14.2469 21.5583 7.74211C21.5583 7.53117 21.5536 7.31554 21.5442 7.1046C22.5079 6.40771 23.3395 5.5445 24 4.55554C23.1025 4.95484 22.1496 5.21563 21.1739 5.32898C22.2013 4.71315 22.9705 3.74572 23.3391 2.60601C22.3726 3.1788 21.3156 3.58286 20.2134 3.80085C19.4708 3.01181 18.489 2.48936 17.4197 2.3143C16.3504 2.13923 15.2532 2.32129 14.2977 2.83234C13.3423 3.34339 12.5818 4.15495 12.1338 5.14156C11.6859 6.12816 11.5754 7.23486 11.8195 8.29054C9.86249 8.19233 7.94794 7.68395 6.19998 6.79834C4.45203 5.91274 2.90969 4.66968 1.67297 3.14976C1.0444 4.23349 0.852057 5.51589 1.13503 6.73634C1.418 7.95678 2.15506 9.02369 3.19641 9.72023C2.41463 9.69541 1.64998 9.48492 0.965625 9.10617V9.1671C0.964925 10.3044 1.3581 11.4068 2.07831 12.287C2.79852 13.1672 3.80132 13.7708 4.91625 13.9952C4.19206 14.1934 3.43198 14.2222 2.69484 14.0796C3.00945 15.0577 3.62157 15.9131 4.44577 16.5266C5.26997 17.14 6.26512 17.4808 7.29234 17.5015C5.54842 18.8714 3.39417 19.6144 1.17656 19.6109C0.783287 19.6103 0.390399 19.5861 0 19.5387C2.25286 20.984 4.87353 21.7516 7.55016 21.7502Z" fill="currentColor"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_6359_938">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                  {/* TikTok */}
                  <a href="#" className="hover:text-[#f9c63b] transition-colors duration-200">
                    <svg width="18" height="20" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.7917 5.62246C18.5886 5.36615 17.4991 4.7338 16.6822 3.81761C15.8652 2.90141 15.3634 1.74926 15.25 0.529131V0H11.0998V16.4043C11.0972 17.1305 10.8662 17.8377 10.4393 18.4264C10.0124 19.0152 9.41094 19.4559 8.71955 19.6867C8.02817 19.9174 7.28155 19.9267 6.58464 19.713C5.88772 19.4994 5.27553 19.0736 4.83409 18.4956C4.3858 17.9079 4.13712 17.1932 4.12412 16.4553C4.11111 15.7173 4.33446 14.9944 4.76177 14.3914C5.18908 13.7884 5.79813 13.3366 6.50062 13.1016C7.2031 12.8666 7.96249 12.8605 8.66866 13.0843V8.88484C7.09394 8.66803 5.49055 8.94686 4.08278 9.68233C2.675 10.4178 1.53325 11.5731 0.817222 12.9867C0.101195 14.4003 -0.153296 16.0015 0.089347 17.5662C0.33199 19.1309 1.05963 20.581 2.17049 21.7136C3.22986 22.7931 4.58819 23.5338 6.07211 23.841C7.55603 24.1483 9.09821 24.0081 10.5018 23.4385C11.9054 22.8689 13.1067 21.8956 13.9524 20.6429C14.7981 19.3902 15.2499 17.915 15.25 16.4055V8.02335C16.9272 9.2176 18.9382 9.85796 21 9.85431V5.74725C20.594 5.74775 20.189 5.70592 19.7917 5.62246Z" fill="currentColor"></path>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="hover:text-[#f9c63b] transition-colors duration-200">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_6359_941)">
                        <path d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z" fill="currentColor"></path>
                        <path d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z" fill="currentColor"></path>
                        <path d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z" fill="currentColor"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_6359_941">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter subscription */}
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Get Updates</label>
              <div className="relative w-full max-w-md">
                <input
                  type="email"
                  placeholder="E-Mail"
                  className="w-full p-3 pr-32 rounded-xl bg-transparent border border-gray-300 text-white"
                />
                <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#f9c63b] text-black rounded-lg text-sm font-medium whitespace-nowrap hover:bg-[#f9c63bf2] transition-colors duration-200">
                  Book a call
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;