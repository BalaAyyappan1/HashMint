"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLCollectionOf<HTMLElement>>(null);

  useEffect(() => {
    if (containerRef.current) {
      const sections = containerRef.current.querySelectorAll<HTMLElement>('.section');
      const totalWidth = Array.from(sections).reduce(
        (acc, section) => acc + section.offsetWidth,
        0
      );
  
      gsap.to(sections, {
        x: () => `-${totalWidth - window.innerWidth}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
        },
      });
  
      // Optional: Individual section animations
      sections.forEach((section, index) => {
        gsap.to(section, {
          backgroundColor: ['#f00', '#0f0', '#00f'][index % 3],
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        });
      });
  
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);
  

  return (
    <div className="relative w-full h-screen overflow-hidden" ref={containerRef}>
      <div className="absolute top-0 left-0 h-full flex flex-row">
        <section className="section w-screen h-screen p-5 bg-red-200 flex items-center justify-center text-xl font-bold">
          Section 1
        </section>
        <section className="section w-screen h-screen p-5 bg-blue-200 flex items-center justify-center text-xl font-bold">
          Section 2
        </section>
        <section className="section w-[600px] h-screen p-5 bg-green-200 flex items-center justify-center text-xl font-bold">
          Section 3
        </section>
        <section className="section w-[600px] h-screen p-5 bg-yellow-200 flex items-center justify-center text-xl font-bold">
          Section 4
        </section>
        <section className="section w-[900px] h-screen p-5 bg-purple-200 flex items-center justify-center text-xl font-bold">
          Section 5
        </section>
        <section className="section w-screen h-screen p-5 bg-orange-200 flex items-center justify-center text-xl font-bold">
          Section 6
        </section>
        <section className="section w-[900px] h-screen p-5 bg-pink-200 flex items-center justify-center text-xl font-bold">
          Section 7
        </section>
        <section className="section w-screen h-screen p-5 bg-teal-200 flex items-center justify-center text-xl font-bold">
          Section 8
        </section>
      </div>
    </div>
  );
};

export default HorizontalScroll;