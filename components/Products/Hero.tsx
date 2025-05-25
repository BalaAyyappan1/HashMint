"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Navigation } from "swiper/modules";
import TopNav from "../TopNav";
import { SlReload } from "react-icons/sl";
import { LuClock2 } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useState } from "react";

const Hero = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(true); // For "What's Included" dropdown
  const [openOrder, setOpenOrder] = useState(true); // For "Order Details" dropdown

  const images = [
    { src: "/DC-1.avif", name: "Leaf-1 Tablet" },
    { src: "/Products/Hero/Stylus.avif", name: "Stylus" },
    { src: "/Products/Hero/Cable.avif", name: "Charging cable" },
  ];

  const orderDetails = [
    {
      title: "30-Day Guarantee",
      Description: "Return your DC-1 within 30 days for a full refund.",
      icon: <SlReload />,
    },
    {
      title: "Shipping Estimate",
      Description: "New orders are expected to ship by June 2025.",
      icon: <LuClock2 />,
    },
  ];

  const media = [
    { type: "image", src: "/Products/Hero/image2.JPG" },
    { type: "image", src: "/Products/Hero/image1.JPG" },
    { type: "image", src: "/Products/Hero/image3.JPG" },
    { type: "image", src: "/Products/Hero/image4.JPG" },
  ];

  const features = [
    { text: "Fast, paper-like display", image: "/fps.avif" },
    { text: "Read, write, take notes", image: "/Products/KeyFeatures/pen.avif" },
    { text: "Use your favorite apps", image: "/Products/KeyFeatures/fav-apps.avif" },
    { text: "Sunlight readable", image: "/Products/KeyFeatures/sun-black.avif" },
    { text: "Blue-light free backlight", image: "/Products/KeyFeatures/sun-black.avif" },
    { text: "Soft on the eyes", image: "/Products/KeyFeatures/eyes.avif" },
  ];

  return (
    <div className="relative min-h-screen bg-white">
      {/* Fixed Top Navigation */}
      <div className="fixed top-0 left-0 w-full z-20">
        <TopNav />
      </div>

      {/* Hero Section */}
      <div className="min-h-screen flex xl:flex-row flex-col">
        {/* Carousel Section (Sticky) */}
        <div className="xl:w-[70%] w-full xl:h-screen h-[700px] sticky top-0">
          {/* Custom Arrows */}
          <button
            ref={prevRef}
            className="absolute left-4 bottom-3 cursor-pointer z-30 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <FaArrowLeft size={16} />
          </button>
          <button
            ref={nextRef}
            className="absolute right-4 bottom-3 cursor-pointer z-30 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <FaArrowRight size={16} />
          </button>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="mySwiper"
          >
            {media.map((item, index) => (
              <SwiperSlide key={index}>
                {item.type === "image" ? (
                  <div className="relative w-full xl:h-screen h-[700px]">
                    <Image
                      src={item.src}
                      alt={`slide-${index}`}
                      fill
                      className="object-cover rounded-md"
                      priority
                    />
                  </div>
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full xl:h-screen h-[700px] object-cover rounded-md"
                    src={item.src}
                    aria-label={`video-${index}`}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30 p-2 rounded-md bg-black/30">
            {media.map((item, index) => (
              <div
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className="w-16 h-14 bg-white overflow-hidden rounded-sm cursor-pointer border-2 border-white"
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={`thumb-${index}`}
                    width={64}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <video
                    src={item.src}
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Section (Scrolls Normally) */}
        <div className="xl:w-[30%] w-full h-auto p-5 bg-white pt-26">
          <div className="xl:text-start text-center">
            <h1 className="text-5xl font-horizona tracking-tighter leading-tight">Hashmint Leaf-1</h1>
            <p className="mt-4 tracking-tighter leading-tight">
              The world's first human-friendly computer that your brain and eyes will actually love.
            </p>
          </div>

          <hr
            className="border-t border-transparent my-4"
            style={{
              borderImage:
                "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
              height: "1px",
            }}
          />

          <div className="xl:text-start text-center tracking-tighter leading-tight">
            <h1 className="font-semibold">Key Features</h1>
            <div className="grid grid-cols-2 gap-4 py-2 mt-4 mx-auto max-w-xl items-center justify-center">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image
                    src={feature.image}
                    alt={feature.text}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <p className="text-sm text-gray-700">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <hr
            className="border-t border-transparent my-4"
            style={{
              borderImage:
                "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
              height: "1px",
            }}
          />

          <div className="relative inline-block text-left w-full tracking-tighter leading-tight">
            <button
              onClick={() => setOpen(!open)}
              className="w-full font-semibold py-2 text-left flex items-center justify-between cursor-pointer"
            >
              <span>What's Included</span>
              <span>{open ? "−" : "+"}</span>
            </button>
            {open && (
              <div className="mt-2 w-full flex flex-row gap-2 bg-transparent p-2">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-2 text-center"
                  >
                    <p className="text-sm mb-1">{img.name}</p>
                    <Image
                      src={img.src}
                      alt={img.name}
                      width={150}
                      height={100}
                      className="rounded object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr
            className="border-t border-transparent my-4"
            style={{
              borderImage:
                "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
              height: "1px",
            }}
          />

          <div className="relative inline-block text-left w-full">
            <button
              onClick={() => setOpenOrder(!openOrder)}
              className="w-full font-semibold py-2 text-left flex items-center justify-between cursor-pointer"
            >
              <span>Order Details</span>
              <span>{openOrder ? "−" : "+"}</span>
            </button>
            {openOrder && (
              <div className="mt-4 w-full flex flex-row flex-wrap justify-center items-start gap-4 bg-transparent border-gray-200">
                {orderDetails.map((item, index) => (
                  <div key={index} className="w-full border-gray-200 p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      {item.icon}
                      <h1 className="text-sm font-semibold">{item.title}</h1>
                    </div>
                    <p className="text-xs text-gray-600 text-left">{item.Description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;