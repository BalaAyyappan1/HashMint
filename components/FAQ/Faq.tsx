"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaChevronDown } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';
import { menuItems, menuItems2 } from './Contents';

interface QnA {
  question: string;
  answer: string;
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});
  const contentRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contentEndMarkerRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Return early if refs aren't available yet
    if (!contentRef.current || !sectionRef.current || !contentEndMarkerRef.current) return;

    // Calculate the correct height of content
    const updateContentHeight = () => {
      if (contentContainerRef.current && contentRef.current) {
        // Set content container height to match the content height
        const contentHeight = contentRef.current.scrollHeight;
        contentContainerRef.current.style.height = `${contentHeight}px`;
      }
    };

    // Call once on mount
    updateContentHeight();
    
    // Get the full height of the content for the spacer
    let totalScrollableHeight = 0;
    if (contentRef.current) {
      totalScrollableHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
    }
    
    // Add a spacer element after the FAQ section to prevent the next section from appearing
    if (spacerRef.current) {
      // This spacer will push the next section down until animation is complete
      spacerRef.current.style.height = `${totalScrollableHeight}px`;
    }
    
    // Create a ScrollTrigger that pins the FAQ section until content is fully scrolled
 // Replace your current ScrollTrigger creation with this:
pinTriggerRef.current = ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top top", 
  end: () => `+=${contentRef.current?.scrollHeight || 0}`, // Scroll by the height of the content
  pin: true,
  pinSpacing: false,
  onUpdate: (self) => {
    if (!contentRef.current) return;
    
    // Only scroll content when pin is active
    if (self.isActive) {
      const totalScrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      contentRef.current.scrollTop = totalScrollHeight * self.progress;
      
      // Gradually reduce spacer height as we scroll through content
      if (spacerRef.current) {
        const remainingHeight = totalScrollHeight * (1 - self.progress);
        spacerRef.current.style.height = `${remainingHeight}px`;
      }
    }
  },
  onLeaveBack: () => {
    // Reset scroll position when scrolling back up past the section
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    
    // Reset spacer height when scrolling back
    if (spacerRef.current && contentRef.current) {
      const totalScrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      spacerRef.current.style.height = `${totalScrollHeight}px`;
    }
  },
  markers: false // Set to true for debugging
});

    return () => {
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
      }
    };
  }, []);

  // Make sure to refresh ScrollTrigger when content changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        // Update content height before refreshing ScrollTrigger
        if (contentContainerRef.current && contentRef.current) {
          const contentHeight = contentRef.current.scrollHeight;
          contentContainerRef.current.style.height = `${contentHeight}px`;
          
          // Update spacer height as well
          if (spacerRef.current) {
            const totalScrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
            spacerRef.current.style.height = `${totalScrollHeight}px`;
          }
        }
        
        ScrollTrigger.refresh(true); // True forces a more thorough refresh
      }, 300); // Slightly longer timeout for content to fully expand
      
      return () => clearTimeout(timer);
    }
  }, [openAnswers, openIndex]);

  // Add resize listener to adjust heights on window resize
  useEffect(() => {
    const handleResize = () => {
      if (contentContainerRef.current && contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        contentContainerRef.current.style.height = `${contentHeight}px`;
        
        // Update spacer height on resize
        if (spacerRef.current) {
          const totalScrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
          spacerRef.current.style.height = `${totalScrollHeight}px`;
        }
      }
      ScrollTrigger.refresh(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAnswer = useCallback((key: string) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const handleClick = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <>
      <div 
        ref={sectionRef}
        className="relative h-screen flex xl:flex-row flex-col px-6 lg:px-12 xl:px-20 gap-8 xl:gap-16 pt-6 xl:pt-12 justify-between"
      >
        {/* Grid background */}
        <div className="absolute -z-10 inset-0 w-full bg-[#E8E1DC] [background-image:linear-gradient(to_right,#73737330_1px,transparent_1px),linear-gradient(to_bottom,#73737330_0px,transparent_0px)] [background-size:11px_11px]" />

        {/* Left sidebar */}
        <div className="xl:w-1/4 lg:w-1/3 w-full bg-white sticky top-0 self-start">
          <div className="w-full bg-white z-10">
            <div className="relative">
              <FiSearch className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full p-3 pl-10 pr-28 text-black bg-white border border-[#D9D0CC] rounded-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                placeholder="Search FAQs..."
              />
              <button className="absolute top-1/2 right-0 h-full px-6 bg-[#DED6D0] text-black text-sm whitespace-nowrap border border-[#D9D0CC] -translate-y-1/2 hover:bg-[#D9D0CC] transition-colors">
                Search
              </button>
            </div>
          </div>

          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="flex flex-col bg-white border border-[#D9D0CC] py-2"
            >
              <button
                onClick={() => handleClick(index)}
                className="flex items-center justify-between px-2 text-black font-medium py-2 text-xl cursor-pointer"
              >
                <span>{item.label}</span>
                <IoMdArrowDropright
                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                    openIndex === index ? "rotate-90" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="flex flex-col bg-[#f6f0ec] rounded-md">
                  {item.submenu.map((sub, i) => (
                    <div key={i} className="px-4 py-2 cursor-pointer text-sm">
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Container div to control overall content height */}
        <div 
          ref={contentContainerRef}
          className="xl:w-3/4 lg:w-2/3 w-full relative"
        >
          {/* Right-side Q&A list - independently scrollable with no native scrolling */}
          <div 
            ref={contentRef}
            className="h-[80vh] overflow-hidden"
          >
            <div className="w-full max-w-4xl pb-16">
              {menuItems2.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col border border-[#D9D0CC] mb-6 qna-group"
                >
                  <div className="flex items-center justify-between px-5 text-black font-medium py-3 bg-[#EFE6E1] text-3xl md:text-4xl lg:text-5xl">
                    <span>{item.label}</span>
                  </div>

                  <div className="flex flex-col">
                    {item.submenu.map((sub) => (
                      <div key={sub.label} className="border-t border-[#D9D0CC]">
                        <p className="text-xl font-semibold pl-7 py-4 bg-[#F6F0ED] border border-[#D9D0CC]">
                          {sub.label}
                        </p>
                        {sub.qna?.map((qa, qIndex) => {
                          const key = `${item.label}-${sub.label}-${qIndex}`;
                          return (
                            <div key={key} className="flex flex-col border border-[#D9D0CC]">
                              <button
                                onClick={() => toggleAnswer(key)}
                                className="flex items-center justify-between py-5 w-full text-left px-8 text-lg md:text-xl font-medium bg-[#FAF5F2] cursor-pointer"
                              >
                                <span>{qa.question}</span>
                                <IoMdArrowDropright
                                  className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                                    openAnswers[key] ? "rotate-90" : ""
                                  }`}
                                />
                              </button>
                              {openAnswers[key] && (
                                <div className="px-6 py-4 bg-[#FAF5F2] text-sm md:text-base">
                                  {qa.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* This is the important marker div that tells ScrollTrigger when to stop pinning */}
          <div 
            ref={contentEndMarkerRef} 
            className="content-end-marker absolute bottom-0"
          />
        </div>
      </div>
      {/* This spacer pushes content down until the FAQ animation is complete */}
      <div ref={spacerRef} className="spacer-element transition-height duration-300 ease-linear" />
    </>
  );
};

export default Faq;