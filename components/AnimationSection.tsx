"use client";
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const AnimatedSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const [splitText, setSplitText] = useState<string[]>([]);
  const [isPinned, setIsPinned] = useState(true);

  const mainText = "Lights off, amber on – for a softer night time experience.";

  useEffect(() => {
    setSplitText(mainText.split(/\s+/));
  }, [mainText]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate scroll progress (0 when top of section is at bottom of viewport, 1 when bottom of section is at top of viewport)
      const scrollProgress = Math.max(0, Math.min(1, (-sectionTop) / (sectionHeight - windowHeight)));

      // Animation phases
      if (scrollProgress < 0.2) {
        // Phase 1: Only text animation (image remains hidden)
        if (textRef.current) {
          const words = textRef.current.children;
          for (let i = 0; i < words.length; i++) {
            const word = words[i] as HTMLElement;
            const wordProgress = Math.min(1, Math.max(0, (scrollProgress - (i * 0.02)) / 0.1));
            word.style.opacity = `${wordProgress}`;
            word.style.transform = `translateY(${20 - (wordProgress * 20)}px)`;
          }
        }
        
        // Keep image hidden and super scaled up
        if (imageRef.current) {
          imageRef.current.style.opacity = '0';
          imageRef.current.style.transform = 'scale(3)';
        }
      } 
      else if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
        // Phase 2: Text fades out, image scales down from super big to normal
        const contentProgress = (scrollProgress - 0.2) / 0.2;
        
        if (textRef.current) {
          textRef.current.style.opacity = `${1 - contentProgress}`;
        }
        
        if (imageRef.current) {
          // Image appears and scales down from 3x to 1x
          imageRef.current.style.opacity = `${contentProgress}`;
          imageRef.current.style.transform = `scale(${3 - (contentProgress * 2)})`;
        }
      } 
      else if (scrollProgress >= 0.4 && scrollProgress < 0.8) {
        // Phase 3: Image moves left, content appears
        const moveProgress = (scrollProgress - 0.4) / 0.4;
        
        if (imageRef.current) {
          imageRef.current.style.opacity = '1';
          imageRef.current.style.transform = `translateX(${-30 * moveProgress}%) scale(${1 - moveProgress * 0.2})`;
        }
        
        if (bottomContentRef.current) {
          bottomContentRef.current.style.opacity = `${moveProgress}`;
          bottomContentRef.current.style.transform = `translateY(${100 - moveProgress * 100}%)`;
        }
      } 
      else {
        // Phase 4: Complete
        setIsPinned(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize positions

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
   
      <section 
        ref={sectionRef} 
        className={`w-full h-screen flex-shrink-0 flex items-center justify-center bg-transparent ${
          isPinned ? 'sticky top-0' : 'relative'
        } overflow-hidden`}
      >
        {/* Text element with split words */}
        <div
          ref={textRef}
          className="absolute text-4xl font-semibold text-center text-black z-10 px-4"
          style={{
            whiteSpace: 'nowrap',
            transition: 'opacity 0.3s ease-out'
          }}
        >
          {splitText.map((word, index) => (
            <span 
              key={index} 
              className="inline-block opacity-0"
              style={{
                transform: 'translateY(20px)',
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                transitionDelay: `${index * 0.05}s`
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </div>

        {/* Image element - starts hidden and super scaled up */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <Image
            ref={imageRef}
            src="/DSC04014.png"
            alt="Lume Paper Display"
            width={1000}
            height={1000}
            className="w-full h-full object-cover opacity-0"
            style={{
              transform: 'scale(3)',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
              transformOrigin: 'center center',
              objectPosition: 'center'
            }}
          />
        </div>

        {/* Bottom right content */}
        <div
          ref={bottomContentRef}
          className="absolute bottom-0 right-0 p-8 bg-white/80 z-10 w-1/3 max-w-md opacity-0"
          style={{
            transform: 'translateY(100%)',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          <h3 className="text-2xl font-semibold mb-4">Explore More</h3>
          <p className="text-gray-700">
            Discover how our amber lighting technology creates a soothing nighttime environment 
            that's easier on your eyes and promotes better sleep.
          </p>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>
      </section>
      

    </div>
  );
};

export default AnimatedSection;