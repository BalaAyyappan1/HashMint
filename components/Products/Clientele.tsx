'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Icon1 from '@/public/app-icon-9.avif'; // Replace with your actual icon
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Clientele = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample logos (use more or different ones as needed)
  const logos = new Array(20).fill({ logo: Icon1 });

  useEffect(() => {
    const marquee = marqueeRef.current;
    const container = containerRef.current;
    if (!marquee || !container) return;

    const totalWidth = marquee.scrollWidth / 2; // width of one full set of logos

    gsap.set(marquee, { x: 0 });

    const animation = gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: 20,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        animation.timeScale(self.direction === -1 ? -1 : 1);
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col p-5 md:p-20 md:space-y-10 space-y-5 md:mt-40 mt-20 mb-30">
      <div className="flex flex-row md:space-x-80 space-x-15">
        <h2 className="md:text-[64px] text-start pl-10 mb-10 text-[16px] font-semibold leading-[64px]">
          Introducing <br /> HashOS
        </h2>
        <p className="flex justify-end items-end mb-10 text-xl">
          A distraction-free operating system with everything <br /> you need, and nothing you don't.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden w-full max-w-7xl mx-auto fade-mask"
      >
        <div ref={marqueeRef} className="flex items-center w-max">
          {[...logos, ...logos].map((item, index) => (
            <div
              key={`logo-${index}`}
              className="flex items-center justify-center mx-2 h-[80px] w-[100px] bg-[#e5dbd4] rounded-2xl"
            >
              <Image
                src={item.logo}
                alt={`Client logo ${index}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .fade-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default Clientele;
