"use client";

import React, {useEffect, useRef, useState, } from 'react'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"


const hero = () => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [isSafari, setIsSafari] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
  
    useEffect(() => {
      // Check if we're on mobile
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
  
      // Check if we're on Safari
      const checkSafari = () => {
        const ua = navigator.userAgent.toLowerCase()
        return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1
      }
  
      // Initial checks
      checkMobile()
      setIsSafari(checkSafari())
  
      // Listen for resize events
      window.addEventListener("resize", checkMobile)
  
      return () => {
        window.removeEventListener("resize", checkMobile)
      }
    }, [])
  
    useEffect(() => {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger)
  
      // Get references to DOM elements
      const video = videoRef.current
      const videoSection = sectionRef.current
  
      if (!video || !videoSection) return
  
      // Force better performance with these settings
      video.pause()
      video.muted = true
      video.playsInline = true
      video.preload = "auto"
      video.setAttribute("playsinline", "")
      video.setAttribute("webkit-playsinline", "")
  
      // Safari-specific optimizations
      if (isSafari) {
        video.controls = false
        video.autoplay = false
      }
  
      video.currentTime = 0
  
      video.style.transform = "translate3d(0, 0, 0)"
      video.style.webkitTransform = "translate3d(0, 0, 0)"
  
      // Safari-specific styles
      if (isSafari) {
        video.style.webkitBackfaceVisibility = "hidden"
        video.style.webkitPerspective = "1000"
      } else {
        video.style.backfaceVisibility = "hidden"
      }
  
      // Make sure video is fully loaded before setting up ScrollTrigger
      const setupScrollTrigger = () => {
        // Clear any existing ScrollTriggers to prevent conflicts
        ScrollTrigger.getAll().forEach((t) => t.kill())
  
        // Adjust settings based on device
        const scrubValue = isMobile ? 0.5 : 0.1
        const endValue = isMobile ? "+=300%" : "+=250%"
  
        // Safari-specific adjustments
        const safariScrubValue = isSafari ? 1 : scrubValue
  
        // Create the main scroll trigger for the video
        const videoScrubber = ScrollTrigger.create({
          trigger: videoSection,
          start: "top top", // Start exactly at the top of the viewport
          end: endValue,
          pin: true,
          pinSpacing: true,
          scrub: safariScrubValue,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (video) {
              // Calculate video time based on scroll progress
              const progress = Math.max(0, Math.min(self.progress, 1))
              const targetTime = progress * video.duration
  
              // Safari-specific time update handling
              if (isSafari) {
                try {
                  requestAnimationFrame(() => {
                    video.currentTime = targetTime
                  })
                } catch (e) {
                  console.error("Safari video time update error:", e)
                }
              } else {
                // Direct time setting for other browsers
                video.currentTime = targetTime
              }
            }
          },
          onEnter: () => {
            // Reset to beginning when entering the section
            if (video) {
              try {
                video.currentTime = 0
              } catch (e) {
                console.error("Video time reset error:", e)
              }
            }
            document.body.classList.remove("video-completed")
          },
          onLeave: () => {
            // When scrolling past the section, ensure video is at the end
            if (video) {
              try {
                video.currentTime = video.duration
              } catch (e) {
                console.error("Video time set error:", e)
              }
            }
            document.body.classList.add("video-completed")
          },
          onEnterBack: () => {
            // When scrolling back up into the section
            document.body.classList.remove("video-completed")
          },
          onLeaveBack: () => {
            // When scrolling back above the section
            if (video) {
              try {
                video.currentTime = 0
              } catch (e) {
                console.error("Video time reset error:", e)
              }
            }
          },
        })
  
        // Create a second ScrollTrigger to handle the transition to the next section
        ScrollTrigger.create({
          trigger: videoSection,
          start: "bottom top", 
          pin: false,
          onEnter: () => {
            // Ensure video is at the end when scrolling down past it
            if (video) {
              try {
                video.currentTime = video.duration
              } catch (e) {
                console.error("Video time set error:", e)
              }
            }
            document.body.classList.add("video-completed")
          },
          onLeaveBack: () => {
            // When scrolling back up into the video section
            document.body.classList.remove("video-completed")
          },
        })
      }
  
      // Initialize when video is ready - with Safari-specific handling
      const loadVideo = () => {
        return new Promise<void>((resolve) => {
          // For Safari, we need to handle video loading differently
          if (isSafari) {
            // Safari needs a play attempt to properly load the video
            const attemptPlay = () => {
              video
                .play()
                .then(() => {
                  video.pause()
                  video.currentTime = 0
                  setVideoLoaded(true)
                  resolve()
                })
                .catch((e) => {
                  console.log("Safari video play attempt failed, retrying...")
                  // For Safari, we'll just resolve anyway after a timeout
                  setTimeout(() => {
                    video.currentTime = 0
                    setVideoLoaded(true)
                    resolve()
                  }, 500)
                })
            }
  
            if (video.readyState >= 2) {
              attemptPlay()
            } else {
              video.addEventListener("loadeddata", attemptPlay, { once: true })
              // Force load
              video.load()
            }
          } else {
            // Standard approach for other browsers
            if (video.readyState >= 3) {
              setVideoLoaded(true)
              resolve()
            } else {
              const handleLoaded = () => {
                video.removeEventListener("canplaythrough", handleLoaded)
                setVideoLoaded(true)
                resolve()
              }
              video.addEventListener("canplaythrough", handleLoaded)
              video.load()
            }
          }
        })
      }
  
      loadVideo().then(() => {
        // Reset to beginning before setting up scroll trigger
        try {
          video.currentTime = 0
        } catch (e) {
          console.error("Video time reset error:", e)
        }
        setupScrollTrigger()
      })
  
      // Add resize handler to maintain smooth experience on window resize
      const handleResize = () => {
        // Refresh ScrollTrigger on resize
        ScrollTrigger.refresh(true)
      }
  
      window.addEventListener("resize", handleResize)
  
      // Cleanup on component unmount
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
        window.removeEventListener("resize", handleResize)
      }
    }, [isMobile, isSafari])
  return (
    <div>
      <video
          ref={videoRef}
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover rounded-lg"
          style={{
            willChange: "contents",
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <source src="/capped-1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    </div>
  )
}

export default hero
