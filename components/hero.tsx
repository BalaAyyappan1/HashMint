"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed] = useState(225); // Slightly higher speed for mobile
  const [isReady, setIsReady] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(-1);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we should load video based on connection
  const [preload, setPreload] = useState('none');
  
  // Mobile detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const ua = navigator.userAgent;
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua));
      };
      
      checkMobile();
      gsap.registerPlugin(ScrollTrigger);
      
      // Connection check for preloading strategy
      if ('connection' in navigator) {
        const conn = navigator.connection as { saveData: boolean; effectiveType?: string };
        const shouldPreload = !conn.saveData && 
          (conn.effectiveType === '4g' || !conn.effectiveType);
        setPreload(shouldPreload ? 'metadata' : 'none');
      } else {
        setPreload('metadata');
      }
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
    
    // Set container height based on video duration and device
    const durationMultiplier = isMobile ? 0.8 : 1; // Shorter scroll distance on mobile
    container.style.height = `${video.duration * speed * durationMultiplier}px`;
    
    // Use ScrollTrigger with mobile optimizations
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: isMobile ? 1 : 0.3, // Smoother scrubbing with higher value on mobile
      pin: true,
      anticipatePin: 1,
      markers: false,
      preventOverlaps: true,  // Prevents conflicts with other ScrollTriggers
      fastScrollEnd: true,    // Optimizes for fast scrolling
      invalidateOnRefresh: true, // Recalculates on resize
      onUpdate: (self) => {
        if (!video.duration) return;
        
        // Apply different sensitivity for mobile
        const progress = isMobile ? 
          Math.max(0, Math.min(1, self.progress)) : // Ensure bounds for mobile
          self.progress;
          
        const newTime = Math.min(progress * video.duration, video.duration - 0.01);
        updateVideoTime(newTime);
      },
      onRefresh: () => {
        // Fix for scenarios where scroll position might be inconsistent
        if (video.duration) {
          const progress = ScrollTrigger.getById(scrollTriggerRef.current?.vars.id || '')?.progress || 0;
          updateVideoTime(progress * video.duration);
        }
      }
    });

    // Add touch-specific optimizations for mobile
    if (isMobile) {
      // Create a lightweight touch handler for iOS momentum scrolling issues
      const touchHandler = () => {
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.refresh();
        }
      };
      
      document.addEventListener('touchend', touchHandler, { passive: true });
      
      return () => {
        document.removeEventListener('touchend', touchHandler);
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    }
    
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [speed, isReady, updateVideoTime, videoLoaded, isMobile]);

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
    video.muted = true;
    
    // For iOS, need to specifically handle playback
    if (isMobile) {
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      
      // iOS Safari often needs this to properly load the video
      // Handle video loading - HTMLMediaElement.load() doesn't return a promise
      // but we'll ensure it's called for iOS
      try {
        video.load();
      } catch (e) {
        // Silently catch any errors that might occur
        console.error("Video loading error:", e);
      }
    }
    
    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      video.removeEventListener('canplaythrough', handleVideoLoaded);
    };
  }, [isMobile]);

  // For mobile devices, provide a lower quality video option
  const getVideoSources = () => {
    if (isMobile) {
      return (
        <>
          <source src="/hashmintBanner.webm" type="video/webm" />
          <source src="/hashmintBanner_converted.mp4" type="video/mp4" />
        </>
      );
    }
    
    return (
      <>
         <source src="/hashmintBanner.webm" type="video/webm" />
         <source src="/hashmintBanner_converted.mp4" type="video/mp4" />
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative will-change-transform">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          preload={preload}
          muted
          playsInline
          webkit-playsinline="true" 
          x-webkit-airplay="allow" 
          className="absolute top-0 left-0 w-full h-full object-cover"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ 
            transform: 'translateZ(0)', 
            willChange: 'transform',
            // Lower quality for mobile to improve performance
            objectFit: isMobile ? 'cover' : 'cover',
          }}
        >
          {getVideoSources()}
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