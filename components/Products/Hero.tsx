'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import TopNav from '../TopNav';

import { SlReload } from "react-icons/sl";
import { LuClock2 } from "react-icons/lu";
import { FaArrowLeft, FaArrowRight, FaChevronRight } from "react-icons/fa6";

const Hero = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(true);
    const [openOrder, setOpenOrder] = useState(true);

    const images = [
        { src: "/DC-1.avif", name: "Leaf-1 Tablet" },
        { src: "/Products/Hero/Stylus.avif", name: "Stylus" },
        { src: "/Products/Hero/Cable.avif", name: "Charging cable" },
    ];

    const orderDetails = [
        { title: '30-Day Guarantee', Description: 'Return your DC-1 within 30 days for a full refund.', icon: <SlReload /> },
        { title: 'Shipping Estimate', Description: 'New orders are expected to ship by June 2025.', icon: <LuClock2 /> }
    ];

    const media = [
        { type: 'image', src: '/Products/Hero/image2.JPG' },
        { type: 'image', src: '/Products/Hero/image1.JPG' },
        { type: 'image', src: '/Products/Hero/image3.JPG' },
        { type: 'image', src: '/Products/Hero/image4.JPG' },

        // { type: 'image', src: 'https://ik.imagekit.io/99y1fc9mh/HashMint/daylight.avif?updatedAt=1746725477420' },
        // { type: 'video', src: 'https://ik.imagekit.io/99y1fc9mh/HashMint/capped-1080p%20(1).mp4?updatedAt=1746466239559' },
    ];

    const features = [
        {
            text: "Fast, paper-like display",
            image: "/fps.avif",
        },
        {
            text: "Read, write, take notes",
            image: "/Products/KeyFeatures/pen.avif",
        },
        {
            text: "Use your favorite apps",
            image: "/Products/KeyFeatures/fav-apps.avif",
        },
        {
            text: "Sunlight readable",
            image: "/Products/KeyFeatures/sun-black.avif",
        },
        {
            text: "Blue-light free backlight",
            image: "/Products/KeyFeatures/sun-black.avif",
        },
        {
            text: "Soft on the eyes",
            image: "/Products/KeyFeatures/eyes.avif",
        },
    ];

    return (
        <div>
            <div className="fixed w-full z-20">
                <TopNav />
            </div>

            <div className="flex xl:flex-row flex-col relative">
                {/* Carousel section */}
                <div className="xl:w-[70%] w-full xl:h-screen h-[700px] relative">
                    {/* Custom Arrows */}
                    <button
                        ref={prevRef}
                        className="absolute left-4 bottom-3 cursor-pointer transform -translate-y-1/2 z-30 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                        <FaArrowLeft size={16} />
                    </button>

                    <button
                        ref={nextRef}
                        className="absolute right-4 bottom-3 cursor-pointer transform -translate-y-1/2 z-30 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
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
                            // @ts-ignore - This is a valid way to customize Swiper navigation
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

                                        />
                                    </div>
                                ) : (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-screen object-cover rounded-md"
                                        src={item.src}
                                        aria-label={`video-${index}`}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Thumbnails */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30 p-2 rounded-md">
                        {media.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => swiperRef.current?.slideTo(index)}
                                className="w-16 h-14 bg-white overflow-hidden rounded-sm cursor-pointer border-white"
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

                {/* Content Section */}
                <div className="xl:w-[30%] md: w-full xl:h-screen mt-22 p-5">

                    <div className='xl:text-start text-center'>
                        <h1 className="text-4xl">Hashmint DC-1</h1>
                        <p className='mt-4'>
                            The world's first human-friendly computer that your brain and eyes
                            will actually love.
                        </p>
                    </div>


                    <hr
                        className="border-t border-transparent my-4"
                        style={{
                            borderImage:
                                "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
                            height: "1px", // Adjust thickness of the line
                        }}
                    />

                    <div className='xl:text-start text-center'>
                        <div>
                            <h1 >Key Features</h1>

                        </div>

                        <div className="grid grid-cols-2 grid-rows-3 gap-4 py-2 mt-4 mx-auto max-w-xl items-center justify-center">
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
                    <div className="relative inline-block text-left w-full">
                        <button
                            
                            className=" w-full  justify-between  px-4 py-2 text-left flex items-center justify-between cursor-pointer"
                        >
                            <span>What's Included</span>
                           
                        </button>

                     
                            <div className="mt-2 w-full flex flex-row bg-transparent  p-2">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg border border-gray-200 ml-2 text-center p-2"
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
                    

                        <hr
                            className="border-t border-transparent my-4"
                            style={{
                                borderImage:
                                    "repeating-linear-gradient(90deg, black, black 3px, transparent 3px, transparent 8px) 1",
                                height: "1px",
                            }}
                        />
                    </div>

                    <div className="relative inline-block text-left w-full">
                        {/* <button
                            onClick={() => setOpenOrder(!openOrder)}
                            className="bg-gray-200 w-full rounded shadow justify-between hover:bg-gray-300 px-4 py-2 text-left"
                        >
                            Order Details
                        </button> */}
                        <button
                         
                            className=" w-full  justify-between  px-4 py-2 text-left flex items-center justify-between cursor-pointer"
                        >
                            <span>Order Details</span>
                       
                        </button>
                       
                            <div className="mt-4 w-full flex flex-row justify-center items-start gap-4 bg-transparent border-gray-200  ">
                                {orderDetails.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full border-gray-200 p-3 transition"
                                    >
                                        {/* Logo + Title row */}
                                        <div className="flex items-center space-x-2 mb-2">
                                            {item.icon}
                                            <h1 className="text-sm font-semibold">{item.title}</h1>
                                        </div>

                                        {/* Description below */}
                                        <p className="text-xs text-gray-600 text-left">{item.Description}</p>
                                    </div>
                                ))}
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
