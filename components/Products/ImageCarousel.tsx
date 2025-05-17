"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const images = [
    {
        title: "Read, write and export your PDFs",
        description: "You can gently read, annotate and export your PDFs.",
        image: "/daylight.avif",
    },
    {
        title: "Unlimited Notes",
        description: "You can write, draw and highlight your notes, just like a paper - without any limits.",
        image: "/daylight.avif",
    },
    {
        title: "Interact with your PDFs",
        description: "You can interact with your PDFs by summarizing or asking questions, using MintPDF - our AI based PDF interactor. ",
        image: "/daylight.avif",
    },
    {
        title: "Convert your handwritten notes into text",
        description: "You can easily convert your handwritten notes to text in multiple regional languages. ",
        image: "/daylight.avif",
    },
    {
        title: "Get solutions to your mathematical problems",
        description: "You can just highlight your mathematical equation and you will have the problem solved. ",
        image: "/daylight.avif",
    },
    {
        title: "Transcribe and Translate your Audio",
        description: "You can have your recorded audio transcribed as text and also get it converted in your favorite language",
        image: "/daylight.avif",
    },
    {
        title: "Live Shapes",
        description: "You can automatically convert your free hand drawings into shapes",
        image: "/daylight.avif",
    },

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
             <div className="flex flex-row justify-between px-22 items-center mb-4">
                <h1 className="text-4xl font-bold text-gray-800">Hashmint is for everyday</h1>

                <div className="flex flex-row gap-2">
                    <div onClick={scrollLeft} className="bg-[#494949] rounded-full w-20 h-10 flex justify-center items-center cursor-pointer">
                        <GoArrowLeft className="text-white text-xl" />
                    </div>
                    <div onClick={scrollRight} className="bg-[#494949] rounded-full w-20 h-10 flex justify-center items-center cursor-pointer">
                        <GoArrowRight className="text-white text-xl" />
                    </div>
                </div>
            </div>
       
        <div className="px-10 py-10 w-[100%] pl-20 mx-auto overflow-hidden fade-mask-left">
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
                        className="w-[500px] h-[430px]   flex-shrink-0"
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="border border-gray-300 h-full p-2 rounded-xl overflow-hidden bg-white shadow-md">
                            {/* Image on top */}
                            <div className="relative w-full h-80">
                                <Image
                                    src={src.image}
                                    alt={`carousel-${index}`}
                                    fill
                                    className="object-cover rounded-xl w-full h-full"
                                />
                            </div>

                            {/* Title & Description */}
                            <div className="p-4 text-start">
                                <h1 className="text-lg font-semibold text-gray-800">
                                    {src.title}
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">{src.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
        </div>
    );
};

export default ImageCarousel;
