"use client";
import React, { useRef } from 'react';
import Link from 'next/link';


const VideoHoverPlayer = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <Link href="https://www.youtube.com/watch?v=OPXRrCrkbc0" target="_blank" rel="noopener noreferrer">

            <div className="relative group max-w-[250px] mx-auto my-8 overflow-hidden rounded-xl border-3 border-[#f9c63b] font-semibold 
    shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(249,198,59,0.7)] 
                  transition-all duration-300 ease-in-out">
                <video
                    ref={videoRef}
                    muted
                    loop
                    playsInline
                    className="w-full h-auto rounded-xl transition-all duration-300 
  group-hover:shadow-[0_0_25px_8px_rgba(249,198,59,0.4)]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <source src="/videoplayback (2).mp4" type="video/mp4" />

                    Your browser does not support the video tag.
                </video>
            </div>
        </Link>
    );
};

export default VideoHoverPlayer;