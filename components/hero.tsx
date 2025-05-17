"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed] = useState(175); // Fixed lower speed value
  const [isReady, setIsReady] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(-1);
  const lastScrollRef = useRef<number>(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Check if we should load video based on connection
  const [preload, setPreload] = useState('none');
  
  // Register GSAP plugins only once at component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    
    // Check connection type for preloading strategy
    if (typeof navigator !== 'undefined' && navigator.connection) {
      const conn = navigator.connection as any;
      const shouldPreload = !conn.saveData && 
        (conn.effectiveType === '4g' || !conn.effectiveType);
      setPreload(shouldPreload ? 'metadata' : 'none');
    } else {
      setPreload('metadata');
    }
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  // Optimized function to update video time with debouncing
  const updateVideoTime = useCallback((newTime: number) => {
    if (!videoRef.current || Math.abs(lastTimeRef.current - newTime) < 0.05) return;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = newTime;
        lastTimeRef.current = newTime;
      }
    });
  }, []);

  // Initialize scroll trigger once video is ready
  useEffect(() => {
    if (typeof window === 'undefined' || !isReady || !videoLoaded) return;
    
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !video.duration) return;
    
    // Set container height based on video duration
    container.style.height = `${video.duration * speed}px`;
    
    // Throttled scroll handler for better performance
    const handleScroll = () => {
      if (Date.now() - lastScrollRef.current < 16) return; // ~60fps limit
      lastScrollRef.current = Date.now();
      
      const scrollPos = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      
      if (scrollPos >= containerTop && scrollPos <= containerTop + containerHeight) {
        const progress = (scrollPos - containerTop) / containerHeight;
        const newTime = Math.min(progress * video.duration, video.duration - 0.01);
        updateVideoTime(newTime);
      }
    };
    
    // Use ScrollTrigger for improved performance
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3, // Smoother scrubbing
      pin: true,
      anticipatePin: 1,
      markers: false,
      onUpdate: (self) => {
        if (!video.duration) return;
        const newTime = Math.min(self.progress * video.duration, video.duration - 0.01);
        updateVideoTime(newTime);
      }
    });
    
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, isReady, updateVideoTime, videoLoaded]);

  // Video loading optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleMetadataLoaded = () => {
      setIsReady(true);
    };
    
    const handleVideoLoaded = () => {
      setVideoLoaded(true);
    };
    
    // Check if metadata is already loaded
    if (video.readyState >= 2) {
      handleMetadataLoaded();
    }
    
    // Check if video is fully loaded
    if (video.readyState >= 4) {
      handleVideoLoaded();
    }
    
    video.addEventListener('loadedmetadata', handleMetadataLoaded);
    video.addEventListener('canplaythrough', handleVideoLoaded);
    
    // Performance optimizations for video element
    video.playbackRate = 0;
    video.defaultPlaybackRate = 0;
    video.disablePictureInPicture = true;
    video.autoplay = false;
    video.loop = false;
    
    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      video.removeEventListener('canplaythrough', handleVideoLoaded);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative will-change-transform">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          preload={preload}
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }} // Hardware acceleration hint
        >
          {/* Prioritize WebM for better performance */}
          <source src="/bg_onscroll.webm" type="video/webm" />
          <source src="/bg_optimized.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Loading state with minimal DOM */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
            <div className="text-lg font-medium">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;