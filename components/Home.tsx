import React from 'react'
import Image from 'next/image'
import TopNav from './TopNav';

const Home = () => {
  return (
    <div className="relative ">
      {/* <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        src='/capped-1080p.mp4'
        
      >
        {" "}
      </video> */}
     
      {/* <div className="absolute top-5 md:left-5 w-full z-10">
        <TopNav />  
      </div> */}

      <div className="absolute md:bottom-15 md:left-20 bottom-10 left-7 font-medium text-[20px] md:text-[62px] md:leading-[72px] text-white">
        Turnkey Contracting | Woodwork Mastery | Timeless Interiors
      </div>
    </div>
  );
}

export default Home
