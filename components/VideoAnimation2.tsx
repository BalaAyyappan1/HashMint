'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoAnimation2 = () => {
  useEffect(() => {
    const videoScrub = (video: HTMLVideoElement, vars: any) => {
      const once = (el: EventTarget, event: string, fn: EventListener) => {
        const onceFn = function (this: EventTarget, evt: Event) {
          el.removeEventListener(event, onceFn as EventListener);
          fn.call(this, evt);
        };
        el.addEventListener(event, onceFn as EventListener);
        return onceFn;
      };

      const prepFunc = () => {
        video.play();
        video.pause();
      };

      const prep = () => once(document.documentElement, 'touchstart', prepFunc);

      const tween = gsap.fromTo(
        video,
        { currentTime: 0 },
        {
          paused: true,
          immediateRender: false,
          currentTime: video.duration || 1,
          ease: 'none',
          ...vars,
        }
      );

      const resetTime = () => {
        tween.vars.currentTime = video.duration || 1;
        tween.invalidate();
      };

      prep();
      video.readyState ? resetTime() : once(video, 'loadedmetadata', resetTime);

      return tween;
    };

    const handleHeroSectionScroll = () => {
      const containers = document.querySelectorAll('.scroll-video');
      containers.forEach((container) => {
        const video = container.querySelector<HTMLVideoElement>(
          '.immersive-pin .video-container .video-background'
        );
        if (video) {
          videoScrub(video, {
            scrollTrigger: {
              trigger: video,
              start: 'top top',
              end: '150%',
              scrub: true,
              pin: true,
              markers: false,
            },
          });
        }
      });
    };

    const handleVideoScroll = () => {
      const containers = document.querySelectorAll('.scroll-video2');
      containers.forEach((container) => {
        const video = container.querySelector<HTMLVideoElement>(
          '.immersive-pin2 .video-container2 .video-background2'
        );
        if (video) {
          videoScrub(video, {
            scrollTrigger: {
              trigger: video,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              pin: false,
              markers: false,
            },
          });
        }
      });
    };

    handleHeroSectionScroll();
    handleVideoScroll();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* First video section (scrubs and pins) */}
      <section className="scroll-video relative z-1">
        <div className="immersive-pin">
          <div className="video-container h-screen">
            <video
              className="video-background h-screen w-full absolute"
              src="https://ik.imagekit.io/99y1fc9mh/HashMint/capped-1080p%20(1).mp4?updatedAt=1746466239559"
              muted
              preload="auto"
            />
          </div>
        </div>



        {/* Logo*/}
        <div className='absolute top-4 z-10 text-6xl text-black '>
HashMint
        </div>
      </section>

      
   

      {/* Second video section (scrubs without pin) */}
      <section className="scroll-video2">
        <div className="immersive-pin2">
          <div className="video-container2 h-screen w-full">
            <video
              className="video-background2 h-screen w-full object-cover"
              src="https://ik.imagekit.io/99y1fc9mh/HashMint/457563_South%20Africa_Africa_3840x2160.mp4?updatedAt=1746462840333"
              muted
              preload="auto"
            />
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default VideoAnimation2;
