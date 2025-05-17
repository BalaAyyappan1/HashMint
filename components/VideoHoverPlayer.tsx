"use client";
import React, { useRef } from 'react';

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
    <div className="relative group max-w-sm mx-auto my-8 overflow-hidden rounded-xl border-2 border-[#f9c63b] font-semibold 
    shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_1px_rgba(249,198,59,0.7)] 
                  transition-all duration-300 ease-in-out">
{/* Video element */}
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
<source src="/hashmintBanner_converted.mp4" type="video/mp4" />
<source src="/hashmintBanner.webm" type="video/webm" />
Your browser does not support the video tag.
</video>
</div>
  );
};

export default VideoHoverPlayer;