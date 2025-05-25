"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

const Specs = () => {
  const images = [
    {
      title: "Live Paper Display",
      description: "a new kind of screen that feels like paper but runs at 60fps",
      image: "/Products/specs/tab.png",
    },
    {
      title: "Long Lasting Battery Life",
      description: "Enough Battery Life to have you not charge for days!",
      image: "/Products/specs/dots.png",
    },
    {
      title: "Your Sleek Stylus",
      description: "Lightweight Stylus compatible with Wacom EMR pens",
      image: "/Products/specs/pen.png",
    },
  ];

  const productSpecs = [
   
    {
      title: "Performance",
      contents: [
        "CPU – MediaTek Helio G99 (500-2200 MHz)",
        "GPU – ARM Mali - G57 MC2",
        "RAM: 4GB",
        "ROM: 64GB",
        "Storage: 128GB",
        "Refresh Rate: 60Hz",
      ],
    },
    {
      title: "Display",
      contents: [
        "10.95” FHD",
        "1920*1200 Incell",
        "TP Bazel",
        "Camera – Back 13MP; Front - 5 MP",

      ],
    },
    {
      title: "Device",
      contents: [
        "Weight: 525gms",
        "Dimensions: 10.14'H 6.65' 'W 0.29'D",
        "Stereo speakers",
        "Microphone",

      ],
    },
    {
      title: "Connectivity",
      contents: [
        "Wi-Fi: 5",
        "Bluetooth: 5.0",
        "USB: Type-C",

      ],
    },
   
    {
      title: "Software",
      contents: [
        "OS: HashOS",
        "Google Drive Sync & Backup ",
        "Regular OTA updates"
      ],
    },
  ];


  return (
    <div className='bg-[#E7DED8] py-20'>
      {/* Header */}
      <div className='bg-black py-3 max-w-7xl mx-auto rounded-xl px-5'>
        <h1 className='text-white text-5xl text-left tracking-tighter leading-tight font-horizona'>Product Specs</h1>
      </div>

      {/* Grid Cards */}
      <div className='max-w-7xl mx-auto mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {images.map((src, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.97 }}
              className="w-full"
            >
              <div className=" h-full p-2 rounded-xl bg-[#EFE7E2] ">
                <div className="relative w-full h-60">
                  <Image
                    src={src.image}
                    alt={`carousel-${index}`}
                    width={1000}
                    height ={1000}
                    className="rounded-xl w-[500px] h-[200px]"
                  />
                </div>

                <div className="p-4 text-start">
                  <h1 className="text-lg font-medium text-gray-800 tracking-tighter leading-tight font-horizona">
                    {src.title}
                  </h1>
                  <p className="text-sm text-gray-600 mt-1 font-regular">{src.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>



      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-20"
      >
        {productSpecs.map((section, index) => (
          <div
            key={index}
            className={` p-6 rounded-xl ${index >= 3 ? 'lg:col-span-1 md:col-span-1' : ''
              }`}
          >
            <h2 className="text-5xl  mb-4 text-gray-800 tracking-tighter leading-tight font-horizona">
              {section.title}
            </h2>
            <div className="space-y-4 mt-4">
              {section.contents.map((content, idx) => (
                <div key={idx}>
                  <p className=" text-xl tracking-tighter leading-tight text-[#18190f] opacity-50">{content}</p>
                  <hr className="border-t border-dotted border-gray-400 mt-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specs;
