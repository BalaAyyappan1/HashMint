"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

interface ImageItem {
  title: string;
  description: string;
  image?: string;
  video: string;
}

const images: ImageItem[] = [
  {
    title: "Read, write and export your PDFs",
    description: "You can gently read, annotate and export your PDFs.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/1%20(1).mp4?updatedAt=1747750461431",
  },
  {
    title: "Unlimited Notes",
    description: "You can write, draw and highlight your notes, just like a paper - without any limits.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/2%20(1).mp4?updatedAt=1747750673737",
  },
  {
    title: "Interact with your PDFs",
    description: "You can interact with your PDFs by summarizing or asking questions, using MintPDF - our AI based PDF interactor. ",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/3%20(2).mov/ik-video.mp4?updatedAt=1747751139201",
  },
  {
    title: "Convert your handwritten notes into text",
    description: "You can easily convert your handwritten notes to text in multiple regional languages. ",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/H2TConversion.mov/ik-video.mp4?updatedAt=1747751227465",
  },
  {
    title: "Turn Drawings into Stickers ",
    description: "Instantly transform your sketches and doodles into stickers.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/5%20(2).mp4?updatedAt=1747751592593",
  },
//   {
//     title: "Get solutions to your mathematical problems",
//     description: "You can just highlight your mathematical equation and you will have the problem solved. ",
//     image: "/daylight.avif",
//     video: "/video5.mp4",
//   },
  {
    title: "Seamlessly Share Your Notebook ",
    description: "Send your notes wherever they need to go — instantly. everything you write can be exported via email with just a tap. ",

    video: "https://ik.imagekit.io/80lxmumju/hashmint/ExportMode%20(1).mp4?updatedAt=1747751737265",
  },
  {
    title: "Import PDFs Directly from Cloud into Notes",
    description: "Keep PDFs and notes together, making study and review smoother than ever.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/AttachPDF%20(1).mp4?updatedAt=1747751820110",
  },
  {
    title: "Capture and Insert Images Instantly",
    description: "Snap photos with your leaf’s camera and add them directly into your notebook.",

    video: "https://ik.imagekit.io/80lxmumju/hashmint/Attach%20Image%20(1).mp4?updatedAt=1747751927781",
  },
  {
    title: "Amber Mode",
    description: "Soothe your eyes and elevate your nighttime writing or reading experience.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/AmberPDF%20(1).mp4?updatedAt=1747752045417",
  },
  {
    title: "The lasso tool",
    description: "Select and move, rotate, or reposition handwritten or typed content effortlessly.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/LassoMode%20(1).mp4?updatedAt=1747751662861",
  },
  {
    title: "Home Screen",
    description: "Your personal command center—pin favorite notes and PDFs, effortlessly search, filter, and sort.",
    video: "https://ik.imagekit.io/80lxmumju/hashmint/HomeScreen%20(1).mp4?updatedAt=1747752173947",
  },
//   {
//     title: "Transcribe and Translate your Audio",
//     description: "You can have your recorded audio transcribed as text and also get it converted in your favorite language",
//     image: "/daylight.avif",
//     video: "/video6.mp4",
//   },
//   {
//     title: "Live Shapes",
//     description: "You can automatically convert your free hand drawings into shapes",
//     image: "/daylight.avif",
//     video: "/video7.mp4",
//   },
];

const ImageCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollAmount = 800; // pixels to scroll

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between xl:px-22 px-7 items-center mb-4">
        <h1 className="md:text-6xl text-5xl text-gray-800 md:text-start text-center">
          Hashmint is for everyday
        </h1>

        <div className="flex flex-row gap-2 items-center hidden sm:flex md:flex">
          <div
            onClick={scrollLeft}
            className="bg-[#E9E0DA] rounded-full w-20 h-10 flex justify-center items-center cursor-pointer"
          >
            <GoArrowLeft className="text-black text-xl" />
          </div>
          <div
            onClick={scrollRight}
            className="bg-[#E9E0DA] rounded-full w-20 h-10 flex justify-center items-center cursor-pointer"
          >
            <GoArrowRight className="text-black text-xl" />
          </div>
        </div>
      </div>

      <div className="xl:px-10 py-10 w-[100%] xl:pl-30 pl-5 mx-auto overflow-hidden fade-mask-left">
        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="md:w-[500px] w-[360px] md:h-[430px] h-[330px] flex-shrink-0"
              whileTap={{ scale: 0.95 }}
            >
              <div className=" h-full p-4 rounded-xl overflow-hidden bg-[#F1E9E5] ">
                {/* Image on top with video */}
                <div className="relative w-full md:h-80 h-50">
                  <video 
                    src={src.video} 
                    className="object-cover rounded-xl w-full h-full"
                    
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => {
                      const videoElement = e.target as HTMLVideoElement;
                      videoElement.play();
                    }}
                    onMouseOut={(e) => {
                      const videoElement = e.target as HTMLVideoElement;
                      videoElement.pause();
                      videoElement.currentTime = 0;
                    }}
                  />
                </div>

                {/* Title & Description */}
                <div className="p-4 text-start">
                  <h1 className="text-lg font-medium text-black">
                    {src.title}
                  </h1>
                  <p className="text-sm text-gray-600 font-regular mt-1">
                    {src.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex flex-row gap-2 mt-10 items-center justify-center block sm:hidden md:hidden">
          <div
            onClick={scrollLeft}
            className="bg-[#E9E0DA] rounded-full w-20 h-10 flex justify-center items-center cursor-pointer"
          >
            <GoArrowLeft className="text-black text-xl" />
          </div>
          <div
            onClick={scrollRight}
            className="bg-[#E9E0DA] rounded-full w-20 h-10 flex justify-center items-center cursor-pointer"
          >
            <GoArrowRight className="text-black text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;