'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Wrap each character in a span
    el.innerHTML = text
      .split('')
      .map((char) =>
        char === ' ' ? '<span class="d-inline-flex">&nbsp;</span>' : `<span class="d-inline-flex">${char}</span>`
      )
      .join('');

    const spans = el.querySelectorAll('span');

    gsap.fromTo(
      spans,
      {
        scale: 2,
        opacity: 0,
        color: '#00e239',
      },
      {
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        },
        scale: 1,
        opacity: 1,
        color: '#fff',
        stagger: 0.1,
        ease: 'power2.out',
        duration: 1.5,
      }
    );
  }, [text]);

  return (
    <section className="container-fluid vh-100 d-flex align-items-center justify-content-center position-relative">
      <h1 className="animated-text text-center" ref={textRef}></h1>
    </section>
  );
};

export default AnimatedText;
