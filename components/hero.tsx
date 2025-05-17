"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed] = useState(150); // Lower speed for better mobile performance
  const [isReady, setIsReady] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(-1);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  
  // Mobile detection and setup
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      // More reliable mobile detection
      const ua = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(ua);
      const isAndroid = /Android/.test(ua);
      const isMobile = isIOS || isAndroid || window.innerWidth < 768;
      setIsMobile(isMobile);

      // Fallback for low-performance devices
      const isLowPerfDevice = isMobile && 
        (/iPhone OS 12_|iPhone OS 13_|Android 9|Android 10/.test(ua) || 
        window.devicePixelRatio > 2);
      setUseFallback(isLowPerfDevice);
    };

    checkMobile();
    gsap.registerPlugin(ScrollTrigger);

    // Handle orientation changes
    const handleResize = () => {
      checkMobile();
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Throttled video time update
  const updateVideoTime = useCallback((newTime: number) => {
    if (!videoRef.current || Math.abs(lastTimeRef.current - newTime) < 0.05) return;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(() => {
      if (videoRef.current) {
        // iOS needs this slight delay for smooth playback
        if (isMobile) {
          videoRef.current.currentTime = newTime + 0.001;
        } else {
          videoRef.current.currentTime = newTime;
        }
        lastTimeRef.current = newTime;
      }
    });
  }, [isMobile]);

  // Initialize scroll trigger
  useEffect(() => {
    if (!isReady || !videoLoaded || !videoRef.current || !containerRef.current) return;

    const video = videoRef.current;
    const container = containerRef.current;

    // Adjust for mobile and fallback
    const durationMultiplier = isMobile ? 0.6 : 1;
    const containerHeight = video.duration * speed * durationMultiplier;
    container.style.height = `${containerHeight}px`;

    // For low-performance devices, use a simplified approach
    if (useFallback) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = containerHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);
        updateVideoTime(progress * video.duration);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Standard GSAP ScrollTrigger setup
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: isMobile ? 0.8 : 0.3, // Smoother scrubbing on mobile
      pin: true,
      anticipatePin: 1,
      markers: false,
      onUpdate: (self) => {
        if (!video.duration) return;
        const progress = Math.max(0, Math.min(1, self.progress));
        const newTime = progress * video.duration;
        updateVideoTime(newTime);
      }
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [speed, isReady, videoLoaded, isMobile, useFallback, updateVideoTime]);

  // Video loading and optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsReady(true);
      setVideoLoaded(true);
    };

    // Optimized loading strategy
    video.preload = isMobile ? 'metadata' : 'auto';
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('playsinline', '');
    video.disablePictureInPicture = true;
    video.controls = false;

    // For iOS, we need to trigger loading differently
    if (isMobile) {
      video.load();
      // iOS often needs this to properly load the video
      setTimeout(() => {
        if (video.readyState < 3) video.load();
      }, 300);
    }

    video.addEventListener('canplay', handleCanPlay, { once: true });
    video.addEventListener('error', () => setUseFallback(true));

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [isMobile]);

  // Get appropriate video sources
  const getVideoSources = () => {
    if (useFallback) {
      return (
        <>
          <source src="/hashmintBanner-low.webm" type="video/webm" />
          <source src="/hashmintBanner-low.mp4" type="video/mp4" />
        </>
      );
    }
    return (
      <>
        <source src="/hashmintBanner.webm" type="video/webm" />
        <source src="/hashmintBanner.mp4" type="video/mp4" />
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!useFallback ? (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform'
            }}
          >
            {getVideoSources()}
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback - use poster image or lower quality video
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            poster="/hashmint-poster.jpg"
            preload="metadata"
          >
            {getVideoSources()}
            Your browser does not support the video tag.
          </video>
        )}

        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-lg">Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;