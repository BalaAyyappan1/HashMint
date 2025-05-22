"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TopNav from '../TopNav';
import VideoHoverPlayer from '../VideoHoverPlayer';
import Image from 'next/image';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [speed] = useState(255);
  const [isReady, setIsReady] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(-1);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  
  // Check if we should load video based on connection
  const [preload, setPreload] = useState('none');

  // Mobile detection and viewport setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const ua = navigator.userAgent;
        setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua));
      };

      const updateViewportHeight = () => {
        setViewportHeight(window.innerHeight);
      };

      checkMobile();
      updateViewportHeight();

      // Update height on resize
      window.addEventListener('resize', updateViewportHeight);

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

      return () => {
        window.removeEventListener('resize', updateViewportHeight);
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        if (scrollTriggerRef.current) {
          scrollTriggerRef.current.kill();
        }
      };
    }
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

  // Initialize scroll trigger once video ready
  useEffect(() => {
    if (typeof window === 'undefined' || !isReady || !videoLoaded || !viewportHeight) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !video.duration) return;

    // Calculate the exact height needed based on video duration
    // Important: This approach uses 100vh + a small buffer to prevent any whitespace
    const videoSection = document.querySelector('.video-section');

    // Force container height to match viewport exactly to prevent white space
    if (videoSection) {
      videoSection.classList.add('force-height');
    }

    // Set explicit container height to control scroll distance
    // For the right scroll speed, we need to find the sweet spot
    const speedFactor = isMobile ? 0.4 : 0.65; // Lower values = faster scroll
    const minHeight = Math.max(window.innerHeight, 700); // Never smaller than viewport

    // The key calculation - using video duration and adjustable speed factor
    container.style.height = `${Math.max(minHeight, video.duration * speed * speedFactor)}px`;

    // Use ScrollTrigger with mobile optimizations
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: isMobile ? 1 : 0.3, // Smoother scrubbing with higher value on mobile
      pin: true,
      pinSpacing: false, // This is crucial to prevent whitespace
      anticipatePin: 1,
      markers: false,
      preventOverlaps: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
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
  }, [speed, isReady, updateVideoTime, videoLoaded, isMobile, viewportHeight]);

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
          <source src="/banner_new.webm" type="video/webm" />
          <source src="/banner_new.mp4" type="video/mp4" />
        </>
      );
    }

    return (
      <>
        <source src="/banner_new.webm" type="video/webm" />
        <source src="/banner_new.mp4" type="video/mp4" />
      </>
    );
  };

  return (
    <div className="relative z-50">
      <div className="fixed top-0 left-0 w-full z-50  pt-5 ">
        <TopNav />
      </div>

      {/* <Image src="/bghero.jpg" alt="banner" width={1000} height={1000} className="w-full h-full object-cover absolute top-0 left-0" /> */}


      <div
        ref={containerRef}
        className="relative will-change-transform p-5  h-screen"
       
      >



        <div className="absolute z-90 top-[10%] md:top-[8%] left-[3%] p-5">
          <h1 className="text-white text-3xl md:text-6xl tracking-tighter leading-tight font-horizona ">
            The Focus, Re-Imagined.
          </h1>
          <p className="text-white text-xl md:text-3xl mt-5 leading-tight tracking-tighter  font-regular">
            Meet Leaf 1 - designed for deep focus, <br /> not distractions.
          </p>
        </div>

        <section className="video-section sticky top-0 h-[95vh] w-full overflow-hidden">
          <video
            ref={videoRef}
            preload={preload}
            muted
            playsInline
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
              objectFit: isMobile ? "cover" : "cover",
              transition: "transform 0.1s ease-out",
            }}
          >
            {getVideoSources()}
            Your browser does not support the video tag.
          </video>

          <div className="hidden md:block absolute bottom-8 right-8 z-10">
            <button
              className="px-20 py-4 text-sm rounded-xl bg-[#f9c63b] font-medium cursor-pointer 
                  hover:shadow-[0_0_15px_1px_rgba(249,198,59,0.7)] 
                  transition-all duration-300 ease-in-out"
            >
              ORDER NOW
            </button>
          </div>

          <div className="absolute bottom-0 left-2 md:left-12 z-10">
            <VideoHoverPlayer />
          </div>

          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
              <div className="text-lg font-medium">Loading video...</div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Hero;