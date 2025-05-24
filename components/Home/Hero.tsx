"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import TopNav from '../TopNav';
import VideoHoverPlayer from '../VideoHoverPlayer';
import Image from 'next/image';
import Link from 'next/link';

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

      window.addEventListener('resize', updateViewportHeight);
      gsap.registerPlugin(ScrollTrigger);

      // Connection check for preloading 
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

  // Optimized function to update video time with debouncing (for non-mobile)
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

  // Initialize scroll trigger for non-mobile devices
  useEffect(() => {
    if (typeof window === 'undefined' || !isReady || !videoLoaded || !viewportHeight || isMobile) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || !video.duration) return;

    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
      videoSection.classList.add('force-height');
    }

    const speedFactor = 0.65;
    const minHeight = Math.max(window.innerHeight, 700);
    container.style.height = `${Math.max(minHeight, video.duration * speed * speedFactor)}px`;

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      markers: false,
      preventOverlaps: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!video.duration) return;
        const progress = self.progress;
        const newTime = Math.min(progress * video.duration, video.duration - 0.01);
        updateVideoTime(newTime);
      },
      onRefresh: () => {
        if (video.duration) {
          const progress = ScrollTrigger.getById(scrollTriggerRef.current?.vars.id || '')?.progress || 0;
          updateVideoTime(progress * video.duration);
        }
      }
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [speed, isReady, updateVideoTime, videoLoaded, viewportHeight, isMobile]);

  // Video loading and playback setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMetadataLoaded = () => {
      setIsReady(true);
    };

    const handleVideoLoaded = () => {
      setVideoLoaded(true);
      // Autoplay on mobile
      if (isMobile) {
        video.play().catch((e) => console.error("Video autoplay error:", e));
      }
    };

    if (video.readyState >= 2) {
      handleMetadataLoaded();
    }

    if (video.readyState >= 4) {
      handleVideoLoaded();
    }

    video.addEventListener('loadedmetadata', handleMetadataLoaded);
    video.addEventListener('canplaythrough', handleVideoLoaded);

    // Video settings
    video.playbackRate = isMobile ? 1 : 0; // Normal playback for mobile
    video.defaultPlaybackRate = isMobile ? 1 : 0;
    video.disablePictureInPicture = true;
    video.autoplay = isMobile; // Enable autoplay for mobile
    video.loop = isMobile; // Enable looping for mobile
    video.muted = true;

    if (isMobile) {
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      try {
        video.load();
      } catch (e) {
        console.error("Video loading error:", e);
      }
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadataLoaded);
      video.removeEventListener('canplaythrough', handleVideoLoaded);
    };
  }, [isMobile]);

  // Video sources
  const getVideoSources = () => {
    return (
      <>
        <source src="/banner_new.webm" type="video/webm" />
        <source src="/banner_new.mp4" type="video/mp4" />
      </>
    );
  };

  return (
    <div className="relative z-50">
      <div className="fixed top-0 left-0 w-full z-50 pt-5">
        <TopNav />
      </div>

      <div
        ref={containerRef}
        className="relative will-change-transform p-2 md:p-5 h-screen"
      >
        <div className="absolute z-90 top-[14%] md:top-[8%] left-[3%] p-5">
          <h1 className="text-white text-3xl md:text-6xl tracking-tighter leading-tight font-horizona">
            The Focus, Re-Imagined.
          </h1>
          <p className="text-white text-xl md:text-3xl mt-5 leading-tight tracking-tighter font-regular">
            Meet Leaf 1 - designed for deep focus, <br /> not distractions.
          </p>
        </div>

        <section className="sticky top-0 h-[99vh] md:h-[95vh] w-full overflow-hidden video-section">
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
            loop={isMobile} // Enable loop attribute for mobile
            autoPlay={isMobile} // Enable autoplay attribute for mobile
          >
            {getVideoSources()}
            Your browser does not support the video tag.
          </video>

          <div className="hidden md:block absolute bottom-8 right-8 z-10">
            <Link
              href={'https://hashmint-frontend.onrender.com/'}
              target="_blank"
              className="px-20 py-4 text-sm rounded-xl bg-[#f9c63b] font-medium cursor-pointer 
                  hover:shadow-[0_0_15px_1px_rgba(249,198,59,0.7)] 
                  transition-all duration-300 ease-in-out"
            >
              PRE-ORDER NOW
            </Link>
          </div>

          <div className="absolute bottom-0 left-2 md:left-12 z-10">
            <VideoHoverPlayer />
          </div>

          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
              <div className="text-lg font-medium"></div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Hero;